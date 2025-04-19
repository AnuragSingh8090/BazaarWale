import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import "./Slider.css";
import ProductSlider from "../ProductSlider/ProductSlider";

const Slider = () => {
  const slidesData = [
    {
      id: 1,
      title: "Best Deal Online on Smart Watches",
      subtitle: "SMART WEARABLE",
      discount: "UP to 80% OFF",
      image: "./productImages/smart-watch.png",
      link: "/",
    },
    {
      id: 2,
      title: "Gaming Mouse & Keyboard Bundle",
      subtitle: "PRO GAMING GEAR",
      discount: "UP to 65% OFF",
      image: "./productImages/mouse-keyboard.png",
      link: "/",
    },
    {
      id: 3,
      title: "Premium Wireless Earbuds",
      subtitle: "CRYSTAL CLEAR AUDIO",
      discount: "UP to 55% OFF",
      image: "./productImages/earbuds.png",
      link: "/",
    },
    {
      id: 4,
      title: "Game Controller Special Offer",
      subtitle: "PRECISION CONTROL",
      discount: "UP to 70% OFF",
      image: "./productImages/game-controller.png",
      link: "/",
    },
    {
      id: 5,
      title: "Premium Gaming Headphones",
      subtitle: "IMMERSIVE AUDIO",
      discount: "UP to 60% OFF",
      image: "./productImages/gaming-headphones.png",
      link: "/",
    },
    {
      id: 6,
      title: "New iPhone 16 Launch Special",
      subtitle: "iPhone 16 Pro Max",
      discount: "UP to 40% OFF",
      image: "./productImages/iphone16.png",
      link: "/",
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 1800,
          disableOnInteraction: true,
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
