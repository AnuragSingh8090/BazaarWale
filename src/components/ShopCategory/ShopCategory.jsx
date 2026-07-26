import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./ShopCategory.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";

const HorizontalScrollViewer = ({ children, gap = "gap-2.5" }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftArrow(Math.round(scrollLeft) > 0);
    setShowRightArrow(Math.round(scrollLeft) < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = 0;

    const rafId = requestAnimationFrame(() => checkScroll());

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [children, checkScroll]);

  const getScrollAmount = () => {
    const el = scrollRef.current;
    if (!el) return 200;
    const firstChild = el.firstElementChild;
    if (!firstChild) return 200;

    const computedStyle = window.getComputedStyle(el);
    const gapValue = parseFloat(computedStyle.gap) || parseFloat(computedStyle.columnGap) || 10;
    const cardWidth = firstChild.getBoundingClientRect().width;
    return cardWidth + gapValue;
  };

  const handleScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = getScrollAmount();

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full select-none mt-2">
      {showLeftArrow && (
        <button
          onClick={() => handleScroll("left")}
          tabIndex={-1}
          className="absolute left-1 top-[43%] -translate-y-1/2 z-20 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-[var(--primary)] border border-gray-200 shadow-md hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none"
          aria-label="Scroll Left"
        >
          <FiChevronLeft className="text-base xs:text-lg sm:text-xl" />
        </button>
      )}

      <div
        ref={scrollRef}
        className={`py-2 px-1 flex ${gap} overflow-x-auto custom-scrollbar scroll-smooth items-center w-full pb-3`}
      >
        {children}
      </div>

      {showRightArrow && (
        <button
          onClick={() => handleScroll("right")}
          tabIndex={-1}
          className="absolute right-1 top-[43%] -translate-y-1/2 z-20 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-[var(--primary)] border border-gray-200 shadow-md hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none"
          aria-label="Scroll Right"
        >
          <FiChevronRight className="text-base xs:text-lg sm:text-xl" />
        </button>
      )}
    </div>
  );
};

const WishlistButton = ({ onClick }) => {
  const [wishlisted, setWishlisted] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      tabIndex={-1}
      className="absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-2 sm:left-2 z-10 w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200 select-none"
      aria-label="Add to wishlist"
    >
      {wishlisted ? (
        <GoHeartFill className="text-[var(--accent)] text-xs xs:text-sm sm:text-lg" />
      ) : (
        <GoHeart className="text-[var(--text-secondary)] text-xs xs:text-sm sm:text-lg" />
      )}
    </button>
  );
};

export const GrabBestDeals = ({ products }) => {
  return (
    <div className="w-full lg:mt-6 mt-4 select-none">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <p className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg md:py-2 py-1 border-b-3 font-[500] text-[var(--text-dark)] border-[var(--primary)] w-max translate-y-[2px]">
          Grab the best deals on{" "}
          <span className="text-[var(--primary)]">Smartphones</span>
        </p>

        <Link
          to="/products"
          className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-[var(--text-secondary)] flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-[var(--primary)] focus:text-[var(--primary)] focus:outline-none transition-colors duration-200"
        >
          View All <FiChevronRight className="text-[var(--primary)] text-lg" />
        </Link>
      </div>

      <HorizontalScrollViewer gap="gap-1.5 xs:gap-2 sm:gap-2.5">
        {products.map((element, index) => (
          <Link
            to={element.link}
            key={index}
            className="relative w-[95px] h-[155px] xs:w-[125px] xs:h-[190px] sm:w-[150px] sm:h-[220px] md:w-[165px] md:h-[235px] lg:w-[175px] lg:h-[245px] shrink-0 rounded-xl border-2 border-transparent hover:border-[var(--primary)] hover:scale-[1.02] focus:border-[var(--primary)] focus:scale-[1.02] focus-visible:border-[var(--primary)] focus:outline-none transition-[border-color,transform] duration-300 card-shadow overflow-hidden cursor-pointer flex flex-col items-center justify-center select-none"
          >
            <WishlistButton />
            <div className="absolute top-0 right-0 w-[22px] h-[30px] xs:w-[28px] xs:h-[38px] md:w-[36px] md:h-[46px] bg-[var(--text-orange)] flex items-center flex-col rounded-bl-lg justify-center">
              <p className="text-[var(--text-white)] text-[7px] xs:text-[9px] md:text-[11px]">
                {element.discount}
              </p>
              <p className="text-[var(--text-white)] text-[7px] xs:text-[9px] md:text-[11px]">OFF</p>
            </div>
            <div className="w-full h-[65%] bg-[#f5f5f5] flex items-center p-1.5 xs:p-2.5 sm:p-3.5 md:p-[25px] justify-center">
              <img
                src={element.image}
                alt=""
                className="w-full h-full object-contain image-shadow"
              />
            </div>
            <div className="w-full h-[35%] bg-white flex px-1 xs:px-2 py-0.5 xs:py-1 justify-between flex-col">
              <p className="text-[var(--text-primary)] text-[8.5px] xs:text-[11px] sm:text-sm font-medium line-clamp-1">
                {element.name}
              </p>
              <p className="text-[var(--text-dark)] text-[8.5px] xs:text-[11px] sm:text-sm border-b border-gray-300 py-0.5 xs:py-1 font-[500]">
                ₹{element.price}
                <span className="text-[var(--text-muted)] font-normal ml-1 xs:ml-2 line-through text-[7.5px] xs:text-[10px] sm:text-[12px]">
                  ₹{element.originalPrice}
                </span>
              </p>
              <p className="text-[var(--success)] text-[8.5px] xs:text-[11px] sm:text-sm font-normal">
                Save - ₹{element.saveAmount}
              </p>
            </div>
          </Link>
        ))}
      </HorizontalScrollViewer>
    </div>
  );
};

export const ShopFromCategories = ({ products }) => {
  return (
    <div className="w-full mt-2 lg:mt-3 select-none">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <p className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg md:py-2 py-1 border-b-3 font-[500] text-[var(--text-dark)] border-[var(--primary)] w-max translate-y-[2px]">
          Shop from <span className="text-[var(--primary)]">Top Categories</span>
        </p>

        <Link
          to="/products"
          className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-[var(--text-secondary)] flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-[var(--primary)] focus:text-[var(--primary)] focus:outline-none transition-colors duration-200"
        >
          View All <FiChevronRight className="text-[var(--primary)] text-lg" />
        </Link>
      </div>

      <HorizontalScrollViewer gap="gap-2.5 xs:gap-4 lg:gap-6 xl:gap-8">
        {products.map((element, index) => (
          <Link
            to={element.link}
            key={index}
            className="shrink-0 flex flex-col items-center gap-1 xs:gap-2 justify-center select-none group focus:outline-none"
          >
            <div className="h-[75px] w-[75px] xs:h-[105px] xs:w-[105px] sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px] border-2 border-transparent cursor-pointer group-hover:border-[var(--primary)] group-hover:scale-105 group-focus:border-[var(--primary)] group-focus:scale-105 group-focus-visible:border-[var(--primary)] transition-[border-color,transform] duration-300 bg-[#f5f5f5] flex items-center p-1.5 xs:p-3 overflow-hidden rounded-full justify-center select-none">
              <img
                src={element.image}
                alt=""
                className="w-full h-full object-contain image-shadow"
              />
            </div>
            <div className="w-full flex px-1 xs:px-2 py-0.5 xs:py-1 items-center justify-center">
              <p className="text-[var(--text-primary)] text-[8.5px] xs:text-[11px] sm:text-sm lg:text-md font-medium text-shadow-lg">
                Mobile
              </p>
            </div>
          </Link>
        ))}
      </HorizontalScrollViewer>
    </div>
  );
};

export const TopElectronicBrands = ({ products }) => {
  return (
    <div className="w-full mt-2 lg:mt-3 select-none">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <p className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg md:py-2 py-1 border-b-3 font-[500] text-[var(--text-dark)] border-[var(--primary)] w-max translate-y-[2px]">
          Top <span className="text-[var(--primary)]">Electronic Brands</span>
        </p>

        <Link
          to="/products"
          className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-[var(--text-secondary)] flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-[var(--primary)] focus:text-[var(--primary)] focus:outline-none transition-colors duration-200"
        >
          View All <FiChevronRight className="text-[var(--primary)] text-lg" />
        </Link>
      </div>

      <HorizontalScrollViewer gap="gap-1.5 xs:gap-2.5">
        {products.map((element, index) => (
          <Link
            to={element.link}
            key={index}
            className="relative h-[75px] w-[135px] xs:h-[95px] xs:w-[170px] md:h-[125px] md:w-[215px] lg:h-[145px] lg:w-[265px] shrink-0 rounded-xl border-2 border-transparent hover:border-[var(--primary)] hover:scale-[1.02] focus:border-[var(--primary)] focus:scale-[1.02] focus-visible:border-[var(--primary)] focus:outline-none transition-[border-color,transform] duration-300 overflow-hidden cursor-pointer flex items-center justify-between select-none"
            style={{ backgroundColor: element.bgcolor }}
          >
            <div className="absolute top-[-25%] right-[-25%] w-[100%] h-[100%]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 171 168"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="85.5"
                  cy="84"
                  rx="81.032"
                  ry="79.6104"
                  fill={`${element.bgdark ? element.bgdark : `#313131`}`}
                />
                <path
                  d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
                  stroke={`${element.bgdark ? element.bgdark : `#313131`}`}
                />
              </svg>
            </div>

            <div className="absolute px-1.5 py-1 xs:px-2 lg:px-3 lg:py-2 z-3 top-0 left-0 h-full w-full flex gap-1 justify-between">
              <div className="flex flex-col justify-between gap-0.5 xs:gap-1 pt-0.5 xs:pt-1">
                <div
                  className="flex items-center justify-between py-0.5 px-1.5 xs:py-1 xs:px-3 font-[500] text-[7.5px] xs:text-[10px] lg:text-[14px] lg:px-5 lg:py-1 rounded-md xs:rounded-lg text-sm w-max"
                  style={{ backgroundColor: element.bgdark, color: element.textcolor }}
                >
                  {element.name}
                </div>

                <div className="z-[3] p-0.5 xs:p-1 rounded-lg h-[45%] lg:h-[40%] max-w-[74%]">
                  <img src={element.logo} alt="" className="h-full object-contain" />
                </div>

                <p className="lg:text-[16px] font-[500] text-[8px] xs:text-[11px] md:text-[12px] text-black">
                  UP to {element.discount} OFF
                </p>
              </div>

              <div className="w-[45%] py-1 px-0 h-[90%] my-auto shrink-0 flex items-center justify-center">
                <img src={element.image} className="h-[90%] w-[90%] object-cover" alt="" />
              </div>
            </div>
          </Link>
        ))}
      </HorizontalScrollViewer>
    </div>
  );
};

export const HomeEssentials = ({ products }) => {
  return (
    <div className="w-full mt-2 lg:mt-3 select-none">
      <div className="w-full flex items-center justify-between border-b border-gray-300">
        <p className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg md:py-2 py-1 border-b-3 font-[500] text-[var(--text-dark)] border-[var(--primary)] w-max translate-y-[2px]">
          Daily <span className="text-[var(--primary)]">Home Essentials</span>
        </p>

        <Link
          to="/products"
          className="text-[10px] xs:text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-[var(--text-secondary)] flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-[var(--primary)] focus:text-[var(--primary)] focus:outline-none transition-colors duration-200"
        >
          View All <FiChevronRight className="text-[var(--primary)] text-lg" />
        </Link>
      </div>

      <HorizontalScrollViewer gap="gap-2.5 xs:gap-4 lg:gap-6 xl:gap-8">
        {products.map((element, index) => (
          <Link
            to={element.link}
            key={index}
            className="shrink-0 flex flex-col items-center gap-1 xs:gap-2 justify-center select-none group focus:outline-none"
          >
            <div className="h-[70px] w-[70px] xs:h-[90px] xs:w-[90px] sm:h-[110px] sm:w-[110px] md:h-[135px] md:w-[135px] border-2 border-transparent cursor-pointer group-hover:border-[var(--primary)] group-hover:scale-105 group-focus:border-[var(--primary)] group-focus:scale-105 group-focus-visible:border-[var(--primary)] transition-[border-color,transform] duration-300 bg-[#f5f5f5] flex items-center p-1.5 xs:p-3 overflow-hidden rounded-xl justify-center select-none">
              <img
                src={element.image}
                alt=""
                className="w-full h-full object-contain image-shadow"
              />
            </div>
            <div className="w-full flex px-1 xs:px-2 py-0.5 xs:py-1 items-center justify-center">
              <p className="text-[var(--text-primary)] text-[8.5px] xs:text-[11px] sm:text-sm lg:text-md font-medium">
                Mobile
              </p>
            </div>
          </Link>
        ))}
      </HorizontalScrollViewer>
    </div>
  );
};
