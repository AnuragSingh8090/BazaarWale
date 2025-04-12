import React, { useState } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./Privacy_Policy.css";

const Privacy_Policy = () => {
  const [expandedSections, setExpandedSections] = useState({
    1: true, 2: true, 3: true, 4: true, 5: true,
    6: true, 7: true, 8: true, 9: true, 10: true
  });

  const toggleSection = (sectionNumber) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionNumber]: !prev[sectionNumber],
    }));
  };

  return (
    <div className="max-w-[1000px] mx-auto my-10 px-5 font-['IBM_Plex_Sans'] text-[#333]">
      <ScrollToTop />
      <div className="text-center mb-6 pb-3 border-b border-[var(--border-light)]">
        <h1 className="text-[var(--primary)] text-2xl md:text-3xl mb-1">Privacy Policy</h1>
      </div>

      <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(1)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              1. Introduction
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[1] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[1] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                At BazaarWale, we respect your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or make a purchase.
              </p>
              <p className="mb-4 leading-relaxed text-sm">
                Please read this Privacy Policy carefully. If you do not agree with
                the terms of this Privacy Policy, please do not access our website
                or use our services.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(2)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              2. Information We Collect
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[2] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[2] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                We collect several types of information from and about users of our
                website, including:
              </p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Personal Information:</strong> This includes your name,
                  email address, postal address, phone number, and payment
                  information.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Account Information:</strong> Details such as your
                  username, password, purchase history, and items in your wishlist.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Transaction Information:</strong> Data about purchases and
                  other transactions made through our website, including credit card
                  details.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Technical Information:</strong> IP addresses, browser
                  types, device types, ISP, referring/exit pages, operating system,
                  date/time stamps, and clickstream data.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">User Content:</strong> Reviews, ratings, feedback,
                  testimonials, and other content you provide on our platform.
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(3)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              3. How We Collect Information
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[3] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[3] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">We collect information in the following ways:</p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Direct Interactions:</strong> When you create an account,
                  make a purchase, subscribe to newsletters, participate in surveys,
                  or communicate with us.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Automated Technologies:</strong> As you navigate through
                  our website, we may use cookies, web beacons, and other tracking
                  technologies to collect data about your equipment, browsing
                  actions, and patterns.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Third Parties:</strong> We may receive information about
                  you from third parties such as business partners, subcontractors,
                  advertising networks, analytics providers, and search information
                  providers.
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(4)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              4. How We Use Your Information
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[4] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[4] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">We use the information we collect about you to:</p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">Process and fulfill your orders</li>
                <li className="leading-relaxed">Manage your account and provide customer support</li>
                <li className="leading-relaxed">Communicate with you about products, services, and promotions</li>
                <li className="leading-relaxed">Improve our website, products, and services</li>
                <li className="leading-relaxed">Personalize your shopping experience</li>
                <li className="leading-relaxed">Protect against fraud and unauthorized transactions</li>
                <li className="leading-relaxed">Comply with legal obligations</li>
                <li className="leading-relaxed">
                  Analyze usage patterns to enhance user experience and website
                  functionality
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(5)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              5. Disclosure of Your Information
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[5] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[5] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">We may disclose your personal information to:</p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Service Providers:</strong> Third parties who perform
                  services on our behalf, such as payment processing, shipping,
                  customer service, and marketing.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Business Partners:</strong> Companies we collaborate with
                  to offer joint promotions or products.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Legal Authorities:</strong> When required by law or if we
                  believe disclosure is necessary to protect our rights, property,
                  or safety.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Business Transfers:</strong> In connection with a merger,
                  acquisition, or sale of all or a portion of our business.
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-sm">
                We do not sell your personal information to third parties for their
                marketing purposes without your consent.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(6)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              6. Data Security
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[6] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[6] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                We implement appropriate security measures to protect your personal
                information from accidental loss, unauthorized access, use,
                alteration, or disclosure. These measures include encryption,
                firewalls, and secure server protocols.
              </p>
              <p className="mb-4 leading-relaxed text-sm">
                However, no method of transmission over the Internet or electronic
                storage is 100% secure. While we strive to use commercially
                acceptable means to protect your personal information, we cannot
                guarantee its absolute security.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(7)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              7. Your Rights
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[7] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[7] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">Depending on your location, you may have certain rights regarding your personal information, including the right to:</p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">Access your personal information</li>
                <li className="leading-relaxed">Correct inaccurate or incomplete information</li>
                <li className="leading-relaxed">Request deletion of your personal information</li>
                <li className="leading-relaxed">Withdraw consent where processing is based on consent</li>
                <li className="leading-relaxed">Object to processing of your personal information</li>
                <li className="leading-relaxed">Request restriction of processing your personal information</li>
                <li className="leading-relaxed">Request transfer of your personal information</li>
              </ul>
              <p className="mb-4 leading-relaxed text-sm">
                To exercise any of these rights, please contact us at
                privacy@bazaarwale.com.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(8)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              8. Cookies Policy
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[8] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[8] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                Our website uses cookies to enhance your experience. Cookies are
                small text files that are stored on your computer when you visit
                websites. We use both session cookies (which expire once you close
                your web browser) and persistent cookies (which stay on your device
                until you delete them).
              </p>
              <p className="mb-4 leading-relaxed text-sm">Types of cookies we use:</p>
              <ul className="mb-4 pl-5 space-y-2.5 text-sm">
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Essential Cookies:</strong> Required for the website to
                  function properly.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Analytical/Performance Cookies:</strong> Allow us to
                  recognize and count visitors and analyze website usage.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Functionality Cookies:</strong> Remember your preferences
                  and choices.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-gray-800">Targeting Cookies:</strong> Record your visit to our
                  website, pages visited, and links followed to deliver relevant
                  advertisements.
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-sm">
                You can set your browser to refuse all or some browser cookies, or
                to alert you when websites set or access cookies. If you disable or
                refuse cookies, some parts of our website may become inaccessible or
                not function properly.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(9)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              9. Children's Privacy
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[9] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[9] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                Our website is not intended for children under 13 years of age. We
                do not knowingly collect personal information from children under 13.
                If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us, and we will delete
                such information from our systems.
              </p>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(10)}
          >
            <h2 className="text-[var(--primary)] text-sm font-medium mb-3 pb-1 border-b border-[var(--primary-light)] flex-grow">
              10. Changes to Our Privacy Policy
            </h2>
            <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
              <i className={`fa-solid ${expandedSections[10] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </span>
          </div>
          {expandedSections[10] && (
            <div className="animate-fadeIn">
              <p className="mb-4 leading-relaxed text-sm">
                We may update our Privacy Policy from time to time. Any changes will
                be posted on this page with a revised "Last Updated" date. We
                encourage you to review this Privacy Policy periodically to stay
                informed about how we are protecting your information.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Privacy_Policy; 