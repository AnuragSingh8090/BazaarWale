import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import { ImSpinner8 } from "react-icons/im";
import apiService from "../../services/apiService";
import { startLoading, stopLoading } from "../../store/slices/userSlice";
import "./Login.css";

const Login = () => {
  const [Login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [resetEmailorMobile, setResetEmailorMobile] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [otpStatus, setOtpStatus] = useState(null);

  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const abortControllerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const user = {
        email: Login.email,
        password: Login.password,
      };

      const response = await apiService.loginUser(user, abortControllerRef.current.signal);
      const token = response.token;
      const { name, email, cart, userId } = response.user;
      sucessToast("Login Successfully !!");
      dispatch(startLoading())
      setTimeout(() => {
        navigate("/");
        dispatch(
          loginUser({
            token,
            name,
            email,
            cart,
            userId,
          })
        );
        dispatch(stopLoading())
      }, 1000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      if (error.code !== "ECONNABORTED") {
        errorToast(
          error.response ? error.response.data.message : "Login failed"
        );
      }
      console.error("Login error:", error);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      otpRefs[5].current.focus();
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase) strength += 1;
    if (hasNumbers) strength += 1;
    if (hasSpecialChar) strength += 1;

    return Math.min(3, Math.floor(strength / 2));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      errorToast("Please enter your email or phone number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(resetEmail) && !phoneRegex.test(resetEmail)) {
      errorToast("Please enter a valid email or 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const response = await apiService.validateResetPasswordEmail({ email: resetEmail }, abortControllerRef.current.signal);
      if (response.success) {
        setLoading(false);
        sucessToast(response.message);
        setResetEmailorMobile(response.message);
        setForgotPasswordStep(2);
        setResendTimer(30);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      if (error.code !== "ECONNABORTED") {
        errorToast(
          error.response ? error.response.data.message : "Failed to send OTP"
        );
      }
      console.error("Send OTP error:", error);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      errorToast("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const response = await apiService.validateResetPasswordOtp({ email: resetEmail, otp: otpString }, abortControllerRef.current.signal);
      if (response.success) {
        setLoading(false);
        setOtpStatus("success");
        sucessToast("OTP verified successfully");
        setForgotPasswordStep(3);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      if (error.code !== "ECONNABORTED") {
        setOtpStatus("error");
        setOtp(["", "", "", "", "", ""]);
        otpRefs[0].current.focus();
        errorToast(
          error.response ? error.response.data.message : "Invalid OTP"
        );
      }
      console.error("OTP verification error:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    try {
      e.preventDefault();
      if (newPassword.length < 6) {
        errorToast("Password must be at least 6 characters");
        return;
      }
      if (newPassword !== confirmPassword) {
        errorToast("Passwords do not match");
        return;
      }

      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasLowerCase = /[a-z]/.test(newPassword);
      const hasNumbers = /\d/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        errorToast(
          "Password must contain uppercase, lowercase, numbers and special characters"
        );
        return;
      }

      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const response = await apiService.resetPassword({ email: resetEmail, password: newPassword }, abortControllerRef.current.signal);

      if (response.status === 200) {
        setLoading(false);
        sucessToast("Password reset successfully");
        setShowForgotPassword(false);
        setForgotPasswordStep(1);
        setResetEmail("");
        setOtp(["", "", "", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.message === 'canceled') return;
      setLoading(false);
      if (error.code !== "ECONNABORTED") {
        errorToast(
          error.response ? error.response.data.message : "Failed to reset password"
        );
      }
      console.error("Password reset error:", error);
    }
  };

  const cancelForgotPassword = () => {
    setLoading(false);
    setShowForgotPassword(false);
    setForgotPasswordStep(1);
    setResetEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setOtpStatus(null);
  };

  const toggleForgotPassword = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
    setShowForgotPassword(!showForgotPassword);
    setForgotPasswordStep(1);
    setResetEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setLogin({ email: "", password: "" });
    setOtpStatus(null);
  };

  const handleResendOTP = async () => {
    if (!resetEmail) {
      errorToast("Please enter your email or phone number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(resetEmail) && !phoneRegex.test(resetEmail)) {
      errorToast("Please enter a valid email or 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const response = await apiService.validateResetPasswordEmail({ email: resetEmail }, abortControllerRef.current.signal);

      if (response.success) {
        setLoading(false);
        sucessToast(`OTP has been sent to ${resetEmail}`);
        setForgotPasswordStep(2);
        setResendTimer(30);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      if (error.code !== "ECONNABORTED") {
        errorToast(
          error.response ? error.response.data.message : "Failed to send OTP"
        );
      }
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-body)] global-padding py-6 xs:py-10">
      <div className="bg-[var(--bg-white)] rounded-2xl shadow-xl border border-[var(--border-default)] overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-[var(--primary)] p-8 hidden md:flex flex-col justify-center items-center text-[var(--text-white)] relative overflow-hidden">
          <div className="w-full max-w-md z-10">
            <img
              src="/loginImage.png"
              alt="Login"
              className="w-full h-auto object-cover rounded-xl shadow-md border border-white/20"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg";
              }}
            />
          </div>
          <div className="mt-6 text-center z-10 space-y-1.5">
            <h2 className="text-xl xs:text-2xl font-bold text-[var(--text-white)]">Welcome Back!</h2>
            <p className="text-xs xs:text-sm text-[var(--primary-light)] max-w-xs leading-relaxed">
              Log in to access your account and continue your shopping journey.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 xs:p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-5 text-center">
            <h1 className="heading mb-1">
              {showForgotPassword ? "Reset Password" : "Login"}
            </h1>
            <p className="sub-heading">
              {showForgotPassword
                ? "Follow the steps to reset your password"
                : "Please enter your credentials to continue"}
            </p>
          </div>

          {!showForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="emailOrMobile"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-envelope text-[var(--primary)] mr-2"></i>
                  Email or Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  onChange={(e) =>
                    setLogin({ ...Login, email: e.target.value })
                  }
                  value={Login.email}
                  type="text"
                  id="emailOrMobile"
                  placeholder="Enter your email or mobile"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-lock text-[var(--primary)] mr-2"></i>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    onChange={(e) =>
                      setLogin({ ...Login, password: e.target.value })
                    }
                    value={Login.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                  />
                  <button
                    type="button"
                    className="password-eye-btn text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash text-xs xs:text-sm"></i>
                    ) : (
                      <i className="fa-solid fa-eye text-xs xs:text-sm"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleForgotPassword}
                  className="text-xs xs:text-sm text-[var(--primary)] hover:underline font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                disabled={!Login.email || !Login.password || loading}
                className={`${!Login.email || !Login.password || loading ? "disabled" : ""
                  } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer`}
              >
                {loading ? (
                  <span className="flex gap-2 items-center">
                    Loading... <ImSpinner8 className="animate-spin text-sm" />
                  </span>
                ) : (
                  <span className="flex gap-2 items-center">
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Sign In
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-2 bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] hover:bg-[var(--border-light)] font-semibold py-2.5 xs:py-3 px-4 rounded-lg text-xs xs:text-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Back to Homepage
              </button>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-bold ${forgotPasswordStep >= 1
                      ? "bg-[var(--primary)] text-[var(--text-white)]"
                      : "bg-[var(--bg-light)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                      }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-[11px] xs:text-xs font-semibold hidden sm:inline ${forgotPasswordStep === 1
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-secondary)]"
                      }`}
                  >
                    Account
                  </span>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${forgotPasswordStep >= 2
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--border-default)]"
                    }`}
                ></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-bold ${forgotPasswordStep >= 2
                      ? "bg-[var(--primary)] text-[var(--text-white)]"
                      : "bg-[var(--bg-light)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                      }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-[11px] xs:text-xs font-semibold hidden sm:inline ${forgotPasswordStep === 2
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-secondary)]"
                      }`}
                  >
                    Verify OTP
                  </span>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${forgotPasswordStep >= 3
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--border-default)]"
                    }`}
                ></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-bold ${forgotPasswordStep >= 3
                      ? "bg-[var(--primary)] text-[var(--text-white)]"
                      : "bg-[var(--bg-light)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                      }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-[11px] xs:text-xs font-semibold hidden sm:inline ${forgotPasswordStep === 3
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-secondary)]"
                      }`}
                  >
                    New Password
                  </span>
                </div>
              </div>

              {forgotPasswordStep === 1 && (
                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5">
                      <i className="fa-solid fa-envelope text-[var(--primary)] mr-2"></i>
                      Email or Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter registered email or phone"
                      className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                      required
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !resetEmail}
                    className={`${loading || !resetEmail ? "disabled" : ""
                      } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer contact-submit-btn`}
                  >
                    {loading ? (
                      <span className="flex gap-2 items-center">
                        Loading... <ImSpinner8 className="animate-spin text-sm" />
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-paper-plane"></i>
                        Send OTP
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="w-full mt-2 bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] hover:bg-[var(--border-light)] font-semibold py-2.5 xs:py-3 px-4 rounded-lg text-xs xs:text-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Login
                  </button>
                </form>
              )}

              {forgotPasswordStep === 2 && (
                <form onSubmit={handleOTPVerification} className="space-y-4">
                  <p className="text-xs xs:text-sm text-[var(--text-secondary)] mb-2">
                    We have sent an OTP to{" "}
                    <span className="font-semibold text-[var(--text-dark)]">{resetEmailorMobile}</span>
                  </p>

                  <label className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-2">
                    <i className="fa-solid fa-key text-[var(--primary)] mr-2"></i>
                    Enter 6-digit OTP <span className="text-red-500">*</span>
                  </label>

                  <div className="flex justify-center space-x-2">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={value}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        ref={otpRefs[index]}
                        placeholder="-"
                        className={`w-10 h-10 xs:w-12 xs:h-12 border rounded-lg text-center focus:outline-none transition-colors text-base xs:text-lg font-bold ${otpStatus === "success"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : otpStatus === "error"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-[var(--border-default)] focus:border-[var(--primary)] bg-[var(--bg-white)] text-[var(--text-dark)]"
                          }`}
                        maxLength={1}
                        required
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.join("").length !== 6}
                    className={`${loading || otp.join("").length !== 6 ? "disabled" : ""
                      } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer contact-submit-btn`}
                  >
                    {loading ? (
                      <span className="flex gap-2 items-center">
                        Loading... <ImSpinner8 className="animate-spin text-sm" />
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-check-circle"></i>
                        Verify OTP
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-[var(--text-secondary)] text-center mt-2">
                    Didn't receive the OTP?{" "}
                    {resendTimer > 0 ? (
                      <span className="font-semibold text-[var(--text-dark)]">
                        Resend in {resendTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-[var(--primary)] hover:underline font-semibold cursor-pointer"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </button>
                    )}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordStep(1);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                    className="w-full mt-2 bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] hover:bg-[var(--border-light)] font-semibold py-2.5 xs:py-3 px-4 rounded-lg text-xs xs:text-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Change Email / Phone
                  </button>
                </form>
              )}

              {forgotPasswordStep === 3 && (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5">
                      <i className="fa-solid fa-lock text-[var(--primary)] mr-2"></i>
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className="w-full pl-3.5 pr-10 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                        minLength={6}
                        required
                        autoFocus
                      />
                      <button
                        type="button"
                        className="password-eye-btn text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors focus:outline-none"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        tabIndex="-1"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? (
                          <i className="fa-solid fa-eye-slash text-xs xs:text-sm"></i>
                        ) : (
                          <i className="fa-solid fa-eye text-xs xs:text-sm"></i>
                        )}
                      </button>
                    </div>

                    {newPassword && (
                      <div className="mt-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${passwordStrength === 0
                                ? "w-0"
                                : passwordStrength === 1
                                  ? "w-1/3 bg-red-500"
                                  : passwordStrength === 2
                                    ? "w-2/3 bg-yellow-500"
                                    : "w-full bg-green-500"
                                }`}
                            ></div>
                          </div>
                          <span className="text-[10px] xs:text-xs font-semibold text-[var(--text-secondary)]">
                            {passwordStrength === 0
                              ? ""
                              : passwordStrength === 1
                                ? "Weak"
                                : passwordStrength === 2
                                  ? "Medium"
                                  : "Strong"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5">
                      <i className="fa-solid fa-lock text-[var(--primary)] mr-2"></i>
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full pl-3.5 pr-10 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                        minLength={6}
                        required
                      />
                      <button
                        type="button"
                        className="password-eye-btn text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors focus:outline-none"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex="-1"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <i className="fa-solid fa-eye-slash text-xs xs:text-sm"></i>
                        ) : (
                          <i className="fa-solid fa-eye text-xs xs:text-sm"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !newPassword || !confirmPassword}
                    className={`${loading || !newPassword || !confirmPassword ? "disabled" : ""
                      } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer contact-submit-btn`}
                  >
                    {loading ? (
                      <span className="flex gap-2 items-center">
                        Loading... <ImSpinner8 className="animate-spin text-sm" />
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <i className="fa-solid fa-check"></i>
                        Reset Password
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      cancelForgotPassword();
                      navigate("/login");
                    }}
                    className="w-full mt-2 bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] hover:bg-[var(--border-light)] font-semibold py-2.5 xs:py-3 px-4 rounded-lg text-xs xs:text-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Login
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="text-xs xs:text-sm text-[var(--text-secondary)] mt-5 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--primary)] hover:underline font-bold transition-colors"
            >
              Create an account
            </Link>
          </p>

          <div className="flex items-center my-5">
            <div className="flex-1 h-[1px] bg-[var(--border-default)]"></div>
            <span className="mx-3 text-xs text-[var(--text-secondary)] font-medium">OR</span>
            <div className="flex-1 h-[1px] bg-[var(--border-default)]"></div>
          </div>

          <button
            type="button"
            className="w-full bg-[var(--bg-white)] border border-[var(--border-default)] text-[var(--text-dark)] hover:bg-[var(--bg-light)] font-semibold py-2.5 xs:py-3 px-4 rounded-lg text-xs xs:text-sm transition-all duration-200 shadow-xs active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-4 h-4 xs:w-5 xs:h-5 shrink-0"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
