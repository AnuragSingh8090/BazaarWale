import "./About_Us.css";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useSelector } from "react-redux";

const About_Us = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  return (
    <div className="about-us-container py-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto text-[15px]">
      <ScrollToTop />
      <div className="hero-section flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] p-8 rounded-2xl shadow-lg">
        <div className="content-area md:w-1/2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-4 animate-fadeIn">
            About <span className="text-[#ff6b6b]">Baazaar</span>
            <span className="text-[var(--primary)]">Wale</span>
          </h1>
          <p className="text-gray-600 mb-6 text-base italic">
            Your trusted partner for all your shopping needs since 2020
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed text-[15px]">
            At BaazaarWale, we believe in providing exceptional products with
            unmatched customer service. Our journey began with a simple mission:
            to make quality products accessible to everyone at affordable
            prices.
          </p>
          <div className="stats grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
            <div className="stat p-3 sm:p-4 bg-white rounded-lg text-center shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 duration-300">
              <i className="fa-solid fa-users text-[var(--primary)] text-xl sm:text-2xl mb-1 sm:mb-2"></i>
              <p className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
                10M+
              </p>
              <p className="text-gray-600 text-[13px] sm:text-[15px]">
                Happy Customers
              </p>
            </div>
            <div className="stat p-3 sm:p-4 bg-white rounded-lg text-center shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 duration-300">
              <i className="fa-solid fa-truck-fast text-[var(--primary)] text-xl sm:text-2xl mb-1 sm:mb-2"></i>
              <p className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
                5M+
              </p>
              <p className="text-gray-600 text-[13px] sm:text-[15px]">
                Orders Delivered
              </p>
            </div>
            <div className="stat p-3 sm:p-4 bg-white rounded-lg text-center shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 duration-300 sm:col-span-2 md:col-span-1">
              <i className="fa-solid fa-store text-[var(--primary)] text-xl sm:text-2xl mb-1 sm:mb-2"></i>
              <p className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
                50+
              </p>
              <p className="text-gray-600 text-[13px] sm:text-[15px]">
                Cities Covered
              </p>
            </div>
          </div>
        </div>
        <div className="image-area md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="BaazaarWale Team"
            className="rounded-lg shadow-lg w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500 border-4 border-white"
          />
        </div>
      </div>

      {/* Our Mission */}
      <div className="mission-section bg-gradient-to-br from-white to-[#f0f9ff] p-8 rounded-xl mb-16 shadow-lg border border-[#e0f2fe]">
        <div className="section-header text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-2 relative inline-block">
            Our Mission
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6b6b] rounded-full"></span>
          </h2>
        </div>
        <div className="mission-content flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 transform hover:rotate-0.5 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Our Mission"
              className="rounded-lg shadow-md w-full h-auto object-cover border-4 border-white"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-700 mb-4 leading-relaxed text-base">
              Our mission is to revolutionize the online shopping experience by
              offering a wide range of high-quality products at competitive
              prices while ensuring exceptional customer service.
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <i className="fa-solid fa-circle-check text-[#ff6b6b] text-lg mt-1"></i>
                <span className="font-medium text-[15px]">
                  Providing authentic products from trusted brands
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <i className="fa-solid fa-circle-check text-[#ff6b6b] text-lg mt-1"></i>
                <span className="font-medium text-[15px]">
                  Ensuring timely delivery across the country
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <i className="fa-solid fa-circle-check text-[#ff6b6b] text-lg mt-1"></i>
                <span className="font-medium text-[15px]">
                  Offering hassle-free returns and exchanges
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <i className="fa-solid fa-circle-check text-[#ff6b6b] text-lg mt-1"></i>
                <span className="font-medium text-[15px]">
                  Maintaining transparent pricing with no hidden costs
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="values-section mb-16">
        <div className="section-header text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-2 relative inline-block">
            Our Core Values
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6b6b] rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base">
            The principles that guide everything we do at BaazaarWale
          </p>
        </div>
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="value-card p-6 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:border-[var(--primary)]">
            <div className="icon-container w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-4 mx-auto">
              <i className="fa-solid fa-handshake text-[var(--primary)] text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Trust</h3>
            <p className="text-gray-600 text-center text-[15px]">
              Building lasting relationships with our customers through honesty
              and transparency.
            </p>
          </div>
          <div className="value-card p-6 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:border-[var(--primary)]">
            <div className="icon-container w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-4 mx-auto">
              <i className="fa-solid fa-gem text-[var(--primary)] text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Quality</h3>
            <p className="text-gray-600 text-center text-[15px]">
              Offering only the best products that meet our stringent quality
              standards.
            </p>
          </div>
          <div className="value-card p-6 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:border-[var(--primary)]">
            <div className="icon-container w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-4 mx-auto">
              <i className="fa-solid fa-headset text-[var(--primary)] text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Service</h3>
            <p className="text-gray-600 text-center text-[15px]">
              Providing exceptional customer service at every touchpoint.
            </p>
          </div>
          <div className="value-card p-6 border border-gray-200 rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:border-[var(--primary)]">
            <div className="icon-container w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-4 mx-auto">
              <i className="fa-solid fa-leaf text-[var(--primary)] text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Sustainability
            </h3>
            <p className="text-gray-600 text-center text-[15px]">
              Committed to environmentally responsible business practices.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="team-section bg-gradient-to-br from-[#f0f9ff] to-white p-8 rounded-xl mb-16 shadow-lg">
        <div className="section-header text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-2 relative inline-block">
            Meet Our Leadership
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6b6b] rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base">
            The talented individuals behind BaazaarWale's success
          </p>
        </div>
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="team-member text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="image-container mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--primary-light)]">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="CEO"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Rajesh Kumar</h3>
            <p className="text-[#ff6b6b] mb-2 font-medium text-[15px]">
              Founder & CEO
            </p>
            <p className="text-gray-600 mb-3 text-[15px]">
              Visionary leader with 15+ years of retail experience
            </p>
            <div className="social-icons flex justify-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="team-member text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="image-container mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--primary-light)]">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="COO"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Priya Sharma</h3>
            <p className="text-[#ff6b6b] mb-2 font-medium text-[15px]">
              Chief Operations Officer
            </p>
            <p className="text-gray-600 mb-3 text-[15px]">
              Operations expert with a focus on customer satisfaction
            </p>
            <div className="social-icons flex justify-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="team-member text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="image-container mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--primary-light)]">
              <img
                src="https://randomuser.me/api/portraits/men/67.jpg"
                alt="CTO"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Vikram Singh</h3>
            <p className="text-[#ff6b6b] mb-2 font-medium text-[15px]">
              Chief Technology Officer
            </p>
            <p className="text-gray-600 mb-3 text-[15px]">
              Tech innovator driving our digital transformation
            </p>
            <div className="social-icons flex justify-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {
       !isLoggedIn &&
      <div className="cta-section bg-gradient-to-r from-[var(--primary)] to-[#4a9eff] text-white p-8 md:p-12 rounded-xl text-center shadow-lg transform hover:scale-[1.005] transition-transform duration-300">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Join the BaazaarWale Family
        </h2>
        <p className="text-base mb-6 max-w-2xl mx-auto">
          Experience the best online shopping with us. From electronics to
          fashion, we've got everything you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-white text-[var(--primary)] py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-300 text-[15px]"
          >
            Create an Account
          </a>
          <a
            href="/contact"
            className="bg-transparent border-2 border-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-[var(--primary)] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-300 text-[15px]"
          >
            Contact Us
          </a>
        </div>
      </div>
      }
    </div>
  );
};

export default About_Us;
