'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import useMediaQuery from './useMediaQuery';
import 'swiper/css/effect-fade';

const SliderOne = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const slides = isMobile
    ? [
        { href: '/search', src: '/banner/Mobile/Banner1.jpg' },
        { href: '/search/formal-shirts', src: '/banner/Mobile/Banner2.jpg' },
        { href: '/search/formal-shirts', src: '/banner/Mobile/Banner3.jpg' },
      ]
    : [
        { href: '/search', src: '/banner/PC/Banner1.png' },
        { href: '/search', src: '/banner/PC/Banner2.png' },
        { href: '/search/formal-shirts', src: '/banner/PC/Banner3.png' },
      ];

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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.href}>
              <div className="image-container">
              <Image
                  src={slide.src}
                  fill
                  sizes="100vw"
                  alt={`Slide ${index + 1}`}
                  priority={true}
                  className="object-fit"
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