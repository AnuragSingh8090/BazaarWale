const LoadingPage = () => {
  return (
    <div className="fixed h-screen w-screen bg-gray-900 flex flex-col items-center justify-center top-0 left-0 text-white z-[999999] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-16 left-4 sm:top-20 sm:left-16 opacity-10 animate-float-slow">
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="#008ecc"
          >
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
          </svg>
        </div>
        <div className="absolute top-24 right-4 sm:top-32 sm:right-20 opacity-10 animate-float-medium">
          <svg
            className="w-5 h-5 sm:w-7 sm:h-7"
            viewBox="0 0 24 24"
            fill="#008ecc"
          >
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-24 left-4 sm:bottom-32 sm:left-20 opacity-10 animate-float-fast">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="#008ecc"
          >
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-8 sm:bottom-40 sm:right-32 opacity-10 animate-float-slow">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="#008ecc"
          >
            <path d="M9 11H7L9 13H7C5.9 13 5 12.1 5 11V9C5 7.9 5.9 7 7 7H9C10.1 7 11 7.9 11 9V11ZM17 7H15C13.9 7 13 7.9 13 9V11C13 12.1 13.9 13 15 13H17C18.1 13 19 12.1 19 11V9C19 7.9 18.1 7 17 7Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 sm:mb-8 relative">
          <svg className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 absolute inset-0">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#008ecc"
              strokeWidth="1"
              opacity="0.2"
              strokeDasharray="10 20"
              className="animate-spin-slow"
            />

            <g className="animate-spin">
              <circle cx="50%" cy="5%" r="2" fill="#008ecc" opacity="0.8">
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g className="animate-spin" style={{ animationDelay: "1s" }}>
              <circle cx="95%" cy="50%" r="1.5" fill="#00bfff" opacity="0.7">
                <animate
                  attributeName="r"
                  values="1.5;3;1.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g className="animate-spin" style={{ animationDelay: "2s" }}>
              <circle cx="50%" cy="95%" r="2" fill="#008ecc" opacity="0.8">
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>

          <svg
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative"
            viewBox="0 0 200 200"
          >
            <path
              d="M60 80 L140 80 L135 130 L65 130 Z"
              fill="none"
              stroke="#008ecc"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,400;200,200;400,0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            <path
              d="M50 75 L60 80"
              stroke="#008ecc"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            <circle
              cx="80"
              cy="145"
              r="8"
              fill="none"
              stroke="#008ecc"
              strokeWidth="3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 80 145;360 80 145"
                dur="2s"
                repeatCount="indefinite"
              />
              <circle cx="80" cy="145" r="3" fill="#008ecc" opacity="0.6" />
            </circle>
            <circle
              cx="120"
              cy="145"
              r="8"
              fill="none"
              stroke="#008ecc"
              strokeWidth="3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 120 145;360 120 145"
                dur="2s"
                repeatCount="indefinite"
              />
              <circle cx="120" cy="145" r="3" fill="#008ecc" opacity="0.6" />
            </circle>

            <rect
              x="75"
              y="90"
              width="20"
              height="20"
              rx="4"
              fill="#008ecc"
              opacity="0.7"
            >
              <animate
                attributeName="y"
                values="90;85;90"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="100"
              y="95"
              width="15"
              height="15"
              rx="3"
              fill="#00bfff"
              opacity="0.8"
            >
              <animate
                attributeName="y"
                values="95;90;95"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="85"
              y="105"
              width="12"
              height="12"
              rx="2"
              fill="#008ecc"
              opacity="0.9"
            >
              <animate
                attributeName="y"
                values="105;100;105"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Price Tags */}
            <g className="animate-float-tags">
              <text
                x="125"
                y="75"
                fill="#008ecc"
                fontSize="8"
                opacity="0.6"
                className="sm:text-xs"
              >
                $
              </text>
              <text
                x="145"
                y="85"
                fill="#00bfff"
                fontSize="6"
                opacity="0.5"
                className="sm:text-sm"
              >
                %
              </text>
            </g>

            <circle cx="100" cy="100" r="0" fill="#008ecc" opacity="0.3">
              <animate
                attributeName="r"
                values="0;50;0"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <div className="text-center mb-6 sm:mb-8 px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3 tracking-wide animate-fade-in-out"
            style={{ color: "#008ecc" }}
          >
            Preparing Your Store
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wider animate-typing">
            <span className="animate-pulse">
              Loading products, deals & more...
            </span>
          </p>
        </div>

        <div className="w-64 sm:w-80 md:w-96 h-0.5 sm:h-1 bg-gray-800 rounded-full overflow-hidden mb-3 sm:mb-4">
          <div
            className="h-full rounded-full animate-shopping-progress"
            style={{ backgroundColor: "#008ecc" }}
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs font-mono px-4">
          <span className="animate-count-up text-center sm:text-left">
            Products: <span style={{ color: "#008ecc" }}>∞</span>
          </span>
          <span
            className="animate-count-up text-center sm:text-left"
            style={{ animationDelay: "0.5s" }}
          >
            Deals: <span style={{ color: "#008ecc" }}>Loading...</span>
          </span>
          <span
            className="animate-count-up text-center sm:text-left"
            style={{ animationDelay: "1s" }}
          >
            Cart: <span style={{ color: "#008ecc" }}>Ready</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-15px) scale(1.1);
          }
          66% {
            transform: translateY(5px) scale(0.9);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(10px);
          }
        }

        @keyframes float-tags {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes cart-fill {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in-out {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shopping-progress {
          0% {
            transform: translateX(-100%) scaleX(0);
          }
          50% {
            transform: translateX(-50%) scaleX(1);
          }
          100% {
            transform: translateX(100%) scaleX(0);
          }
        }

        @keyframes count-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes typing {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        .animate-float-tags {
          animation: float-tags 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-cart-fill {
          animation: cart-fill 2s linear infinite;
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }
        .animate-shopping-progress {
          animation: shopping-progress 3s ease-in-out infinite;
        }
        .animate-count-up {
          animation: count-up 1s ease-out forwards;
        }
        .animate-typing {
          animation: typing 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
