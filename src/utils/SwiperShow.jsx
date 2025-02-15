import { Swiper, SwiperSlide } from "swiper/react";
import { useState,useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';


import { Autoplay, Navigation, Pagination } from "swiper/modules";
import axios from "axios";



const SwiperShow = ({children}) => {
  return (
    <Swiper 
    navigation={true}
    slidesPerView={5}
    spaceBetween={10}
    pagination={true} 
    modules={[Pagination, Autoplay,Navigation]}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
    breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      }}
    className="mySwiper object-cover rounded-md">

      {children}

    </Swiper>
  )
}
export default SwiperShow