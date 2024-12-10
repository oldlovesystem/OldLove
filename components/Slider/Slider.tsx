'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';

const SliderOne = () => {
  return (
    <div className="slider">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
        }}
      >
        {[
          { href: '/search', src: '/Home00005.JPG' },
          { href: '/search/casual-shirts', src: '/3.JPG' },
          { href: '/search/printed-shirts', src: '/Home00001.JPG' },
          { href: '/search/casual-shirts', src: '/Home0003.jpg' },
          { href: '/search/jeans', src: '/Home00004.JPG' },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.href}>
              <div className="relative image-container">
              <Image
  src={slide.src}
  fill
  sizes="100vw"
  alt={`Slide ${index + 1}`}
  priority={true}
  className="image"
/>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderOne;
