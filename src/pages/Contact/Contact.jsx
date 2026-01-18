import { useState } from "react";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";
import { ImSpinner8 } from "react-icons/im";
import apiService from "../../services/apiService";
import { useSelector } from "react-redux";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Contact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    message: "",
  });
  const contactDetails = useSelector(state => state.contact)

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

      const response = await apiService.contactUs(message)
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
    } catch (error) {
      setLoading(false);
      errorToast(
        error.response?.data?.message || "Failed to send message"
      );
      console.error("Contact form error:", error);
    }
  };
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">
              Get In Touch
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
              Have questions or feedback? We're here to help! Fill out the form
              below and our team will get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-3">
                <i className="fa-solid fa-phone text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
              <p className="text-gray-600 text-center text-xs">
                Mon-Sat: 9:00 AM - 6:00 PM
              </p>
              {
                contactDetails.mobileNumber &&  (
              <a
                href={"tel:+91"+ contactDetails.mobileNumber}
                className="text-[var(--primary)] font-medium mt-1 text-sm hover:underline"
              >
                +91 {contactDetails.mobileNumber}
              </a>
                ) 
              }

            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-3">
                <i className="fa-solid fa-envelope text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
              <p className="text-gray-600 text-center text-xs">
                We'll respond within 24 hours
              </p>
{contactDetails?.emailId && (
  <a
    href={`mailto:${contactDetails.emailId}`}
    className="text-[var(--primary)] font-medium mt-1 text-sm hover:underline"
  >
    {contactDetails.emailId}
  </a>
)}

            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] flex items-center justify-center mb-3">
                <i className="fa-solid fa-location-dot text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
              <p className="text-gray-600 text-center text-xs">
                {contactDetails.brandName}
              </p>
              <p className="text-[var(--primary)] font-medium mt-1 text-center text-xs">
                {`${contactDetails.address.houseNo}, ${contactDetails.address.street}, ${contactDetails.address.city}, ${contactDetails.address.state} - ${contactDetails.address.pincode}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:items-stretch bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            <div className="relative w-full lg:w-[60%] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent z-10 rounded-lg"></div>
              <img
                src="/contactImage.png"
                alt="Contact us"
                className="w-full object-contain rounded-lg mx-auto max-h-[465px]"
              />
            </div>

            <div className="bg-[var(--primary-lighter)]/70 p-5 rounded-xl w-full lg:w-[40%] shadow-inner">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3 relative pb-2 before:content-[''] before:absolute before:w-16 before:h-1 before:bg-[var(--primary)] before:bottom-0 before:left-0">
                Send Message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 flex flex-col gap-2"
              >
                <div className="flex gap-3">
                  {/* Name */}
                  <div className="w-full">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-gray-700 mb-2"
                    >
                      <i className="fa-solid fa-user text-[var(--primary)] mr-1 text-sm"></i>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      onChange={(e) =>
                        setContact({ ...Contact, fullname: e.target.value })
                      }
                      value={Contact.fullname}
                      type="text"
                      id="fullName"
                      placeholder="Enter name"
                      className="w-full px-3 py-2 text-xs border placeholder:text-[#a3a3a3] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="w-full">
                    <label
                      htmlFor="number"
                      className="block text-xs font-medium text-gray-700 mb-2"
                    >
                      <i className="fa-solid fa-phone text-[var(--primary)] mr-1 text-sm"></i>
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      onChange={(e) =>
                        setContact({ ...Contact, mobile: e.target.value })
                      }
                      value={Contact.mobile}
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id="number"
                      placeholder="Enter number"
                      className="w-full px-3 py-2 text-xs border placeholder:text-[#a3a3a3] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-2"
                  >
                    <i className="fa-solid fa-envelope text-[var(--primary)] mr-1 text-sm"></i>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    onChange={(e) =>
                      setContact({ ...Contact, email: e.target.value })
                    }
                    value={Contact.email}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs border placeholder:text-[#a3a3a3] border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-700 mb-2"
                  >
                    <i className="fa-solid fa-message text-[var(--primary)] mr-1 text-sm"></i>
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    onChange={(e) =>
                      setContact({ ...Contact, message: e.target.value })
                    }
                    value={Contact.message}
                    required
                    id="message"
                    placeholder="How can we help you?"
                    className="resize-none h-24 w-full placeholder:text-[#a3a3a3] px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <button
                  className={`${
                    !Contact.fullname ||
                    !Contact.email ||
                    !Contact.message ||
                    !Contact.mobile
                      ? "disabled-light"
                      : ""
                  } w-full bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 rounded-lg font-medium text-xs hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer mt-1`}
                >
                  {loading ? (
                    <span className="flex gap-2 items-center ">
                      Sending <ImSpinner8 className="animate-spin" />
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center text-center">
                      <i className="fa-solid fa-paper-plane mr-1 text-sm"></i>
                      Send Message
                    </span>
                  )}
                </button>
              </form>

              {/* Social Media Links */}
              <div className="mt-4 pt-3 border-t border-[var(--primary-light)]">
                <p className="text-xs text-[var(--primary)] mb-2 text-center">
                  Connect with us:
                </p>
                <div className="flex space-x-2 justify-center">
                  {
                    contactDetails.socialUrl.facebook && 
                  <a target="_blank"
                    href={contactDetails.socialUrl.facebook}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    <i className="fa-brands fa-facebook-f text-xs"></i>
                  </a>
                  }
                  {
                    contactDetails.socialUrl.twitter && 
                  <a target="_blank"
                    href={contactDetails.socialUrl.twitter}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    <i className="fa-brands fa-twitter text-xs"></i>
                  </a>
                  }
                  {
                    contactDetails.socialUrl.instagram && 
                  <a target="_blank"
                    href={contactDetails.socialUrl.instagram}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    <i className="fa-brands fa-instagram text-xs"></i>
                  </a>
                  }
                  {
                    contactDetails.socialUrl.linkedin && 
                  <a target="_blank"
                    href={contactDetails.socialUrl.linkedin}
                    className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
                  >
                    <i className="fa-brands fa-linkedin-in text-xs"></i>
                  </a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
