import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer bg-[var(--primary)]  w-full text-[white] px-[15px] py-[10px] flex flex-col items-center md:px-[30px] md:py-[20px] lg:py-[10px]">
      <div className="w-full lg:w-[90%] xl:w-[80%]">
        <section className="flex gap-2 flex-wrap align-center justify-between  mb-3 pb-3 w-full border-b-1 border-[#54bef7] md:flex-nowrap md:justify-center md:gap-18 lg:justify-between lg:gap-2 ">
          <div className=" w-max">
            <h2 className="font-medium w-max text-[16px] py-1 border-b-1 border-[white]">
              Quick Links
            </h2>
            <ul className=" text-gray-300 flex flex-col gap-1 text-[14px] font-light mt-2 ">
              <Link to="/electronics">
                <li className="hover:text-white">Electronics</li>
              </Link>
              <Link to="/clothing">
                <li className="hover:text-white">Clothing</li>
              </Link>
              <Link to="/home_appliences">
                <li className="hover:text-white">Home Appliences</li>
              </Link>
              <Link to="/kids">
                <li className="hover:text-white">Kids</li>
              </Link>
              <Link to="/beauty">
                <li className="hover:text-white">Beauty</li>
              </Link>
              <Link to="/kitchen">
                <li className="hover:text-white">Kitchen</li>
              </Link>
              <Link to="/personal_care">
                <li className="hover:text-white">Personal Care</li>
              </Link>
            </ul>
          </div>

          <div className=" w-max">
            <h2 className="font-medium w-max text-[16px] py-1 border-b-1 border-[white]">
              Customer Services
            </h2>
            <ul className=" text-gray-300 flex flex-col gap-1 text-[14px] font-light mt-2 ">
              <Link to="/about_us">
                <li className="hover:text-white">About US</li>
              </Link>
              <Link to="/terms_conditions">
                <li className="hover:text-white">Terms & Conditions</li>
              </Link>
              <Link to="/faq">
                <li className="hover:text-white">FAQ</li>
              </Link>
              <Link to="/privacy_policy">
                <li className="hover:text-white">Privace Policy</li>
              </Link>
              <Link to="/cancellation_return_policy">
                <li className="hover:text-white">
                  Cancellation & Return Policy
                </li>
              </Link>
            </ul>
          </div>

          <div className=" w-max">
            <h2 className="font-medium text-[16px] w-max py-1 border-b-1 border-[white]">
              Contact US
            </h2>
            <ul className=" text-gray-300  flex  flex-col gap-1   text-[14px] font-light mt-2 ">
              <li className="hover:text-white flex items-center gap-2">
                <i className="fa-solid fa-phone text-12"></i>+91 8090674352
              </li>

              <li className="hover:text-white flex items-center gap-2">
                <i className="fa-brands fa-whatsapp text-12"></i>+91 8090674352
              </li>

              <li className="hover:text-white flex items-center gap-2">
                <i className="fa-solid fa-envelope text-12 "></i>
                anuragkumarsingh154@gmail.com
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/" target="_blank">
                <i
                  className="text-gray-300 text-[20px] pointer hover:text-white fa-brands fa-instagram"
                  title="Instagram"
                ></i>
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <i
                  className="text-gray-300 text-[20px] pointer hover:text-white fa-brands fa-facebook"
                  title="Facebook"
                ></i>
              </a>
              <a href="https://www.linkedin.com/" target="_blank">
                <i
                  className="text-gray-300 text-[20px] pointer hover:text-white fa-brands fa-linkedin"
                  title="Linkedin"
                ></i>
              </a>
              <a href="https://x.com/?lang=en" target="_blank">
                <i
                  className="text-gray-300 text-[20px] pointer hover:text-white fa-brands fa-x-twitter"
                  title="Twitter"
                ></i>
              </a>
            </div>
          </div>
        </section>

        <p className="text-[#f2f3f3] font-light text-[12px] w-full  text-center">
          Copyright ©2025 All rights reserved. BaazaarWale pvt Ltd. | Service is
          made by <b>Anurag Kumar Singh</b>
        </p>
      </div>
    </div>
  );
};

export default Footer;
