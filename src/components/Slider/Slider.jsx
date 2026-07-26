import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import "./Slider.css";
import ProductSlider from "../ProductSlider/ProductSlider";
import { companyDetails } from "../../constants/companyDetails";

const Slider = () => {
  // In future this will be replaced by API response
  const slidesData = companyDetails.slidesData || [];

  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <ProductSlider
              title={slide.title}
              subtitle={slide.subtitle}
              discount={slide.discount}
              image={slide.image}
              link={slide.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
