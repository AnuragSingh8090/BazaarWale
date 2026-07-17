import { useState } from "react";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import { ImSpinner8 } from "react-icons/im";
import apiService from "../../services/apiService";
import { companyDetails, faqs } from "../../constants/companyDetails";
import "./Contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [Contact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isInvalid = (field) => {
    if (!touched[field]) return false;
    if (field === "fullname") return !Contact.fullname.trim();
    if (field === "mobile") return !Contact.mobile || Contact.mobile.length < 10;
    if (field === "email") return !Contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Contact.email);
    if (field === "message") return !Contact.message.trim();
    return false;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const message = {
        name: Contact.fullname,
        email: Contact.email,
        mobile: Contact.mobile,
        message: Contact.message,
      };

      await apiService.contactUs(message);
      setLoading(false);
      sucessToast(
        `Thank You ${Contact.fullname} 👏, Your message sent Sucessfully !!`
      );
      setContact({
        fullname: "",
        mobile: "",
        email: "",
        message: "",
      });
      setTouched({});
    } catch (error) {
      setLoading(false);
      errorToast(
        error.response?.data?.message || "Failed to send message"
      );
      console.error("Contact form error:", error);
    }
  };



  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <>
      <div className="global-padding py-6 xs:py-8 md:py-10 bg-[var(--bg-body)]">
        <div className="w-full global-width">

          <div className="text-center mb-5 xs:mb-6 md:mb-8">
            <h1 className="heading">
              Contact Us
            </h1>
            <p className="sub-heading">
              We'd love to hear from you. Reach out and we'll respond as soon as we can.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg mb-8 xs:mb-10 md:mb-12">

            <div className="bg-[var(--primary)] text-white p-5 xs:p-6 md:p-8 lg:w-[50%] flex flex-col justify-between">

              <div className="flex items-center justify-center mb-4 xs:mb-5">
                <img
                  src="/contactImage.png"
                  alt="Contact us"
                  className="w-full h-full object-contain rounded-lg max-h-[160px] xs:max-h-[180px] lg:max-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4 min-[500px]:gap-5">

                <div className="space-y-3.5 xs:space-y-4">
                  {companyDetails.authorMobile && (
                    <a href={`tel:${companyDetails.authorMobile}`} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors duration-150">
                        <i className="fa-solid fa-phone text-xs xs:text-sm"></i>
                      </div>
                      <div>
                        <p className="text-white/60 text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold">Phone</p>
                        <p className="text-white text-[10px] xs:text-xs md:text-sm font-medium">{companyDetails.authorMobile}</p>
                      </div>
                    </a>
                  )}

                  {companyDetails.authorWhatsapp && (
                    <a href={`https://wa.me/${companyDetails.authorWhatsapp}`} target="_blank" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors duration-150">
                        <i className="fa-brands fa-whatsapp text-sm xs:text-base"></i>
                      </div>
                      <div>
                        <p className="text-white/60 text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold">WhatsApp</p>
                        <p className="text-white text-[10px] xs:text-xs md:text-sm font-medium">{companyDetails.authorWhatsapp}</p>
                      </div>
                    </a>
                  )}

                  {companyDetails.authorEmail && (
                    <a href={`mailto:${companyDetails.authorEmail}`} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors duration-150">
                        <i className="fa-solid fa-envelope text-xs xs:text-sm"></i>
                      </div>
                      <div>
                        <p className="text-white/60 text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold">Email</p>
                        <p className="text-white text-[9px] xs:text-[10px] md:text-sm font-medium break-all">{companyDetails.authorEmail}</p>
                      </div>
                    </a>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="fa-solid fa-location-dot text-xs xs:text-sm"></i>
                    </div>
                    <div>
                      <p className="text-white/60 text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold">Address</p>
                      <p className="text-white text-[9px] xs:text-[10px] md:text-sm font-medium leading-relaxed">{companyDetails.fullAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between min-[500px]:border-l min-[500px]:border-white/15 min-[500px]:pl-5">
                  <div className="space-y-3">
                    <h4 className="text-white/80 text-[9px] xs:text-[10px] uppercase tracking-wider font-bold mb-1">Working Hours</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[9px] xs:text-[10px] flex items-center gap-1.5">
                        <i className="fa-regular fa-clock text-[9px] xs:text-[10px]"></i> Calling
                      </span>
                      <span className="text-white text-[9px] xs:text-[10px] font-semibold bg-white/15 px-2 py-0.5 rounded-full">
                        {companyDetails.callingStartTime} - {companyDetails.callingEndTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[9px] xs:text-[10px] flex items-center gap-1.5">
                        <i className="fa-regular fa-calendar text-[9px] xs:text-[10px]"></i> Days
                      </span>
                      <span className="text-white text-[9px] xs:text-[10px] font-semibold bg-white/15 px-2 py-0.5 rounded-full">
                        {companyDetails.callingWorkingDays.length === 7
                          ? "All Days"
                          : `${companyDetails.callingWorkingDays[0]} - ${companyDetails.callingWorkingDays[companyDetails.callingWorkingDays.length - 1]}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[9px] xs:text-[10px] flex items-center gap-1.5">
                        <i className="fa-regular fa-envelope text-[9px] xs:text-[10px]"></i> Response
                      </span>
                      <span className="text-white text-[9px] xs:text-[10px] font-semibold bg-white/15 px-2 py-0.5 rounded-full">
                        24 Hours
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 min-[500px]:mt-auto pt-3.5 border-t border-white/15">
                    <p className="text-white/60 text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold mb-2">Follow Us</p>
                    <div className="flex items-center gap-2.5">
                      {companyDetails.socialUrl.facebook && (
                        <a href={companyDetails.socialUrl.facebook} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150">
                          <i className="fa-brands fa-facebook-f text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                      {companyDetails.socialUrl.instagram && (
                        <a href={companyDetails.socialUrl.instagram} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150">
                          <i className="fa-brands fa-instagram text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                      {companyDetails.socialUrl.twitter && (
                        <a href={companyDetails.socialUrl.twitter} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150">
                          <i className="fa-brands fa-x-twitter text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                      {companyDetails.socialUrl.linkedin && (
                        <a href={companyDetails.socialUrl.linkedin} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150">
                          <i className="fa-brands fa-linkedin-in text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                      {companyDetails.socialUrl.github && (
                        <a href={companyDetails.socialUrl.github} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150">
                          <i className="fa-brands fa-github text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                      {companyDetails.socialUrl.portfolio && (
                        <a href={companyDetails.socialUrl.portfolio} target="_blank"
                          className="w-7.5 h-7.5 xs:w-8 xs:h-8 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors duration-150"
                          title="Portfolio">
                          <i className="fa-solid fa-user text-[10px] xs:text-xs"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-white)] p-5 xs:p-6 md:p-8 lg:w-[50%] flex flex-col">
              <h2 className="title text-[var(--text-primary)] mb-1">
                Send us a Message
              </h2>
              <p className="sub-title text-[var(--text-muted)] mb-4 xs:mb-5 md:mb-6">
                Fill in the details below and we'll get back to you shortly.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 xs:space-y-4 flex-1 flex flex-col"
              >
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-[12px] xs:text-[15px] font-medium text-[var(--text-primary)] mb-1 xs:mb-1.5"
                    >
                      Full Name <span className="text-[var(--error)]">*</span>
                    </label>
                    <input
                      required
                      onChange={(e) =>
                        setContact({ ...Contact, fullname: e.target.value })
                      }
                      onBlur={() => handleBlur("fullname")}
                      value={Contact.fullname}
                      type="text"
                      id="fullName"
                      placeholder="Your name"
                      className={`w-full px-3 py-2 xs:py-2.5 text-[11px] xs:text-xs border placeholder:text-[var(--text-muted)] rounded-lg focus:outline-none focus:ring-1 transition-all bg-[var(--bg-light)] focus:bg-[var(--bg-white)] ${isInvalid("fullname") ? "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-default)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"}`}
                    />
                    {isInvalid("fullname") && <p className="text-[var(--error)] text-[10px] mt-0.5">Name is required</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="number"
                      className="block text-[12px] xs:text-[15px] font-medium text-[var(--text-primary)] mb-1 xs:mb-1.5"
                    >
                      Mobile <span className="text-[var(--error)]">*</span>
                    </label>
                    <div className={`flex items-center rounded-lg border transition-all bg-[var(--bg-light)] focus-within:bg-[var(--bg-white)] focus-within:ring-1 ${isInvalid("mobile") ? "border-[var(--error)] focus-within:ring-[var(--error)] focus-within:border-[var(--error)]" : "border-[var(--border-default)] focus-within:ring-[var(--primary)] focus-within:border-[var(--primary)]"}`}>
                      <span className="text-[11px] xs:text-xs text-[var(--text-primary)] font-medium pl-3 pr-1.5 border-r border-[var(--border-default)] py-2 xs:py-2.5 select-none">+91</span>
                      <input
                        required
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.length <= 10) {
                            setContact({ ...Contact, mobile: val });
                          }
                        }}
                        onBlur={() => handleBlur("mobile")}
                        value={Contact.mobile}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="number"
                        placeholder="Your number"
                        className="w-full px-2 py-2 xs:py-2.5 text-[11px] xs:text-xs focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    {isInvalid("mobile") && <p className="text-[var(--error)] text-[10px] mt-0.5">Enter a valid 10-digit number</p>}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[12px] xs:text-[15px] font-medium text-[var(--text-primary)] mb-1 xs:mb-1.5"
                  >
                    Email Address <span className="text-[var(--error)]">*</span>
                  </label>
                  <input
                    required
                    onChange={(e) =>
                      setContact({ ...Contact, email: e.target.value })
                    }
                    onBlur={() => handleBlur("email")}
                    value={Contact.email}
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    className={`w-full px-3 py-2 xs:py-2.5 text-[11px] xs:text-xs border placeholder:text-[var(--text-muted)] rounded-lg focus:outline-none focus:ring-1 transition-all bg-[var(--bg-light)] focus:bg-[var(--bg-white)] ${isInvalid("email") ? "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-default)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"}`}
                  />
                  {isInvalid("email") && <p className="text-[var(--error)] text-[10px] mt-0.5">Enter a valid email address</p>}
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    htmlFor="message"
                    className="block text-[12px] xs:text-[15px] font-medium text-[var(--text-primary)] mb-1 xs:mb-1.5"
                  >
                    Your Message <span className="text-[var(--error)]">*</span>
                  </label>
                  <textarea
                    onChange={(e) =>
                      setContact({ ...Contact, message: e.target.value })
                    }
                    value={Contact.message}
                    required
                    id="message"
                    placeholder="How can we help you?"
                    onBlur={() => handleBlur("message")}
                    className={`resize-none min-h-[80px] flex-1 w-full placeholder:text-[var(--text-muted)] px-3 py-2 xs:py-2.5 text-[11px] xs:text-xs border rounded-lg focus:outline-none focus:ring-1 transition-all bg-[var(--bg-light)] focus:bg-[var(--bg-white)] ${isInvalid("message") ? "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-default)] focus:ring-[var(--primary)] focus:border-[var(--primary)]"}`}
                  ></textarea>
                  {isInvalid("message") && <p className="text-[var(--error)] text-[10px] mt-0.5">Message is required</p>}
                </div>

                <button
                  className={`${!Contact.fullname ||
                    !Contact.email ||
                    !Contact.message ||
                    !Contact.mobile
                    ? "disabled"
                    : ""
                    } w-full bg-[var(--primary)] text-white py-2.5 xs:py-3 rounded-lg font-semibold text-[11px] xs:text-xs md:text-sm hover:brightness-110 transition duration-150 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer`}
                >
                  {loading ? (
                    <span className="flex gap-2 items-center">
                      Sending <ImSpinner8 className="animate-spin" />
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <i className="fa-solid fa-paper-plane text-xs"></i>
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="bg-[var(--bg-white)] rounded-xl shadow-lg p-5 xs:p-6 md:p-8">
            <h2 className="title mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border-b border-[var(--border-light)] pb-3 last:border-0 last:pb-0"
                >
                  <div
                    role="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center text-left font-medium text-[var(--text-primary)] text-[11px] xs:text-sm md:text-base py-2 hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0 font-bold text-[var(--primary)] text-[10px] xs:text-sm">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <span className="text-[var(--primary)] shrink-0 ml-4">
                      <i className={`fa-solid ${expandedFaq === faq.id ? "fa-chevron-up" : "fa-chevron-down"} text-xs md:text-sm`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer-container ${expandedFaq === faq.id ? "open" : ""}`}>
                    <div className="faq-answer-inner">
                      <div className="pb-3 pl-6 text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
