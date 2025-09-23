'use client';

import React from 'react';
import Image from 'next/image';
import img1 from '../../../../public/images/slider-image-1.jpeg';
import img2 from '../../../../public/images/slider-image-2.jpeg';
import img3 from '../../../../public/images/slider-image-3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const MainSlider = () => {
  return (
    <div className="w-[90%] flex p-4 my-4 mx-auto">
      <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop
        >
          <SwiperSlide>
            <Image
              src={img1}
              alt="Slider Image 1"
              className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img2}
              alt="Slider Image 2"
              className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img3}
              alt="Slider Image 3"
              className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <div className="w-1/4">
        <Image
          src={img2}
          alt="Sidebar Image 1"
          className="w-full h-[200px] object-cover"
        />
        <Image
          src={img3}
          alt="Sidebar Image 2"
          className="w-full h-[200px] object-cover"
        />
      </div> */}
    </div>
  );
};

export default MainSlider;
