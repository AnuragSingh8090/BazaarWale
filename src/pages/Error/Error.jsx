import { useNavigate } from "react-router-dom";
import "./Error.css";
const Error = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="errorPage flex items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="text-center">
        <img
          src="/errorImage.png"
          alt="404 Error"
          className="w-[300px]  mx-auto"
        />

        <h1 className="text-[36px] font-[600] text-gray-800 mb-[12px]">
          404 - Page Not Found
        </h1>
        <p className="text-[18px] text-gray-600 mb-[24px]">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <button
          onClick={redirectToHome}
          className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[8px] font-[500] text-[16px] hover:bg-blue-700 transition duration-200 active:scale-[0.98] cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
