import React, { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./Terms_Conditions.css";

const Terms_Conditions = () => {
  const [expandedSections, setExpandedSections] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
  });
  const [activeSection, setActiveSection] = useState(1);
  const [showTOC, setShowTOC] = useState(false);

  const toggleSection = (sectionNumber) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionNumber]: !prev[sectionNumber],
    }));
  };

  // Handle scroll to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find the current section in view
      for (let i = 10; i >= 1; i--) {
        const section = document.getElementById(`section-${i}`);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }

      // Show/hide TOC based on scroll position
      if (scrollPosition > 300) {
        setShowTOC(true);
      } else {
        setShowTOC(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionNumber) => {
    const section = document.getElementById(`section-${sectionNumber}`);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });

      // Ensure section is expanded when scrolled to
      if (!expandedSections[sectionNumber]) {
        setExpandedSections((prev) => ({
          ...prev,
          [sectionNumber]: true,
        }));
      }
    }
  };

  const sections = [
    { id: 1, title: "Introduction" },
    { id: 2, title: "Definitions" },
    { id: 3, title: "Account Registration" },
    { id: 4, title: "Products and Services" },
    { id: 5, title: "Pricing and Payment" },
    { id: 6, title: "Shipping and Delivery" },
    { id: 7, title: "Intellectual Property" },
    { id: 8, title: "User Conduct" },
    { id: 9, title: "Limitation of Liability" },
    { id: 10, title: "Changes to Terms" },
  ];

  return (
    <div className="max-w-[1000px] mx-auto my-10 px-5 font-['IBM_Plex_Sans'] text-[#333] relative">
      <ScrollToTop />
      <div className="text-center mb-6 pb-3 border-b border-[var(--border-light)]">
        <h1 className="text-[var(--primary)] text-2xl md:text-3xl mb-1">
          Terms and Conditions
        </h1>
      </div>

      {/* Table of Contents - Mobile Dropdown */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowTOC(!showTOC)}
          className="w-full flex items-center justify-between bg-[var(--primary-light)] text-[var(--primary)] font-medium py-3 px-4 rounded-lg"
        >
          <span className="text-sm">Table of Contents</span>
          <i
            className={`fa-solid ${
              showTOC ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </button>

        {showTOC && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-md border border-[var(--border-light)]">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left py-2 px-3 rounded-md text-xs hover:bg-gray-100 transition-colors ${
                      activeSection === section.id
                        ? "bg-[var(--primary-light)] text-[var(--primary)] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {section.id}. {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop - Layout with TOC sidebar and content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* TOC Sidebar - Desktop */}
        <div className="hidden md:block md:w-1/4 h-fit sticky top-30">
          <div className="bg-white rounded-lg p-4 shadow-md border border-[var(--border-light)]">
            <h3 className="text-xs font-medium text-[var(--primary)] mb-3 pb-1 border-b border-[var(--primary-light)]">
              Contents
            </h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left py-2 px-3 rounded-md text-xs hover:bg-gray-100 transition-colors ${
                      activeSection === section.id
                        ? "bg-[var(--primary-light)] text-[var(--primary)] font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {section.id}. {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 bg-white rounded-lg p-6 md:p-8 shadow-md">
          <section id="section-1" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(1)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                1. Introduction
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[1] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[1] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  Welcome to BazaarWale. These Terms and Conditions govern your
                  use of our website and services. By accessing or using our
                  platform, you agree to be bound by these Terms. Please read
                  them carefully.
                </p>
              </div>
            )}
          </section>

          <section id="section-2" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(2)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                2. Definitions
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[2] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[2] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-sm">
                  <strong className="text-gray-800">"Website"</strong> refers to
                  BazaarWale, accessible from www.bazaarwale.com
                  <br />
                  <strong className="text-gray-800">
                    "We", "Us", "Our"
                  </strong>{" "}
                  refers to BazaarWale
                  <br />
                  <strong className="text-gray-800">
                    "User", "You", "Your"
                  </strong>{" "}
                  refers to the individual accessing or using our Website
                  <br />
                  <strong className="text-gray-800">"Goods"</strong> refers to
                  the items available for purchase on our Website
                </p>
              </div>
            )}
          </section>

          <section id="section-3" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(3)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                3. Account Registration
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[3] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[3] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  To access certain features of our Website, you may be required
                  to register for an account. You agree to provide accurate,
                  current, and complete information during the registration
                  process and to update such information to keep it accurate,
                  current, and complete.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  You are responsible for safeguarding the password that you use
                  to access our Website and for any activities or actions under
                  your password. We encourage you to use a strong password (a
                  combination of upper and lower case letters, numbers, and
                  symbols) for your account.
                </p>
              </div>
            )}
          </section>

          <section id="section-4" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(4)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                4. Products and Services
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[4] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[4] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  All products and services displayed on our Website are subject
                  to availability. We reserve the right to discontinue any
                  product or service at any time.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  The images of the products on our Website are for illustrative
                  purposes only. The actual product may vary slightly from the
                  image displayed.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  We have made every effort to display as accurately as possible
                  the colors of our products. However, we cannot guarantee that
                  your computer's display of the colors will be accurate.
                </p>
              </div>
            )}
          </section>

          <section id="section-5" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(5)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                5. Pricing and Payment
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[5] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[5] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  All prices are displayed in Indian Rupees (INR) and are
                  inclusive of applicable taxes unless stated otherwise.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  We reserve the right to change the prices of our products at
                  any time without prior notice.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  Payment can be made through various methods as displayed on
                  our Website. We use secure payment processing services to
                  ensure the safety of your transaction.
                </p>
              </div>
            )}
          </section>

          <section id="section-6" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(6)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                6. Shipping and Delivery
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[6] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[6] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  We aim to deliver all products within the timeframe specified
                  at the time of purchase. However, delivery times may vary
                  based on your location and the availability of the product.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  We are not responsible for any delays caused by customs,
                  postal services, or other third-party shipping providers.
                </p>
              </div>
            )}
          </section>

          <section id="section-7" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(7)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                7. Intellectual Property
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[7] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[7] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  All content on our Website, including text, graphics, logos,
                  images, and software, is the property of BazaarWale and is
                  protected by copyright, trademark, and other intellectual
                  property laws.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  You may not use, reproduce, distribute, or create derivative
                  works from our content without our explicit written
                  permission.
                </p>
              </div>
            )}
          </section>

          <section id="section-8" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(8)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                8. User Conduct
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[8] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[8] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  You agree not to use our Website for any unlawful purpose or
                  in any way that could damage, disable, overburden, or impair
                  our services.
                </p>
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  You also agree not to access or attempt to access any
                  information or data on our Website through any automated
                  means, including the use of scripts, bots, or web crawlers.
                </p>
              </div>
            )}
          </section>

          <section id="section-9" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(9)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                9. Limitation of Liability
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[9] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[9] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  In no event shall BazaarWale be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including loss of profits, data, or use, arising out of or in
                  connection with these Terms or the use or inability to use our
                  Website or services.
                </p>
              </div>
            )}
          </section>

          <section id="section-10" className="mb-6 scroll-mt-24">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(10)}
            >
              <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
                10. Changes to Terms
              </h2>
              <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                <i
                  className={`fa-solid ${
                    expandedSections[10] ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </span>
            </div>
            {expandedSections[10] && (
              <div className="animate-fadeIn">
                <p className="mb-4 leading-relaxed text-justify text-sm">
                  We reserve the right to modify these Terms at any time. Any
                  changes will be effective immediately upon posting the revised
                  Terms on our Website. Your continued use of our Website after
                  any changes indicates your acceptance of the new Terms.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms_Conditions;
