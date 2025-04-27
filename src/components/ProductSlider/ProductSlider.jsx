import React from "react";
import "./ProductSlider.css";
import { Link } from "react-router-dom";

const ProductSlider = ({ title, subtitle, discount, image, link }) => {
  return (
    
    <Link to={link}  className="swiperCard select-none bg-[#212844] rounded-2xl p-3 w-full overflow-hidden relative h-[130px] md:h-[180px] ">
      <div className="absolute top-0 left-0 w-full h-full ">
        <div className="absolute top-[-90%] right-[10%] w-[35%] h-[140%] float-animation-1">
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
              fill="#2c3454"
            />
            <path
              d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
              stroke="#374164"
            />
          </svg>
        </div>

        <div className="absolute bottom-[-20%] right-[-4%] w-[22%] h-[75%] float-animation-2">
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
              fill="#2c3454"
            />
            <path
              d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
              stroke="#374164"
            />
          </svg>
        </div>

        <div className="absolute top-[-20%] left-[-10%] w-[30%] h-[110%] float-animation-3">
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
              fill="#2c3454"
            />
            <path
              d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
              stroke="#374164"
            />
          </svg>
        </div>

        <div className="absolute bottom-[-20%] left-[20%] w-[18%] h-[65%] float-animation-4">
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
              fill="#2c3454"
            />
            <path
              d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
              stroke="#374164"
            />
          </svg>
        </div>

        <div className="absolute top-[-20%] left-[40%] w-[12%] h-[45%] float-animation-5">
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
              fill="#2c3454"
            />
            <path
              d="M170.5 84C170.5 130.107 132.453 167.5 85.5 167.5C38.5474 167.5 0.5 130.107 0.5 84C0.5 37.8925 38.5474 0.5 85.5 0.5C132.453 0.5 170.5 37.8925 170.5 84Z"
              stroke="#374164"
            />
          </svg>
        </div>
      </div>

      <div className="text-white z-[2] absolute top-[50%] translate-y-[-50%] left-[5%] flex items-start flex-col gap-2">
        <h3 className="text-[13px] md:text-xl lg:text-2xl drop-shadow-xl">
          {title}
        </h3>
        <h1 className="text-[16px] md:text-3xl lg:text-3xl font-[500] drop-shadow-xl">
          {subtitle}
        </h1>
        <span className="text-[13px] md:text-xl lg:text-2xl drop-shadow-xl">
          {discount}
        </span>
      </div>

      <div className="absolute float-product  w-[120px] sm:w-[140px] md:w-[190px]    z-[2] top-[50%] right-[2%] sm:right-[0%] xl:right-[5%] ">
        <img
          src={image}
          alt="watch"
          className="h-full w-full product-shadow"
        />
      </div>
    </Link>
  );
};

export default ProductSlider;
