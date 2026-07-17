import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { HiHome } from "react-icons/hi";
import "./Error.css";
const Error = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="errorPage flex items-center justify-center min-h-[90vh] bg-[var(--bg-light)] px-4">
      <ScrollToTop />
      <div className="text-center">
        <img
          src="/errorImage.png"
          alt="404 Error"
          className="w-[180px] xs:w-[240px] md:w-[300px] mx-auto"
        />

        <h1 className="text-[22px] xs:text-[28px] md:text-[36px] font-[600] text-[var(--text-primary)] mb-[8px] xs:mb-[12px]">
          404 - Page Not Found
        </h1>
        <p className="text-[13px] xs:text-[15px] md:text-[18px] text-[var(--text-secondary)] mb-[16px] xs:mb-[24px]">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <button
          onClick={redirectToHome}
          className="bg-[var(--primary)] text-[var(--text-white)] px-[18px] xs:px-[24px] py-[10px] xs:py-[12px] rounded-[8px] font-[500] text-[13px] xs:text-[15px] md:text-[16px] hover:brightness-110 transition duration-150 active:scale-[0.98] cursor-pointer flex items-center gap-2 mx-auto"
        >
          <HiHome className="text-[16px] xs:text-[18px]" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
