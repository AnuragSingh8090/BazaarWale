import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { companyDetails } from "../../constants/companyDetails";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { errorToast, sucessToast } from "../Toasters/Toasters";
import apiService from "../../services/apiService";
import { ImSpinner8 } from "react-icons/im";

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false)
  const navigate = useNavigate();

  const navbarReference = useRef(null);

  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const getFormattedName = (name) => {
    if (!name) return "User";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[1]}`;
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true)
      const response = await apiService.logoutUser()
      console.log(response)
      setLogoutPopup(false);
      setUserDropdown(false);
      dispatch(logoutUser())
      navigate("/");
      setLogoutLoading(false)
      sucessToast(response.message || "Logged out successfully")
    }
    catch (error) {
      console.log(error)
      errorToast(error?.response?.data?.message || "Failed to logout")
      setLogoutLoading(false)
    }

  };

  const showAccountMenu = () => setUserDropdown(true);
  const hideAccountMenu = () => setUserDropdown(false);

  const openNavbar = () => {
    setIsMobileMenuOpen(true);
    if (navbarReference.current) {
      navbarReference.current.classList.remove("navbarInactive");
      navbarReference.current.classList.add("navbarActive");
    }
  };

  const closeNavbar = () => {
    setIsMobileMenuOpen(false);
    if (window.innerWidth < 768 && navbarReference.current) {
      navbarReference.current.classList.remove("navbarActive");
      navbarReference.current.classList.add("navbarInactive");
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 768 && navbarReference.current) {
      setIsMobileMenuOpen(false);
      navbarReference.current.classList.remove("navbarInactive");
      navbarReference.current.classList.remove("navbarActive");
    }
  };


  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user_container")) {
        hideAccountMenu();
      }
      if (
        !event.target.closest(".bars_container") &&
        !event.target.closest(".navbar-container") &&
        navbarReference.current?.classList.contains("navbarActive")
      ) {
        closeNavbar();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);

    };
  }, []);


  return (
    <nav className="global-padding navbar sticky top-0 left-0 z-50 bg-[var(--bg-white)] border-b border-[var(--border-default)] w-full py-1.5 xs:py-2">
      <div className="global-width w-full flex flex-col gap-1.5 xs:gap-2">
        <div className="w-full flex items-center gap-2 xs:gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 xs:gap-2.5 shrink-0">
            <div
              className="bars_container flex items-center justify-center text-base xs:text-lg sm:text-xl text-[var(--primary)] active:scale-[0.95] cursor-pointer md:hidden hover:scale-105 transition-transform p-1 xs:p-1.5"
              onClick={openNavbar}
              aria-label="Open Navigation Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </div>

            <NavLink to="/" className="flex items-center gap-1.5 xs:gap-2 group">
              <div className="navLogo w-6 h-6 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0">
                <img
                  src={companyDetails.companyLogo || "/brand-logo.png"}
                  alt={companyDetails.companyName || "BazaarWale"}
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className="text-xs xs:text-base sm:text-lg md:text-xl shrink-0 font-bold tracking-tight"
                style={{
                  fontFamily: "var(--custom-font)",
                  background: "linear-gradient(to right, var(--primary), #d26c1e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {companyDetails.companyName || "BazaarWale"}
              </span>
            </NavLink>
          </div>

          <div className="search-wrapper relative hidden md:flex items-center w-full max-w-[350px] lg:max-w-[400px] shrink-0 z-[60]">
            <SearchDropdown />
          </div>

          <div className="flex items-center gap-2 xs:gap-3.5 shrink-0 ml-auto">
            <div className="cart_container relative active:scale-[0.95] text-sm xs:text-base cursor-pointer text-[var(--text-dark)] transition-transform duration-300 hover:scale-[1.05] shrink-0">
              <NavLink to="/cart" className="flex items-center gap-1 xs:gap-1.5">
                <div className="relative">
                  <i
                    className="fa-solid text-[var(--primary)] text-xs xs:text-sm fa-cart-shopping"
                    title="Cart"
                  ></i>
                  <span className="absolute -top-1.5 -right-2 select-none flex items-center justify-center bg-[#d63909] text-white text-[9px] xs:text-[10px] font-bold rounded-full h-3.5 w-3.5 xs:h-4 xs:min-w-[16px] px-1 transition-transform duration-300 hover:scale-110">
                    {user?.cart?.length || "0"}
                  </span>
                </div>
                <span className="text-[11px] xs:text-xs md:text-sm font-semibold hidden xs:inline">Cart</span>
              </NavLink>
            </div>

            <div className="userSection shrink-0 flex justify-center items-center">
              {isLoggedIn ? (
                <div className="user_container relative">
                  <button
                    type="button"
                    onClick={() => (userDropdown ? hideAccountMenu() : showAccountMenu())}
                    className="flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-2 py-1 rounded-full bg-[var(--primary-lighter)] border border-[var(--primary-medium)] hover:bg-[var(--primary-light)] transition-all cursor-pointer select-none"
                  >
                    <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-[var(--primary)] text-white font-bold text-[10px] xs:text-xs flex items-center justify-center shadow-xs shrink-0">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span className="text-[11px] xs:text-xs md:text-sm font-semibold text-[var(--text-dark)] select-none">
                      <span className="hidden min-[450px]:inline min-[600px]:hidden">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                      <span className="hidden min-[600px]:inline truncate max-w-[120px]">
                        {getFormattedName(user?.name)}
                      </span>
                    </span>

                    <i className={`fa-solid fa-chevron-down text-[9px] xs:text-[10px] text-[var(--primary)] transition-transform duration-200 ${userDropdown ? "rotate-180" : ""}`}></i>
                  </button>

                  {userDropdown && (
                    <div className="drop_container absolute right-0 top-full mt-2 w-44 xs:w-52 sm:w-56 bg-[var(--bg-white)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[var(--border-default)] p-1 z-55 overflow-hidden">
                      <div className="px-2 xs:px-3 py-1.5 xs:py-2.5 rounded-lg border-b border-[var(--border-light)] bg-[var(--primary-lighter)] flex items-center gap-2 xs:gap-2.5 mb-1">
                        <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-[var(--primary)] text-white font-bold text-[10px] xs:text-xs flex items-center justify-center shadow-xs shrink-0">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-[var(--text-dark)] truncate line-clamp-1" title={user?.name || "Unknown"}>
                            {user?.name || "Unknown"}
                          </p>
                          <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-[var(--primary)] font-medium truncate line-clamp-1 mt-0.5" title={user?.email || "Unknown"}>
                            {user?.email || "Unknown"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <NavLink
                          to="/account"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2 xs:gap-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg text-[11px] xs:text-xs font-medium transition-all ${isActive
                              ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                              : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-user-gear text-[var(--primary)] text-xs xs:text-sm w-3.5 xs:w-4 shrink-0"></i>
                          <span>My Account</span>
                        </NavLink>

                        <NavLink
                          to="/orders"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2 xs:gap-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg text-[11px] xs:text-xs font-medium transition-all ${isActive
                              ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                              : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-box-archive text-[var(--primary)] text-xs xs:text-sm w-3.5 xs:w-4 shrink-0"></i>
                          <span>My Orders</span>
                        </NavLink>

                        <NavLink
                          to="/wishlist"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2 xs:gap-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg text-[11px] xs:text-xs font-medium transition-all ${isActive
                              ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                              : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-heart text-[var(--primary)] text-xs xs:text-sm w-3.5 xs:w-4 shrink-0"></i>
                          <span>My Wishlist</span>
                        </NavLink>
                      </div>

                      <div className="border-t border-[var(--border-light)] pt-1 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            hideAccountMenu();
                            setLogoutPopup(true);
                          }}
                          className="w-full flex items-center gap-2 xs:gap-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-lg text-[11px] xs:text-xs font-semibold text-[var(--error)] hover:bg-[var(--accent-light)] transition-colors cursor-pointer"
                        >
                          <i className="fa-solid fa-right-from-bracket text-xs xs:text-sm w-3.5 xs:w-4 shrink-0"></i>
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center gap-1.5 px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg bg-[var(--primary)] text-white text-[10px] xs:text-xs md:text-sm font-semibold hover:brightness-110 transition duration-150 shadow-xs cursor-pointer"
                >
                  <i className="fa-solid fa-right-to-bracket text-[9px] xs:text-[10px] md:text-xs"></i>
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>

        <div className="search-wrapper relative flex md:hidden items-center w-full mt-0.5">
          <SearchDropdown />
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
            onClick={closeNavbar}
          ></div>
        )}

        <ul
          ref={navbarReference}
          className="hidden navbar-container fixed top-0 left-0 z-50 h-screen max-h-screen overflow-y-auto w-[75%] max-w-[270px] flex-col items-start navItems p-3 xs:p-4 text-[13px] xs:text-sm font-[500] text-[var(--text-primary)] bg-[var(--bg-white)] shadow-2xl select-none gap-0.5 xs:gap-1 border-r border-[var(--border-default)] md:flex md:flex-wrap md:static md:w-full md:max-w-none md:h-max md:max-h-none md:shadow-none md:bg-transparent md:border-none md:p-0 md:gap-[8px] md:flex-row md:transform-none md:opacity-100"
        >
          <div className="flex items-center justify-between w-full pb-2.5 border-b border-[var(--border-light)] md:hidden mb-1">
            <div className="flex items-center gap-2">
              <img
                src={companyDetails.companyLogo || "/brand-logo.png"}
                alt="Logo"
                className="w-6 h-6 xs:w-7 xs:h-7 object-contain"
              />
              <span
                className="text-xs xs:text-sm font-bold"
                style={{
                  fontFamily: "var(--custom-font)",
                  background: "linear-gradient(to right, var(--primary), #d26c1e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {companyDetails.companyName || "BazaarWale"}
              </span>
            </div>
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-[var(--bg-light)] hover:bg-[var(--border-default)] flex items-center justify-center text-[var(--text-dark)] text-xs focus:outline-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
              onClick={closeNavbar}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <NavLink
            onClick={closeNavbar}
            to="/"
            end
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-house text-xs"></i>
              Home
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/electronics"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-mobile-screen-button text-xs"></i>
              Electronics
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/clothing"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-shirt text-xs"></i>
              Clothing
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/kids"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-children text-xs"></i>
              Kids
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/beauty"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-spa text-xs"></i>
              Beauty
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/home_appliences"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-plug text-xs"></i>
              Home Appliances
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/kitchen"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-kitchen-set text-xs"></i>
              Kitchen
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/personal_care"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-soap text-xs"></i>
              Personal Care
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/about_us"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-building text-xs"></i>
              About Us
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/contact"
            className="py-1 xs:py-1.5 px-2.5 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-headset text-xs"></i>
              Support
            </li>
          </NavLink>
        </ul>
      </div>

      {logoutPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all duration-300">
          <div className="bg-[var(--bg-white)] p-6 xs:p-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[var(--border-default)] max-w-sm w-full text-center space-y-5 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--error)] flex items-center justify-center mx-auto text-xl shadow-inner">
              <i className="fa-solid fa-triangle-exclamation animate-pulse"></i>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base xs:text-lg font-bold text-[var(--text-dark)] tracking-tight">Confirm Logout</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-[1.1]">
                Are you sure you want to log out of your account? You will need to log back in to access your orders and profile.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                disabled={logoutLoading}
                onClick={() => setLogoutPopup(false)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] font-semibold text-xs hover:bg-[var(--border-light)] active:scale-98 transition-all cursor-pointer ${logoutLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <i className="fa-solid fa-xmark text-[11px]"></i>
                Cancel
              </button>
              <button
                type="button"
                disabled={logoutLoading}
                onClick={handleLogout}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[var(--error)] text-white font-semibold text-xs hover:brightness-110 active:scale-98 transition-all shadow-md hover:shadow-lg cursor-pointer ${logoutLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {logoutLoading ? (
                  <span className="flex items-center gap-1.5">
                    Logging out... <ImSpinner8 className="animate-spin text-xs" />
                  </span>
                ) : (
                  <>
                    <i className="fa-solid fa-right-from-bracket text-[11px]"></i>
                    Log Out
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
