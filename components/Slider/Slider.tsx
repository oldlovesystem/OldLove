'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import useMediaQuery from './useMediaQuery';
import 'swiper/css/effect-fade';

// Importing Images
import MobileBanner1 from '../../public/banner/Mobile/Banner1.jpg';
import MobileBanner2 from '../../public/banner/Mobile/Banner2.jpg';
import MobileBanner3 from '../../public/banner/Mobile/Banner3.jpg';

import PCBanner1 from '../../public/banner/PC/Banner1.png';
import PCBanner2 from '../../public/banner/PC/Banner2.png';
import PCBanner3 from '../../public/banner/PC/Banner3.png';

const SliderOne = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const slides = isMobile
    ? [
        { href: '/search', src: MobileBanner1 },
        { href: '/search/formal-shirts', src: MobileBanner2 },
        { href: '/search/formal-shirts', src: MobileBanner3 },
      ]
    : [
        { href: '/search', src: PCBanner1 },
        { href: '/search', src: PCBanner2 },
        { href: '/search/formal-shirts', src: PCBanner3 },
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
