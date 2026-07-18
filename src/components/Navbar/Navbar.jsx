import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner8 } from "react-icons/im";
import { logoutUser } from "../../store/slices/userSlice";
import { companyDetails, searchProductsData } from "../../constants/companyDetails";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userName = useSelector((state) => state.user.user?.name);
  const cartItems = useSelector((state) => state.user.user?.cart || []);
  const isLoggedIn = useSelector((state) => state.user.isLoggedin);
  const contactDetails = useSelector((state) => state.contact);

  const navigate = useNavigate();
  const navbarReference = useRef(null);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchText.trim()) {
      setShowSearchDrop(false);
      navigate("/products");
    }
  };

  const clearSearch = (e) => {
    e.stopPropagation();
    setSearchText("");
    setShowSearchDrop(false);
  };

  const handleLogout = () => {
    setLoginPopup(false);
    setShowDrop(false);
    dispatch(logoutUser());
    navigate("/");
  };

  const showAccountMenu = () => {
    setShowDrop(true);
  };

  const hideAccountMenu = () => {
    setShowDrop(false);
  };

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
    if (searchText) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user_container")) {
        hideAccountMenu();
      }
      if (!event.target.closest(".search-wrapper")) {
        setShowSearchDrop(false);
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

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  const getFormattedName = (name) => {
    if (!name) return "User";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} ${parts[1]}`;
    return `${parts[0]} ${parts[1]}`;
  };

  const filteredProducts = searchProductsData.filter((prod) =>
    prod.name.toLowerCase().includes(searchText.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <nav className="global-padding navbar sticky top-0 left-0 z-50 bg-[var(--bg-white)] border-b border-[var(--border-default)] w-full py-1.5 xs:py-2">
      <div className="global-width w-full flex flex-col gap-1.5 xs:gap-2">
        <div className="w-full flex items-center justify-between gap-2 xs:gap-3 md:gap-6">
          <div className="flex items-center gap-1.5 xs:gap-2.5 shrink-0">
            <div
              className="bars_container items-center justify-center text-sm xs:text-base text-[var(--primary)] active:scale-[0.95] cursor-pointer md:hidden hover:scale-105 transition-transform p-0.5"
              onClick={openNavbar}
              aria-label="Open Navigation Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </div>

            <NavLink to="/" className="flex items-center gap-1.5 xs:gap-2 group">
              <div className="navLogo w-6 h-6 xs:w-7 xs:h-7 md:w-8 md:h-8 flex-shrink-0">
                <img
                  src={companyDetails.companyLogo || "/brand-logo.png"}
                  alt={contactDetails.brandName || "BazaarWale"}
                  className="w-full h-full object-contain"
                />
              </div>
              {(contactDetails.brandName || companyDetails.companyName) && (
                <span
                  className="text-xs xs:text-sm md:text-base shrink-0 font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--custom-font)",
                    background: "linear-gradient(to right, var(--primary), #d26c1e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {contactDetails.brandName || companyDetails.companyName}
                </span>
              )}
            </NavLink>
          </div>

          <div className="search-wrapper relative hidden md:flex items-center w-full max-w-[260px] lg:max-w-[320px] xl:max-w-[360px] shrink-0">
            <div className="inputContainer flex items-center justify-center search_container w-full text-xs rounded-lg px-3 py-1.5 bg-[var(--primary-light)] gap-2 transition-colors duration-200 relative focus-within:bg-[var(--bg-white)] focus-within:ring-1 focus-within:ring-[var(--primary)] border border-transparent focus-within:border-[var(--primary)]">
              <i
                className="fa-solid fa-magnifying-glass active:scale-[0.95] text-[var(--primary)] cursor-pointer shrink-0 text-xs"
                onClick={handleSearch}
              ></i>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-[var(--text-dark)] focus:outline-none placeholder:text-[var(--text-muted)] text-xs"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                onFocus={() => setShowSearchDrop(true)}
                onClick={() => setShowSearchDrop(true)}
                onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
              />
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                {searchText ? (
                  <i
                    className="fa-solid fa-xmark text-[var(--text-muted)] hover:text-[var(--text-dark)] cursor-pointer text-xs transition-colors"
                    onClick={clearSearch}
                    title="Clear search"
                  ></i>
                ) : null}
              </div>
            </div>

            {showSearchDrop && (
              <div className="drop_container absolute top-full left-0 right-0 w-full mt-2 bg-white border border-[var(--border-default)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] z-50 overflow-hidden max-h-[320px] flex flex-col">
                <div className="sticky top-0 z-10 px-2.5 xs:px-3.5 py-2 xs:py-2.5 bg-white border-b border-[var(--border-light)] flex items-center justify-between shadow-xs shrink-0">
                  <span className="text-[10px] xs:text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fa-solid fa-fire text-[var(--accent)] text-[10px] xs:text-xs"></i>
                    {searchText.trim() ? "Search Results" : "Featured Products"}
                  </span>
                  <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
                    {searchLoading ? "Searching..." : `${filteredProducts.length} items`}
                  </span>
                </div>

                <div className="search-dropdown-scroll scroll-smooth flex-1 divide-y divide-[var(--border-light)] max-h-[260px]">
                  {searchLoading ? (
                    <div className="p-5 xs:p-6 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2">
                      <ImSpinner8 className="animate-spin text-[var(--primary)] text-sm xs:text-base" />
                      <span className="text-[11px] xs:text-xs">Searching products...</span>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setShowSearchDrop(false);
                          navigate(prod.link || "/products");
                        }}
                        className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 hover:bg-[var(--primary-lighter)] transition-colors cursor-pointer group"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-8 h-8 xs:w-10 xs:h-10 object-contain rounded-md bg-[var(--bg-light)] p-1 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)] group-hover:text-[var(--primary)] truncate transition-colors">
                            {prod.name}
                          </p>
                          <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
                            {prod.category}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] xs:text-xs font-bold text-[var(--primary)]">{prod.price}</p>
                          {prod.discount && (
                            <span className="text-[8px] xs:text-[9px] font-semibold text-[var(--success)] bg-green-50 px-1 xs:px-1.5 py-0.5 rounded">
                              {prod.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 xs:p-6 text-center space-y-1">
                      <i className="fa-solid fa-magnifying-glass-minus text-lg xs:text-xl text-[var(--text-muted)] mb-1 block"></i>
                      <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)]">No products found</p>
                      <p className="text-[10px] xs:text-[11px] text-[var(--text-muted)]">Try searching for "iPhone", "MacBook", etc.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 xs:gap-3.5 shrink-0">
            <div className="cart_container relative active:scale-[0.95] text-sm xs:text-base cursor-pointer text-[var(--text-dark)] transition-transform duration-300 hover:scale-[1.05] shrink-0">
              <NavLink to="/cart" className="flex items-center gap-1 xs:gap-1.5">
                <div className="relative">
                  <i
                    className="fa-solid text-[var(--primary)] text-xs xs:text-sm fa-cart-shopping"
                    title="Cart"
                  ></i>
                  <span className="absolute -top-1.5 -right-2 select-none flex items-center justify-center bg-[#d63909] text-white text-[9px] xs:text-[10px] font-bold rounded-full h-3.5 w-3.5 xs:h-4 xs:min-w-[16px] px-1 transition-transform duration-300 hover:scale-110">
                    {cartItems.length || "0"}
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
                    onClick={() => (showDrop ? hideAccountMenu() : showAccountMenu())}
                    className="flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-2 py-1 rounded-full bg-[var(--primary-lighter)] border border-[var(--primary-medium)] hover:bg-[var(--primary-light)] transition-all cursor-pointer select-none"
                  >
                    <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-[var(--primary)] text-white font-bold text-[10px] xs:text-xs flex items-center justify-center shadow-xs shrink-0">
                      {userInitial}
                    </div>

                    <span className="text-[11px] xs:text-xs md:text-sm font-semibold text-[var(--text-dark)] select-none">
                      <span className="hidden min-[450px]:inline min-[600px]:hidden">
                        {userName ? userName.charAt(0).toUpperCase() : "U"}
                      </span>
                      <span className="hidden min-[600px]:inline truncate max-w-[120px]">
                        {getFormattedName(userName)}
                      </span>
                    </span>

                    <i className={`fa-solid fa-chevron-down text-[9px] xs:text-[10px] text-[var(--primary)] transition-transform duration-200 ${showDrop ? "rotate-180" : ""}`}></i>
                  </button>

                  {showDrop && (
                    <div className="drop_container absolute right-0 top-full mt-2 w-52 xs:w-56 bg-[var(--bg-white)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[var(--border-default)] p-1 z-50 overflow-hidden">
                      <div className="px-3 py-2.5 rounded-lg border-b border-[var(--border-light)] bg-[var(--primary-lighter)] flex items-center gap-2.5 mb-1">
                        <div className="w-7 h-7 rounded-full bg-[var(--primary)] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                          {userInitial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[var(--text-dark)] truncate">{userName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span className="text-[10px] text-[var(--primary)] font-semibold truncate">Active Account</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <NavLink
                          to="/account"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                                : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-user-gear text-[var(--primary)] text-sm w-4 shrink-0"></i>
                          <span>My Account</span>
                        </NavLink>

                        <NavLink
                          to="/orders"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                                : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-box-archive text-[var(--primary)] text-sm w-4 shrink-0"></i>
                          <span>My Orders</span>
                        </NavLink>

                        <NavLink
                          to="/wishlist"
                          onClick={hideAccountMenu}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? "bg-[var(--primary-light)] text-[var(--primary)] font-semibold"
                                : "text-[var(--text-dark)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]"
                            }`
                          }
                        >
                          <i className="fa-solid fa-heart text-[var(--accent)] text-sm w-4 shrink-0"></i>
                          <span>My Wishlist</span>
                        </NavLink>
                      </div>

                      <div className="border-t border-[var(--border-light)] pt-1 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            hideAccountMenu();
                            setLoginPopup(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[var(--error)] hover:bg-[var(--accent-light)] transition-colors cursor-pointer"
                        >
                          <i className="fa-solid fa-right-from-bracket text-sm w-4 shrink-0"></i>
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
          <div className="inputContainer flex items-center justify-center search_container w-full text-xs rounded-lg px-2.5 xs:px-3 py-1.5 bg-[var(--primary-light)] gap-2 transition-colors duration-200 relative focus-within:bg-[var(--bg-white)] focus-within:ring-1 focus-within:ring-[var(--primary)] border border-transparent focus-within:border-[var(--primary)]">
            <i
              className="fa-solid fa-magnifying-glass active:scale-[0.95] text-[var(--primary)] cursor-pointer text-xs shrink-0"
              onClick={handleSearch}
            ></i>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-[var(--text-dark)] focus:outline-none placeholder:text-[var(--text-muted)] text-[11px] xs:text-xs"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onFocus={() => setShowSearchDrop(true)}
              onClick={() => setShowSearchDrop(true)}
              onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
            />
            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
              {searchText ? (
                <i
                  className="fa-solid fa-xmark text-[var(--text-muted)] hover:text-[var(--text-dark)] cursor-pointer text-xs transition-colors"
                  onClick={clearSearch}
                  title="Clear search"
                ></i>
              ) : null}
            </div>
          </div>

          {showSearchDrop && (
            <div className="drop_container absolute top-full left-0 right-0 w-full mt-2 bg-white border border-[var(--border-default)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] z-50 overflow-hidden max-h-[300px] flex flex-col">
              <div className="sticky top-0 z-10 px-2.5 xs:px-3.5 py-2 xs:py-2.5 bg-white border-b border-[var(--border-light)] flex items-center justify-between shadow-xs shrink-0">
                <span className="text-[10px] xs:text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-fire text-[var(--accent)] text-[10px] xs:text-xs"></i>
                  {searchText.trim() ? "Search Results" : "Featured Products"}
                </span>
                <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
                  {searchLoading ? "Searching..." : `${filteredProducts.length} items`}
                </span>
              </div>

              <div className="search-dropdown-scroll scroll-smooth flex-1 divide-y divide-[var(--border-light)] max-h-[240px]">
                {searchLoading ? (
                  <div className="p-5 xs:p-6 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2">
                    <ImSpinner8 className="animate-spin text-[var(--primary)] text-sm xs:text-base" />
                    <span className="text-[11px] xs:text-xs">Searching products...</span>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setShowSearchDrop(false);
                        navigate(prod.link || "/products");
                      }}
                      className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 hover:bg-[var(--primary-lighter)] transition-colors cursor-pointer group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-8 h-8 xs:w-10 xs:h-10 object-contain rounded-md bg-[var(--bg-light)] p-1 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)] group-hover:text-[var(--primary)] truncate transition-colors">
                          {prod.name}
                        </p>
                        <span className="text-[9px] xs:text-[10px] text-[var(--text-secondary)] font-medium">
                          {prod.category}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] xs:text-xs font-bold text-[var(--primary)]">{prod.price}</p>
                        {prod.discount && (
                          <span className="text-[8px] xs:text-[9px] font-semibold text-[var(--success)] bg-green-50 px-1 xs:px-1.5 py-0.5 rounded">
                            {prod.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5 xs:p-6 text-center space-y-1">
                    <i className="fa-solid fa-magnifying-glass-minus text-lg xs:text-xl text-[var(--text-muted)] mb-1 block"></i>
                    <p className="text-[11px] xs:text-xs font-semibold text-[var(--text-dark)]">No products found</p>
                    <p className="text-[10px] xs:text-[11px] text-[var(--text-muted)]">Try searching for "iPhone", "MacBook", etc.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
            onClick={closeNavbar}
          ></div>
        )}

        <ul
          ref={navbarReference}
          className="hidden navbar-container fixed top-0 left-0 z-50 h-screen max-h-screen overflow-y-auto w-[75%] max-w-[270px] flex-col items-start navItems p-3 xs:p-4 text-xs xs:text-sm font-[500] text-[var(--text-primary)] bg-[var(--bg-white)] shadow-2xl select-none gap-1 xs:gap-1.5 border-r border-[var(--border-default)] md:flex md:flex-wrap md:static md:w-full md:h-max md:max-h-none md:shadow-none md:bg-transparent md:border-none md:p-0 md:gap-[10px] md:flex-row"
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
                {contactDetails.brandName || companyDetails.companyName}
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
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-house text-xs"></i>
              Home
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/electronics"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-mobile-screen-button text-xs"></i>
              Electronics
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/clothing"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-shirt text-xs"></i>
              Clothing
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/kids"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-children text-xs"></i>
              Kids
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/beauty"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-spa text-xs"></i>
              Beauty
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/home_appliences"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-plug text-xs"></i>
              Home Appliances
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/kitchen"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-kitchen-set text-xs"></i>
              Kitchen
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/personal_care"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-soap text-xs"></i>
              Personal Care
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/about_us"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-building text-xs"></i>
              About Us
            </li>
          </NavLink>

          <NavLink
            onClick={closeNavbar}
            to="/contact"
            className="py-1.5 xs:py-2 px-3 w-full shrink-0 rounded-lg hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] md:w-auto transition-all duration-300"
          >
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-headset text-xs"></i>
              Support
            </li>
          </NavLink>
        </ul>
      </div>

      {loginPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[var(--bg-white)] p-5 xs:p-6 rounded-2xl shadow-2xl border border-[var(--border-default)] max-w-sm w-full text-center space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[var(--accent-light)] text-[var(--error)] flex items-center justify-center mx-auto text-lg xs:text-xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <h3 className="text-sm xs:text-base font-bold text-[var(--text-dark)]">Confirm Logout</h3>
              <p className="text-[11px] xs:text-xs text-[var(--text-secondary)] mt-1">Are you sure you want to log out of your account?</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLoginPopup(false)}
                className="flex-1 py-2 px-3.5 rounded-lg bg-[var(--bg-light)] border border-[var(--border-default)] text-[var(--text-dark)] font-semibold text-xs hover:bg-[var(--border-light)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-2 px-3.5 rounded-lg bg-[var(--error)] text-white font-semibold text-xs hover:brightness-110 transition-colors shadow-xs cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
