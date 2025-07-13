import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sucessToast } from "../../components/Toasters/Toasters";
import { ImSpinner8 } from "react-icons/im";


const Register = () => {
  const [loading, setLoading] = useState(false)
  const [Register, setRegister] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  function redirectLogin() {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true)
    console.log(Register);
    setTimeout(() => {
      setLoading(false)
      redirectLogin();
      sucessToast("Account Created Successfully !!");
    }, 3000)
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row animate-[fadeIn_0.6s_ease-out]">

          {/* Image Section - On the left for registration */}
          <div className="md:w-2/5 bg-gradient-to-br from-indigo-500 to-blue-400 p-8 hidden md:flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500 opacity-10 z-0"></div>
            <div className="w-full max-w-md z-10 transform transition-all duration-500 animate-[floating_6s_ease-in-out_infinite]">
              <img
                src="/registerImage.png"
                alt="Register"
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg";
                }}
              />
            </div>
            <div className="mt-8 text-center z-10">
              <h2 className="text-2xl font-bold mb-2">Join Our Community!</h2>
              <p className="text-blue-100">Create an account to enjoy exclusive benefits and personalized shopping.</p>
            </div>

            {/* Animated elements */}
            <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-indigo-300 opacity-20 animate-pulse"></div>
          </div>

          {/* Form Section */}
          <div className="md:w-3/5 p-6 md:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 relative inline-block">
                Create Account
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </h2>
              <p className="text-gray-600 text-sm">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Name */}
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-user text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                  />
                </div>
                {/* Mobile */}
                <div className="w-full">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-phone text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-gray-600 text-sm flex items-center">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:border-blue-500 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Email */}
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-envelope text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-300"
                  />
                </div>
                {/* Password */}
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-lock text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
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
              </div>

              {/* Age & Gender */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Age */}
                <div className="w-full">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fa-solid fa-calendar text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-gray-300"
                  />
                </div>
                {/* Gender */}
                <div className="w-full">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <i className="fa-solid fa-venus-mars text-blue-500 mr-2 animate-[pulse_2s_infinite]"></i>
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-8">
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
                        <div className={`w-5 h-5 rounded-full border ${Register.gender === "male" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}>
                          {Register.gender === "male" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                        </div>
                      </div>
                      <span className="ml-2 text-gray-700">Male</span>
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
                        <div className={`w-5 h-5 rounded-full border ${Register.gender === "female" ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}>
                          {Register.gender === "female" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                        </div>
                      </div>
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                disabled={!Register.fullname || !Register.mobile || !Register.email || !Register.password || !Register.gender || loading}
                className={`w-full text-white py-2 flex items-center justify-center rounded-lg font-medium text-sm transition duration-300 shadow-md relative overflow-hidden mt-2 ${Register.fullname && Register.mobile && Register.email && Register.password && Register.gender
                    ? "bg-indigo-500 cursor-pointer"
                    : "bg-gray-400 opacity-70"
                  }`}
              >

                {
                  loading ? (<span className="flex gap-2 items-center">Loading.. <ImSpinner8 className='animate-spin' /></span>) : (
                    <span>
                      <i className={`fa-solid fa-user-plus mr-2 ${Register.fullname && Register.mobile && Register.email && Register.password && Register.gender ? "animate-[bounce_1s_ease_infinite]" : ""}`}></i>
                      Register
                    </span>)
                }


              </button>
            </form>

            <p className="text-sm text-gray-600 mt-5 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium transition-colors duration-300">
                Login
              </Link>
            </p>

            <div className="flex items-center my-5">
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

export default Register;
