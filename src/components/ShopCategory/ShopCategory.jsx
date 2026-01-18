import React from "react";
import { Link } from "react-router-dom";
import "./ShopCategory.css";
import { FiChevronRight } from "react-icons/fi";

export const GrabBestDeals = ({ products }) => {
  return (
    <>
      <div className="w-full lg:mt-6 mt-4">
        <div className=" w-full  flex items-center justify-between border-b border-gray-300 ">
          <p className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg   md:py-2 py-1 border-b-3 font-[500] text-gray-600 border-[var(--primary)] w-max translate-y-[2px]">
            Grab the best deals on{" "}
            <span className=" text-[var(--primary)]">Smartphones</span>
          </p>

          <Link
            to="/products"
            className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-gray-600 flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-shadow-2xl hover:text-grey-800"
          >
            View All <FiChevronRight className="text-[var(--primary)] text-lg" />
          </Link>
        </div>

        <div className="mt-2 py-2 px-2 lg:py-4 flex gap-2.5 overflow-x-auto scrollbar-hide scroll-smooth items-center w-full">
          {products.map((element, index) => (
            <Link
              to={element.link}
              key={index}
              className="relative w-[130px]  h-[200px] sm:w-[170px]  sm:h-[240px] md:w-[180px]  md:h-[250px]  lg:w-[190px]  lg:h-[260px] shrink-0 rounded-xl border-2 border-[#f5f5f5] hover:border-[var(--primary)] hover:scale-102 transition-all duration-300 card-shadow overflow-hidden cursor-pointer  flex flex-col items-center justify-center"
            >
              <div className="absolute top-0 right-0 w-[30px] h-[40px] md:w-[40px] md:h-[50px]  bg-[var(--primary)] flex items-center flex-col rounded-bl-lg  justify-center">
                <p className="text-white text-[10px] md:text-[12px] ">
                  {element.discount}
                </p>
                <p className="text-white text-[10px] md:text-[12px] ">OFF</p>
              </div>
              <div className="w-full h-[67%] bg-[#f5f5f5] flex items-center p-3  lg:p-5 justify-center ">
                <img
                  src={element.image}
                  alt=""
                  className="w-full  h-full object-contain image-shadow"
                />
              </div>
              <div className="w-full h-[33%] bg-[white] flex px-2 py-1 justify-between flex-col">
                <p className="text-gray-600 text-[11px] sm:text-sm font-medium line-clamp-1">
                  {element.name}
                </p>
                <p className="text-gray-600 text-[11px] sm:text-sm  border-b border-gray-300 py-1 font-[500]">
                  ₹{element.price}
                  <span className="text-gray-400 font-normal ml-2 line-through">
                    ₹{element.originalPrice}
                  </span>
                </p>
                <p className="text-green-500 text-[11px] sm:text-sm font-normal">
                  Save - ₹{element.saveAmount}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const ShopFromCategories = ({ products }) => {
  return (
    <>
      <div className="w-full mt-2 lg:mt-3">
        <div className=" w-full  flex items-center justify-between border-b border-gray-300 ">
          <p className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg   md:py-2 py-1 border-b-3 font-[500] text-gray-600 border-[var(--primary)] w-max translate-y-[2px]">
            Shop from <span className=" text-[var(--primary)]">Top Categories</span>
          </p>

          <Link
            to="/products"
            className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-gray-600 flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-shadow-2xl hover:text-grey-800"
          >
            View All <FiChevronRight className="text-[var(--primary)] text-lg" />
          </Link>
        </div>

        <div className="mt-2 py-2 px-2 lg:py-4 flex lg:gap-6 xl:gap-8 gap-4 overflow-x-auto scrollbar-hide scroll-smooth items-center w-full">
          {products.map((element, index) => (
            <Link
              to={element.link}
              key={index}
              className=" shrink-0   flex flex-col items-center gap-2 justify-center"
            >
              <div className=" h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] border-2 border-[transparent] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-[var(--primary)]  bg-[#f5f5f5] flex items-center p-3 overflow-hidden rounded-full justify-center ">
                <img
                  src={element.image}
                  alt=""
                  className="w-full  h-full object-contain image-shadow"
                />
              </div>
              <div className="w-full flex px-2 py-1 items-center justify-center">
                <p className="text-gray-600 text-[11px] sm:text-sm lg:text-md font-medium text-shadow-lg">
                  Mobile
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const TopElectronicBrands = ({ products }) => {
  return (
    <>
      <div className="w-full mt-2 lg:mt-3">
        <div className=" w-full  flex items-center justify-between border-b border-gray-300 ">
          <p className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg   md:py-2 py-1 border-b-3 font-[500] text-gray-600 border-[var(--primary)] w-max translate-y-[2px]">
            Top <span className=" text-[var(--primary)]">Electronic Brands</span>
          </p>

          <Link
            to="/products"
            className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-gray-600 flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-shadow-2xl hover:text-grey-800"
          >
            View All <FiChevronRight className="text-[var(--primary)] text-lg" />
          </Link>
        </div>

        <div className="mt-2 py-2 px-2 lg:py-4 flex gap-2.5 overflow-x-auto scrollbar-hide scroll-smooth items-center w-full">
          {products.map((element, index) => (
            <Link
              to={element.link}
              key={index}
              className={`relative  h-[100px] w-[180px]  md:h-[130px] md:w-[220px] lg:h-[150px] lg:w-[270px]  shrink-0 rounded-xl   overflow-hidden cursor-pointer  flex  items-center justify-between`}
              style={{'backgroundColor': element.bgcolor}}
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
                    fill={`${element.bgdark? element.bgdark : `#313131`}`}
                  />
                  <path
                    d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
                    stroke={`${element.bgdark? element.bgdark : `#313131`}`}
                  />
                </svg>
              </div>

              <div className="absolute px-2 py-1 lg:px-3 lg:py-2 z-3 top-0 left-0 h-full w-full flex gap-1  justify-between ">
                <div className="flex flex-col justify-between gap-1 pt-1 ">
                  <div className={`flex items-center justify-between py-1 px-3 font-[500] text-[10px] lg:text-[14px] lg:px-5 lg:py-1 rounded-lg  text-sm  w-max`} style={{'backgroundColor': element.bgdark, 'color': element.textcolor}}>
                    {element.name}
                  </div>


                  <div className="z-[3] p-1 rounded-lg h-[45%] lg:h-[40%] max-w-[74%] ">
                    <img src={element.logo} alt="" className="h-full  object-contain"/>
                  </div>


                  <p className={` lg:text-[16px] font-[500] text-[12px] text-black`}>UP to {element.discount} OFF</p>
                </div>

                <div className=" w-[45%] py-1 px-0 h-[90%]  my-auto shrink-0 flex items-center justify-center">
                  <img src={element.image} className="h-[90%] w-[90%] object-cover" alt="" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const HomeEssentials = ({ products }) => {
  return (
    <>
      <div className="w-full mt-2 lg:mt-3">
        <div className=" w-full  flex items-center justify-between border-b border-gray-300 ">
          <p className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg   md:py-2 py-1 border-b-3 font-[500] text-gray-600 border-[var(--primary)] w-max translate-y-[2px]">
            Daily <span className=" text-[var(--primary)]">Home Essentials</span>
          </p>

          <Link
            to="/products"
            className="text-[12px] sm:text-sm lg:text-md 2xl:text-lg text-gray-600 flex items-center translate-y-[2px] gap-1 cursor-pointer hover:text-shadow-2xl hover:text-grey-800"
          >
            View All <FiChevronRight className="text-[var(--primary)] text-lg" />
          </Link>
        </div>

        <div className="mt-2 py-2 px-2 lg:py-4 flex lg:gap-6 xl:gap-8 gap-4 overflow-x-auto scrollbar-hide scroll-smooth items-center w-full">
          {products.map((element, index) => (
            <Link
              to={element.link}
              key={index}
              className=" shrink-0   flex flex-col items-center gap-2 justify-center"
            >
              <div className=" h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] border-2 border-[transparent] cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-[var(--primary)]  bg-[#f5f5f5] flex items-center p-3 overflow-hidden rounded-xl justify-center ">
                <img
                  src={element.image}
                  alt=""
                  className="w-full  h-full object-contain image-shadow"
                />
              </div>
              <div className="w-full flex px-2 py-1 items-center justify-center">
                <p className="text-gray-600 text-[11px] sm:text-sm lg:text-md font-medium">
                  Mobile
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
