// 'use client';

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';
// import { CategoryType } from '@/types/category.type';
// import Image from "next/image";

// Image
// export default function CategorySwiper({ data } : { data: CategoryType[] }) {
//   return (
//     <div className="mx-auto w-[80%]">
//       <h1 className='text-2xl font-bold text-purple-500 my-4'> Categories </h1>
//       <Swiper
//         spaceBetween={0}
//         slidesPerView={7}
//         modules={[Autoplay]}
//         autoplay={{ delay: 2000 }}
//         loop
//       >
//         {data.map((category : CategoryType) => (
//           <SwiperSlide key={category._id}>
//             <div className="w-[90%] flex flex-wrap flex-col ">
//               <Image
//                   src={category.image}
//                   alt={category.name}
//                   width={500}
//                   height={500}
//                   className="object-cover w-full h-[150px] rounded-lg"
//                 />
            
//               <p className="mt-2 text-center text-sm font-medium">{category.name}</p>
//             </div>
                
          
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }



'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { CategoryType } from '@/types/category.type';
import Image from "next/image";

export default function CategorySwiper({ data } : { data: CategoryType[] }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-purple-500 my-4 sm:my-6 text-center sm:text-left'> Categories </h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((category : CategoryType) => (
          <SwiperSlide key={category._id}>
            <div className="w-full flex flex-col group cursor-pointer">
              <Image
                src={category.image}
                alt={category.name}
                width={500}
                height={500}
                className="object-cover w-full h-[100px] sm:h-[120px] md:h-[140px] lg:h-[150px] rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
              />
              <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm font-medium text-gray-700 group-hover:text-purple-600 dark:text-white dark:hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}