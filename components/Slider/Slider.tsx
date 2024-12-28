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
          delay: 4000
        }}
      >
        {[
          { href: '/search', src: '/Banner-3.png' },
          { href: '/search', src: '/Banner.png' },
          { href: '/search/formal-shirts', src: '/banner-2.png' },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.href}>
              <div className="image-container relative">
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
