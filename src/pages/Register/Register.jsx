import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
import { errorToast, sucessToast } from "../../components/Toasters/Toasters";
import apiService from "../../services/apiService";
import { useDispatch } from "react-redux";
import { loginUser, startLoading, stopLoading } from "../../store/slices/userSlice";
import "./Register.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [Register, setRegister] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const user = {
        name: Register.fullname,
        email: Register.email,
        password: Register.password,
        gender: Register.gender,
        mobile: Register.mobile,
      };

      const response = await apiService.registerUser(user, abortControllerRef.current.signal);
      const token = response.token;
      const { name, email, cart, userId } = response.user;
      sucessToast("Account Created Successfully !!");
      dispatch(startLoading());
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
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (error.message === 'canceled') return;
      if (error.code !== "ECONNABORTED") {
        errorToast(error.response?.data?.message || "Registration failed");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-body)] global-padding py-6 xs:py-10">
      <div className="bg-[var(--bg-white)] rounded-2xl shadow-xl border border-[var(--border-default)] overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-[var(--primary)] p-8 hidden md:flex flex-col justify-center items-center text-[var(--text-white)] relative overflow-hidden">
          <div className="w-full max-w-md z-10">
            <img
              src="/registerImage.png"
              alt="Register"
              className="w-full h-auto object-cover rounded-xl shadow-md border border-white/20"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg";
              }}
            />
          </div>
          <div className="mt-6 text-center z-10 space-y-1.5">
            <h2 className="text-xl xs:text-2xl font-bold text-[var(--text-white)]">Join Our Community!</h2>
            <p className="text-xs xs:text-sm text-[var(--primary-light)] max-w-xs leading-relaxed">
              Create an account to enjoy exclusive benefits and personalized shopping.
            </p>
          </div>
        </div>

        <div className="md:w-3/5 p-6 xs:p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-5 text-center">
            <h1 className="heading mb-1">Create Account</h1>
            <p className="sub-heading">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="fullName"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-user text-[var(--primary)] mr-2"></i>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  onChange={(e) =>
                    setRegister({ ...Register, fullname: e.target.value })
                  }
                  value={Register.fullname}
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="number"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-phone text-[var(--primary)] mr-2"></i>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="bg-[var(--bg-light)] border border-r-0 border-[var(--border-default)] rounded-l-lg px-3 py-2.5 text-[var(--text-primary)] text-xs xs:text-sm flex items-center font-medium select-none">
                    +91
                  </div>
                  <input
                    required
                    onChange={(e) =>
                      setRegister({ ...Register, mobile: e.target.value })
                    }
                    value={Register.mobile}
                    type="number"
                    id="number"
                    placeholder="Enter your mobile number"
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-r-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-[var(--text-secondary)]/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-envelope text-[var(--primary)] mr-2"></i>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  onChange={(e) =>
                    setRegister({ ...Register, email: e.target.value })
                  }
                  value={Register.email}
                  type="email"
                  id="email"
                  placeholder="Enter your email id"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-secondary)]/50"
                />
              </div>
              <div className="w-full">
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
                      setRegister({ ...Register, password: e.target.value })
                    }
                    value={Register.password}
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
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label
                  htmlFor="age"
                  className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-1.5"
                >
                  <i className="fa-solid fa-calendar text-[var(--primary)] mr-2"></i>
                  Age
                </label>
                <input
                  onChange={(e) =>
                    setRegister({ ...Register, age: e.target.value })
                  }
                  value={Register.age}
                  type="number"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="age"
                  min="14"
                  max="100"
                  placeholder="Your age"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg text-xs xs:text-sm text-[var(--text-dark)] focus:outline-none focus:border-[var(--primary)] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-[var(--text-secondary)]/50"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-2">
                  <i className="fa-solid fa-venus-mars text-[var(--primary)] mr-2"></i>
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-6 pt-1">
                  <label className="inline-flex items-center cursor-pointer">
                    <div className="relative flex items-center justify-center">
                      <input
                        required
                        type="radio"
                        name="gender"
                        value="male"
                        checked={Register.gender === "male"}
                        onChange={(e) =>
                          setRegister({ ...Register, gender: e.target.value })
                        }
                        className="absolute opacity-0 w-5 h-5"
                      />
                      <div
                        className={`w-4 h-4 xs:w-5 xs:h-5 rounded-full border ${Register.gender === "male"
                          ? "border-[var(--primary)]"
                          : "border-[var(--border-default)]"
                          } flex items-center justify-center`}
                      >
                        {Register.gender === "male" && (
                          <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-[var(--primary)]"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-xs xs:text-sm font-medium text-[var(--text-dark)]">Male</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={Register.gender === "female"}
                        onChange={(e) =>
                          setRegister({ ...Register, gender: e.target.value })
                        }
                        className="absolute opacity-0 w-5 h-5"
                      />
                      <div
                        className={`w-4 h-4 xs:w-5 xs:h-5 rounded-full border ${Register.gender === "female"
                          ? "border-[var(--primary)]"
                          : "border-[var(--border-default)]"
                          } flex items-center justify-center`}
                      >
                        {Register.gender === "female" && (
                          <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-[var(--primary)]"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 text-xs xs:text-sm font-medium text-[var(--text-dark)]">Female</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              disabled={
                !Register.fullname ||
                !Register.mobile ||
                !Register.email ||
                !Register.password ||
                !Register.gender ||
                loading
              }
              className={`contact-submit-btn ${!Register.fullname ||
                !Register.mobile ||
                !Register.email ||
                !Register.password ||
                !Register.gender ||
                loading
                ? "disabled"
                : ""
                } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer mt-2`}
            >
              {loading ? (
                <span className="flex gap-2 items-center">
                  Loading... <ImSpinner8 className="animate-spin text-sm" />
                </span>
              ) : (
                <span className="flex gap-2 items-center">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
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

          <p className="text-xs xs:text-sm text-[var(--text-secondary)] mt-5 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--primary)] hover:underline font-bold transition-colors"
            >
              Login
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

export default Register;
