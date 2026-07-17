import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { companyDetails } from "../../constants/companyDetails";
const Footer = () => {
  const contactDetails = useSelector((state) => state.contact);
  return (
    <footer className="global-padding footer bg-[var(--primary)]  w-full text-[white] py-[10px] flex flex-col items-center  md:py-[20px] lg:py-[10px]">
      <div className="w-full global-width ">
        <section className="flex hover:rounded-[unset] gap-2 flex-wrap align-center justify-between  mb-3 pb-3 w-full border-b-1 border-[#54bef7] md:flex-nowrap md:justify-around md:gap-18 lg:justify-between lg:gap-2 ">

          {/* Brand Section - visible only on lg+ */}
          <div className="hidden lg:flex flex-col gap-3 max-w-[260px] min-w-[220px]">
            <Link to="/home" className="flex items-center gap-2.5">
              <img
                src={companyDetails.companyLogo}
                alt={companyDetails.companyName}
                className="w-[42px] h-[42px] object-contain"
              />
              <span className="footer-brand-name text-[22px] shrink-0">
                {companyDetails.companyName}
              </span>
            </Link>
            <p className="text-[13px] text-[var(--text-light-grey)] leading-relaxed font-light">
              Your one-stop destination for the best deals on electronics, fashion, home appliances & more.
            </p>
            {companyDetails.fullAddress && (
              <div className="flex items-start gap-2 text-[12px] text-[var(--text-light-grey)] font-light pt-2 border-t border-white/10">
                <i className="fa-solid fa-location-dot mt-[3px] text-[11px] shrink-0"></i>
                <span>{companyDetails.fullAddress}</span>
              </div>
            )}
          </div>

          <div className=" w-max">
            <h2 className="font-medium w-max text-[14px] xs:text-[16px] py-1 border-b-1 border-[white]">
              Quick Links
            </h2>
            <ul className=" text-gray-300 flex flex-col gap-1 text-[11px] xs:text-[14px] font-light mt-2 ">
              <Link to="/home">
                <li className="hover:text-white transition-colors duration-150">Home</li>
              </Link>
              <Link to="/electronics">
                <li className="hover:text-white transition-colors duration-150">Electronics</li>
              </Link>
              <Link to="/clothing">
                <li className="hover:text-white transition-colors duration-150">Clothing</li>
              </Link>
              <Link to="/home_appliences">
                <li className="hover:text-white transition-colors duration-150">Home Appliences</li>
              </Link>
              <Link to="/kids">
                <li className="hover:text-white transition-colors duration-150">Kids</li>
              </Link>
              <Link to="/beauty">
                <li className="hover:text-white transition-colors duration-150">Beauty</li>
              </Link>
              <Link to="/kitchen">
                <li className="hover:text-white transition-colors duration-150">Kitchen</li>
              </Link>
              <Link to="/personal_care">
                <li className="hover:text-white transition-colors duration-150">Personal Care</li>
              </Link>
            </ul>
          </div>

          <div className=" w-max">
            <h2 className="font-medium w-max text-[14px] xs:text-[16px] py-1 border-b-1 border-[white]">
              Customer Services
            </h2>
            <ul className=" text-gray-300 flex flex-col gap-1 text-[11px] xs:text-[14px] font-light mt-2 ">
              <Link to="/about_us">
                <li className="hover:text-white transition-colors duration-150">About US</li>
              </Link>
              <Link to="/contact">
                <li className="hover:text-white transition-colors duration-150">Contact US</li>
              </Link>
              <Link to="/terms_conditions">
                <li className="hover:text-white transition-colors duration-150">Terms & Conditions</li>
              </Link>
              <Link to="/privacy_policy">
                <li className="hover:text-white transition-colors duration-150">Privace Policy</li>
              </Link>
              <Link to="/cancellation_return_policy">
                <li className="hover:text-white transition-colors duration-150">
                  Cancellation & Return Policy
                </li>
              </Link>
            </ul>
          </div>

          <div className=" w-max">
            <h2 className="font-medium text-[14px] xs:text-[16px] w-max py-1 border-b-1 border-[white]">
              Contact US
            </h2>
            <ul className=" text-gray-300  flex  flex-col gap-1   text-[11px] xs:text-[14px] font-light mt-2 ">
              {companyDetails.authorMobile ? (
                <a href={`tel:${companyDetails.authorMobile}`} target="_blank" className="hover:text-white flex items-center gap-2 transition-colors duration-150">
                  <i className="fa-solid fa-phone text-12 pointer hover:text-white" title="Phone"></i>
                  {companyDetails.authorMobile}
                </a>
              ) : null}

              {companyDetails.authorWhatsapp ? (
                <a href={`https://wa.me/${companyDetails.authorWhatsapp}`} target="_blank" className="hover:text-white flex items-center gap-2 transition-colors duration-150">
                  <i className="fa-brands fa-whatsapp text-12 pointer hover:text-white" title="Whatsapp"></i>
                  {companyDetails.authorWhatsapp}
                </a>
              ) : null}

              {companyDetails.authorEmail ? (
                <a href={`mailto:${companyDetails.authorEmail}`} target="_blank" className="hover:text-white flex items-center gap-2 transition-colors duration-150">
                  <i className="fa-brands fa-at text-12 pointer hover:text-white" title="Email ID"></i>
                  {companyDetails.authorEmail}
                </a>
              ) : null}

            </ul>
            <div className="flex items-center gap-3 mt-4">
              {
                companyDetails.socialUrl.instagram ? (
                  <a href={companyDetails.socialUrl.instagram} target="_blank">
                    <i
                      className="text-gray-300 text-[16px] xs:text-[20px] pointer hover:text-white fa-brands fa-instagram transition-colors duration-150"
                      title="Instagram"
                    ></i>
                  </a>

                ) : null
              }
              {
                companyDetails.socialUrl.facebook ? (
                  <a href={companyDetails.socialUrl.facebook} target="_blank">
                    <i
                      className="text-gray-300 text-[16px] xs:text-[20px] pointer hover:text-white fa-brands fa-facebook transition-colors duration-150"
                      title="Facebook"
                    ></i>
                  </a>

                ) : null
              }

              {
                companyDetails.socialUrl.linkedin ? (
                  <a href={companyDetails.socialUrl.linkedin} target="_blank">
                    <i
                      className="text-gray-300 text-[16px] xs:text-[20px] pointer hover:text-white fa-brands fa-linkedin transition-colors duration-150"
                      title="Linkedin"
                    ></i>
                  </a>

                ) : null
              }
              {
                companyDetails.socialUrl.twitter ? (
                  <a href={companyDetails.socialUrl.twitter} target="_blank">
                    <i
                      className="text-gray-300 text-[16px] xs:text-[20px] pointer hover:text-white fa-brands fa-x-twitter transition-colors duration-150"
                      title="Twitter"
                    ></i>
                  </a>

                ) : null
              }
              {
                companyDetails.socialUrl.github ? (
                  <a href={companyDetails.socialUrl.github} target="_blank">
                    <i
                      className="text-gray-300 text-[16px] xs:text-[20px] pointer hover:text-white fa-brands fa-github transition-colors duration-150"
                      title="Github"
                    ></i>
                  </a>

                ) : null
              }
              {
                companyDetails.socialUrl.portfolio ? (
                  <a href={companyDetails.socialUrl.portfolio} target="_blank">
                    <i
                      className="text-gray-300 text-[14px] xs:text-[18px] pointer hover:text-white fa-solid fa-user transition-colors duration-150"
                      title="User"
                    ></i>
                  </a>

                ) : null
              }
            </div>
          </div>
        </section>

        <p className="text-[#f2f3f3] font-light text-[10px] xs:text-[12px] w-full  text-center">
          Copyright <b>©{companyDetails.copyrightStartYear || '0000'} - {companyDetails.copyrightEndYear || '0000'}</b> All rights reserved. <b>{companyDetails.companyName || 'Company'}</b> pvt Ltd. | Website is
          made by <b>{companyDetails.authorName || 'Developer Name'}</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
