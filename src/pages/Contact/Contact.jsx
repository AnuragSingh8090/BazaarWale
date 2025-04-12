import { useState } from "react";
import { sucessToast } from "../../components/Toasters/Toasters";

const Contact = () => {
  const [Contact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(Contact);
    sucessToast(
      `Thank You ${Contact.fullname} 👏, Your message sent Sucessfully !!`
    );
    setContact({
      fullname: "",
      mobile: "",
      email: "",
      message: "",
    });
  };
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">Get In Touch</h1>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
              Have questions or feedback? We're here to help! Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <i className="fa-solid fa-phone text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
              <p className="text-gray-600 text-center text-xs">Mon-Sat: 9:00 AM - 6:00 PM</p>
              <a href="tel:+918090674352" className="text-[var(--primary)] font-medium mt-1 text-sm hover:underline">+91 8090674352</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <i className="fa-solid fa-envelope text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
              <p className="text-gray-600 text-center text-xs">We'll respond within 24 hours</p>
              <a href="mailto:support@bazaarwale.com" className="text-[var(--primary)] font-medium mt-1 text-sm hover:underline">support@bazaarwale.com</a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <i className="fa-solid fa-location-dot text-[var(--primary)] text-xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
              <p className="text-gray-600 text-center text-xs">BazaarWale Headquarters</p>
              <p className="text-[var(--primary)] font-medium mt-1 text-center text-xs">123 E-Commerce Plaza, Digital Lane, Tech City - 560001</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            <div className="relative w-full md:w-[65%] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent z-10 rounded-lg"></div>
              <img 
                src="/contactImage.png" 
                alt="Contact us" 
                className="w-full object-contain rounded-lg mx-auto max-h-[465px]"
              />
            </div>

            <div className="bg-blue-50/70 p-5 rounded-xl w-full md:w-[35%] shadow-inner">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-3 relative pb-2 before:content-[''] before:absolute before:w-16 before:h-1 before:bg-[var(--primary)] before:bottom-0 before:left-0">
                Send Message
              </h2>

              <form onSubmit={handleLogin} className="space-y-3">
                {/* Name and Mobile in single row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-gray-700 mb-1"
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
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>
                  
                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="number"
                      className="block text-xs font-medium text-gray-700 mb-1"
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
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id="number"
                      placeholder="Enter number"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-1"
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
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-700 mb-1"
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
                    className="resize-none h-24 w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <button 
                  className="w-full bg-gradient-to-r from-blue-300 to-blue-200 text-[var(--primary)] py-2 rounded-lg font-medium text-xs hover:from-blue-400 hover:to-blue-300 hover:text-white transition duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer mt-1"
                >
                  <i className="fa-solid fa-paper-plane mr-1 text-sm"></i>
                  Send Message
                </button>
              </form>

              {/* Social Media Links */}
              <div className="mt-4 pt-3 border-t border-blue-100">
                <p className="text-xs text-[var(--primary)] mb-2 text-center">Connect with us:</p>
                <div className="flex space-x-2 justify-center">
                  <a href="#" className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <i className="fa-brands fa-facebook-f text-xs"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <i className="fa-brands fa-twitter text-xs"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <i className="fa-brands fa-instagram text-xs"></i>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <i className="fa-brands fa-linkedin-in text-xs"></i>
                  </a>
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
