'use client';

import React from 'react';
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
          delay: 4000
        }}
      >
        {[
          { href: '/search', src: '/Banner1.png' },
          { href: '/search', src: '/Banner2.png' },
          { href: '/search', src: '/Banner3.png' },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.href}>
              <div className="image-container relative">
                <img
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
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
