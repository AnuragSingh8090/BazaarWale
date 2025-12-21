import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginUser } from "../../store/slices/userSlice";
import apiService from "../../services/apiService";

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

  const dispatch = useDispatch();

  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const abortControllerRef = useRef(null);

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
      // const response = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      //   user,
      //   { signal: abortControllerRef.current.signal }
      // );

      const response = await apiService.loginUser(user, abortControllerRef.current.signal);
      const  token  = response.token;
      const { name, email, cart, userId } = response.user;
      sucessToast("Login Successfully !!");
      dispatch(loginStart());

      setTimeout(() => {
        dispatch(
          loginUser({
            token,
            name,
            email,
            cart,
            userId,
          })
        );
        navigate("/");
      }, 1000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      errorToast(
        error.response ? error.response.data.message : "Something went wrong"
      );
      console.log("Error",error);
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
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/validateresetpasswordemail`,
        { email: resetEmail },
        { signal: abortControllerRef.current.signal }
      );

      if (response.status === 200) {
        setLoading(false);
        sucessToast(response.data.message);
        setResetEmailorMobile(response.data.message);
        setForgotPasswordStep(2);
        setResendTimer(30);
      }
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      errorToast(
        error.response ? error.response.data.message : "Failed to send OTP"
      );
      console.log(error);
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/validateresetpasswordotp`,
        { email: resetEmail, otp: otpString },
        { signal: abortControllerRef.current.signal }
      );
      if (response.status === 200) {
        setLoading(false);
        setOtpStatus("success");
        sucessToast("OTP verified successfully");
        setForgotPasswordStep(3);
      }
    } catch (error) {
      if (error.message === 'canceled') return;
      setLoading(false);
      setOtpStatus("error");
      setOtp(["", "", "", "", "", ""]);
      otpRefs[0].current.focus();
      errorToast(
        error.response
          ? error.response.data.message
          : "Failed to Varify Please Try Again!!"
      );
      console.log(error);
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
          "Password must contain uppercase, lowercase , numbers and special characters"
        );
        return;
      }

      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/resetpassword`,
        { email: resetEmail, password: newPassword },
        { signal: abortControllerRef.current.signal }
      );

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
      errorToast(
        error.response
          ? error.response.data.message
          : "Failed to Update Your Password !!"
      );
      console.log(error);
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
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/validateresetpasswordemail`,
        { email: resetEmail },
        { signal: abortControllerRef.current.signal }
      );

      if (response.status === 200) {
        setLoading(false);
        sucessToast(`OTP has been sent to ${resetEmail}`);
        setForgotPasswordStep(2);
        setResendTimer(30);
      }
    } catch (error) {
      if (error.message === 'canceled') return;
      setLoading(false);
      errorToast(
        error.response ? error.response.data.message : "Failed to send OTP"
      );
      console.log(error);
    }
  };

  return (
    <>
      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px) scale(1.05); }
          50% { transform: translateY(-15px) scale(1.05); }
          100% { transform: translateY(0px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row animate-[fadeIn_0.5s_ease-out]">
          <div className="md:w-1/2 bg-gradient-to-tr from-blue-400 to-indigo-500 p-8 hidden md:flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 opacity-20 z-0"></div>
            <div className="w-full max-w-md z-10 transform transition-all duration-500 animate-[floating_6s_ease-in-out_infinite]">
              <img
                src="/loginImage.png"
                alt="Login"
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg";
                }}
              />
            </div>
            <div className="mt-8 text-center z-10">
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-blue-100">
                Log in to access your account and continue your shopping
                journey.
              </p>
            </div>

            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-indigo-300 opacity-20 animate-pulse"></div>
          </div>

          <div className="md:w-1/2 p-8 md:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 relative inline-block">
                {showForgotPassword ? "Reset Password" : "Login"}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h2>
              <p className="text-gray-600 text-sm">
                {showForgotPassword
                  ? "Follow the steps to reset your password"
                  : "Please enter your credentials to continue"}
              </p>
            </div>

            {!showForgotPassword ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative">
                  <label
                    htmlFor="emailOrMobile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-envelope text-blue-500 mr-2"></i>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-lock text-blue-500 mr-2"></i>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="text-sm text-blue-600  hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  disabled={!Login.email || !Login.password || loading}
                  className={`w-full text-white py-2 flex items-center justify-center rounded-lg font-medium text-sm transition duration-300 shadow-md relative overflow-hidden ${
                    Login.email && Login.password
                      ? "bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600  cursor-pointer"
                      : "bg-gray-400 opacity-70"
                  }`}
                >
                  {loading ? (
                    <span className="flex gap-2 items-center">
                      Loading.. <ImSpinner8 className="animate-spin" />
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <i
                        className={`fa-solid fa-right-to-bracket mr-2 ${
                          Login.email && Login.password
                            ? "animate-[bounce_1s_ease_infinite]"
                            : ""
                        }`}
                      ></i>
                      Sign In
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className={`w-full text-white py-2 flex items-center justify-center rounded-lg font-medium text-sm transition duration-300 shadow-md relative overflow-hidden mt-2 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600  cursor-pointer`}
                >
                  <span>
                    <i className={`fa-solid fa-arrow-left mr-2 `}></i>
                    Back to Homepage
                  </span>
                </button>
              </form>
            ) : (
              <div>
                {forgotPasswordStep === 1 && (
                  <form
                    onSubmit={handleForgotPasswordSubmit}
                    className="space-y-4"
                  >
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                          1
                        </span>
                        Enter your Email or Phone Number
                      </h3>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <i className="fa-solid fa-envelope text-blue-500 mr-2"></i>
                        Email or Phone Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your registered email or phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading ? true : false}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 rounded-lg font-medium text-sm hover:from-blue-500 hover:to-indigo-600 transition duration-300 cursor-pointer"
                    >
                      {loading ? (
                        <span className="flex gap-2 items-center event-none pointer-none ">
                          Loading.. <ImSpinner8 className="animate-spin" />
                        </span>
                      ) : (
                        <span className="fled gap-2 items-center">
                          <i className="fa-solid fa-paper-plane mr-2"></i>
                          Send OTP
                        </span>
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={toggleForgotPassword}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                      >
                        <i className="fa-solid fa-arrow-left mr-1"></i>
                        Back to Login
                      </button>
                    </div>
                  </form>
                )}

                {forgotPasswordStep === 2 && (
                  <form onSubmit={handleOTPVerification} className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                          2
                        </span>
                        Verify OTP
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      We have sent an OTP to{" "}
                      <span className="font-medium">{resetEmailorMobile}</span>
                    </p>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-solid fa-key text-blue-500 mr-2"></i>
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
                          className={`w-12 h-12 border rounded-lg text-center focus:outline-none focus:border-transparent transition-all duration-300 text-lg font-medium placeholder-gray-300 ${
                            otpStatus === "success"
                              ? "border-green-500 bg-green-50 focus:border-green-500"
                              : otpStatus === "error"
                              ? "border-red-500 bg-red-50 focus:border-red-500"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          maxLength={1}
                          required
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading ? true : false}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 rounded-lg font-medium text-sm hover:from-blue-500 hover:to-indigo-600 transition duration-300 cursor-pointer"
                    >
                      {loading ? (
                        <span className="flex gap-2 items-center pointer-none ">
                          Loading.. <ImSpinner8 className="animate-spin" />
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <i className="fa-solid fa-check-circle mr-2"></i>
                          Verify OTP
                        </span>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-2">
                      Didn't receive the OTP?
                      {resendTimer > 0 ? (
                        <span className="text-gray-500 ml-1">
                          Resend in{" "}
                          <span className="font-medium">{resendTimer}s</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="text-blue-600 hover:underline ml-1 cursor-pointer"
                          onClick={handleResendOTP}
                        >
                          Resend OTP
                        </button>
                      )}
                    </p>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setForgotPasswordStep(1);
                          setOtp(["", "", "", "", "", ""]);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                      >
                        <i className="fa-solid fa-arrow-left mr-1"></i>
                        Change Email/Phone
                      </button>
                    </div>
                  </form>
                )}

                {forgotPasswordStep === 3 && (
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                          3
                        </span>
                        Create New Password
                      </h3>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <i className="fa-solid fa-lock text-blue-500 mr-2"></i>
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                          minLength={6}
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors focus:outline-none cursor-pointer"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          tabIndex="-1"
                        >
                          {showNewPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </button>
                      </div>

                      {newPassword && (
                        <div className="mt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  passwordStrength === 0
                                    ? "w-0"
                                    : passwordStrength === 1
                                    ? "w-1/3 bg-red-500"
                                    : passwordStrength === 2
                                    ? "w-2/3 bg-yellow-500"
                                    : "w-full bg-green-500"
                                }`}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">
                              {passwordStrength === 0
                                ? ""
                                : passwordStrength === 1
                                ? "Weak"
                                : passwordStrength === 2
                                ? "Medium"
                                : "Strong"}
                            </span>
                          </div>
                          <div className="mt-1.5 text-xs text-gray-500">
                            <ul className="space-y-1 pl-5 list-disc">
                              <li
                                className={
                                  newPassword.length >= 8
                                    ? "text-green-600"
                                    : ""
                                }
                              >
                                At least 8 characters
                              </li>
                              <li
                                className={
                                  /[A-Z]/.test(newPassword) &&
                                  /[a-z]/.test(newPassword)
                                    ? "text-green-600"
                                    : ""
                                }
                              >
                                Mix of uppercase & lowercase letters
                              </li>
                              <li
                                className={
                                  /\d/.test(newPassword) ? "text-green-600" : ""
                                }
                              >
                                At least one number
                              </li>
                              <li
                                className={
                                  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                                    ? "text-green-600"
                                    : ""
                                }
                              >
                                Special character (recommended)
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <i className="fa-solid fa-lock text-blue-500 mr-2"></i>
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                          minLength={6}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors focus:outline-none cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          tabIndex="-1"
                        >
                          {showConfirmPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading ? true : false}
                      className="w-full flex items-center gap-2 justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 rounded-lg font-medium text-sm hover:from-blue-500 hover:to-indigo-600 transition duration-300 cursor-pointer"
                    >
                      {loading ? (
                        <span className="flex gap-2 items-center pointer-none ">
                          Loading.. <ImSpinner8 className="animate-spin" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-check mr-2"></i>
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
                      className="text-sm w-full flex items-center justify-center text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-left mr-1"></i>
                      Back to Login
                    </button>
                  </form>
                )}
              </div>
            )}

            <p className="text-sm text-gray-600 mt-5 text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium transition-colors duration-300"
              >
                Create an account
              </Link>
            </p>

            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            <button className="w-full disabled flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                className="w-5 h-5 mr-3"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
