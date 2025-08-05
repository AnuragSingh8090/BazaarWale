import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { sucessToast } from "../Toasters/Toasters";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const userName = useSelector((state) => state.user.user.name);
  const cartItems = useSelector((state) => state.user.user.cart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedin);

  const navigate = useNavigate();
  const navbarReffrence = useRef(null);

  const dispatch = useDispatch();
  const handleSearch = () => {
    console.log(searchText);
  };

  const handleLogout = () => {
    setLoginPopup(false);
    setShowDrop(false);
    dispatch(logoutUser());
    sucessToast("Logout Successfull!!");
    navigate("/login");
  };
  const showAccountMenu = () => {
    setShowDrop(true);
  };
  const hideAccountMenu = () => {
    setShowDrop(false);
  };

  const openNavbar = () => {
    navbarReffrence.current.classList.remove("navbarInactive");
    navbarReffrence.current.classList.add("navbarActive");
  };
  const closeNavbar = () => {
    if (window.innerWidth < 767) {
      navbarReffrence.current.classList.remove("navbarActive");
      navbarReffrence.current.classList.add("navbarInactive");
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 767) {
      navbarReffrence.current.classList.remove("navbarInactive");
      navbarReffrence.current.classList.remove("navbarActive");
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
        navbarReffrence.current.classList.contains("navbarActive")
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
    <nav className="navbar sticky z-99 top-0 left-0 flex flex-col items-center justify-between gap-[10px] px-[15px] py-[0px] bg-[white] shadow-md md:px-[20px]">
      <div className="w-full flex items-center mt-[5px] justify-between gap-[20px] relative">
        <div className="logoContainer centerFlex gap-[10px] absolute top-0 left-0 md:static">
          <div
            className="bars_container items-center justify-center text-[25px] text-[var(--primary)] active:scale-[0.95] cursor-pointer md:hidden"
            onClick={openNavbar}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <NavLink to="/" className="centerFlex gap-[10px]">
            <div className="navLogo w-[43px] flex-shrink-0">
              <img src="/brand-logo.png" alt="Logo" />
            </div>
            <span
              className="text-[22px] shrink-0"
              style={{
                fontFamily: "var(--custom-font)",
                background: "linear-gradient(to right, #008ecc, #d26c1e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BazaarWale
            </span>
          </NavLink>
        </div>

        <div className="w-full flex flex-wrap-reverse items-center justify-end gap-[20px] my-[7px] md:flex-nowrap">
          <div className="w-full flex items-center gap-[20px]">
            <div className="inputContainer flex items-center justify-center search_container w-full text-[13px] rounded-lg px-3 py-2 bg-[var(--primary-light)] gap-[7px] transition-all duration-300">
              <i
                className="fa-solid fa-magnifying-glass active:scale-[0.95] text-[var(--primary)] cursor-pointer transition-transform duration-200 hover:rotate-[15deg]"
                onClick={handleSearch}
              ></i>
              <input
                type="text"
                placeholder="Search eg. iphone 15, laptop, etc."
                className="w-full transition-all duration-300 placeholder:text-[#9f9f9f]"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
              />
            </div>

            <div className="cart_container relative active:scale-[0.95] text-[20px] cursor-pointer text-[#333232] transition-transform duration-300 hover:scale-[1.05]">
              <NavLink to="/cart">
                <div className="centerFlex gap-2">
                  <div className="relative">
                    <i
                      className="fa-solid text-[var(--primary)] text-[16px] fa-cart-shopping"
                      title="Cart"
                    ></i>
                    <span className="absolute top-0 right-[-30%] select-none centerFlex bg-[#d63909] text-white text-[11px] centerFlex rounded-[50%] h-[14px] w-[14px] transition-transform duration-300 hover:scale-110">
                      {cartItems.length || "0"}
                    </span>
                  </div>
                  <span className="text-[15px]">Cart</span>
                </div>
              </NavLink>
            </div>
          </div>

          <div className="userSection shrink-0 flex justify-center items-center gap-[30px]">
            {/* <div className="theme_container active:scale-[0.95] text-[20px] cursor-pointer text-[#333232]">
            <i className="fa-solid fa-moon" title="Dark Mode"></i>
          </div> */}

            {isLoggedIn ? (
              <div
                className="user_container relative text-[17px] text-[#333232]"
                onClick={() =>
                  showDrop ? hideAccountMenu() : showAccountMenu()
                }
              >
                <div className="centerFlex gap-2 cursor-pointer select-none transition-all duration-300 hover:text-[var(--primary)]">
                  <i
                    className="fa-solid fa-user text-[15px] text-[var(--primary)] active:scale-[0.95] cursor-pointer transition-transform duration-300 hover:scale-[1.15]"
                    title="Account"
                  ></i>
                  <span className="text-[16px]">
                    {userName.split(" ").slice(0, 2).join(" ") || "User Name"}
                  </span>
                </div>
                {showDrop && isLoggedIn ? (
                  <div className="drop_container z-50 absolute top-[40px] right-[-2px] bg-white py-[6px] px-[4px] rounded-[6px] boxShadow-light">
                    <div className="flex w-max gap-[5px] flex-col items-start shrink-0 text-[15px] text-[#333232]">
                      <NavLink
                        to="/account"
                        className="px-[10px] py-[3px] w-full rounded hover:bg-[var(--primary-light)] transition-colors duration-300 hover:shadow-sm"
                      >
                        <span
                          className="active:scale-[0.95] select-none cursor-pointer"
                          onClick={hideAccountMenu}
                        >
                          <i className="fa-solid fa-user mr-[6px]"></i> My
                          Account
                        </span>
                      </NavLink>

                      <NavLink
                        to="/orders"
                        className="px-[10px] py-[3px] w-full rounded hover:bg-[var(--primary-light)] transition-colors duration-300 hover:shadow-sm"
                      >
                        <span
                          className="active:scale-[0.95] select-none cursor-pointer"
                          onClick={hideAccountMenu}
                        >
                          <i className="fa-solid fa-box mr-[6px]"></i> My Orders
                        </span>
                      </NavLink>

                      <NavLink
                        to="/wishlist"
                        className="px-[10px] py-[3px] w-full rounded hover:bg-[var(--primary-light)] transition-colors duration-300 hover:shadow-sm"
                      >
                        <span
                          className="active:scale-[0.95] select-none cursor-pointer"
                          onClick={hideAccountMenu}
                        >
                          <i className="fa-solid fa-heart mr-[6px]"></i> My
                          Wishlist
                        </span>
                      </NavLink>

                      <span
                        className="active:scale-[0.95] w-full select-none cursor-pointer text-[#ce0303] px-[10px] py-[3px] rounded hover:bg-[#fbe2e2] transition-colors duration-300 hover:shadow-sm"
                        onClick={() => setLoginPopup(true)}
                      >
                        <i className="fa-solid fa-right-from-bracket mr-[5px]"></i>{" "}
                        Log Out
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <NavLink to="/login">
                <span
                  className="active:scale-[0.95] select-none cursor-pointer text-[#1c1c1c] transition-all duration-300 hover:text-[var(--primary)]"
                  onClick={hideAccountMenu}
                >
                  <i className="fa-solid fa-right-to-bracket mr-[5px] text-[var(--primary)] transition-transform duration-300 hover:translate-x-[-2px]"></i>{" "}
                  Login
                </span>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <ul
        className="hidden navbar-container fixed top-0 left-0 z-40 h-screen w-[50%] flex-col items-start navItems px-[10px] py-[10px] text-[14px] font-[500] text-[#4f4f4f] bg-[white] shadow-2xl select-none gap-[10px] border-t-[1px] border-[var(--border-light)] md:flex md:flex-wrap md:static md:w-full md:flex-row md:h-max md:shadow-none md:bg-none"
        ref={navbarReffrence}
      >
        <div
          className="navBar absolute top-[10px] text-[19px] right-[7px] bg-[#f3f3f3] h-[30px] w-[30px] rounded-[50%] flex items-center justify-center text-[black] active:scale-[0.90] md:hidden transition-transform duration-300 hover:rotate-[90deg] hover:bg-[#e0e0e0]"
          onClick={closeNavbar}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="logoContainer flex items-center justify-center gap-[10px] mb-[20px] md:hidden">
          <NavLink to="/" className="centerFlex gap-[5px]">
            <div className="navLogo w-[36px] flex-shrink-0">
              <img src="/brand-logo.png" alt="Logo" />
            </div>
            <span
              className="text-[18px]"
              style={{
                fontFamily: "var(--custom-font)",
                background: "linear-gradient(to right, #008ecc, #d26c1e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BazaarWale
            </span>
          </NavLink>
        </div>

        <NavLink
          onClick={closeNavbar}
          to="/"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-house ulIcons"></i>
            Home
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/electronics"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-mobile-screen-button ulIcons"></i>
            Electronics
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/clothing"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-shirt ulIcons"></i>
            Clothing
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/kids"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-children ulIcons"></i>
            Kids
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/beauty"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-spa ulIcons"></i>
            Beauty
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/home_appliences"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-plug ulIcons"></i>
            Home Appliences
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/kitchen"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-kitchen-set ulIcons"></i>
            Kitchen
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/personal_care"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-soap ulIcons"></i>
            Personal Care
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/about_us"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-building ulIcons"></i>
            About Us
          </li>
        </NavLink>

        <NavLink
          onClick={closeNavbar}
          to="/contact"
          className="py-[3px] px-[10px] w-full shrink-0 hover:text-[var(--primary)] hover:rounded-lg hover:bg-[var(--primary-light)] md:w-auto transition-all duration-300 hover:shadow-sm"
        >
          <li className="flex items-center gap-[7px]">
            <i className="fa-solid fa-headset ulIcons"></i>
            Support
          </li>
        </NavLink>
      </ul>

      {loginPopup ? (
        <div className="logoutPopup z-[9999] fixed top-[0] left-[0] h-screen w-screen flex items-center justify-center bg-[#00000093]">
          <div className="bg-white p-[10px] px-[20px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] boxShadow-light transform transition-transform duration-300 hover:scale-[1.01]">
            <h2 className="text-center text-[18px]">Do you want to log out?</h2>
            <div className="flex items-center justify-center gap-[20px] w-full">
              <button
                onClick={handleLogout}
                className="bg-red-600 py-[5px] px-[25px] cursor-pointer active:scale-[0.95] border-none rounded-[7px] text-white transition-all duration-300 hover:bg-red-700 hover:shadow-md"
              >
                Yes
              </button>
              <button
                onClick={() => setLoginPopup(false)}
                className="bg-green-600 py-[5px] px-[25px] cursor-pointer active:scale-[0.95] border-none rounded-[7px] text-white transition-all duration-300 hover:bg-green-700 hover:shadow-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
