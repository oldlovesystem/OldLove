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
<div >
    <div className='slider md:hidden block'>
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
          { href: '/search', src: '/BannerMobile1.jpg' },
          { href: '/search', src: '/BannerMobile2.jpg' },
          { href: '/search/formal-shirts', src: '/BannerMobile3.jpg' },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.href}>
              <div className="image-container">
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
    <div className="sliderlarge hidden md:block">
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
                <Image
                  src={slide.src}
                  fill
                  sizes="100vw"
                  alt={'slide ${index + 1}'}
                  priority={true}
                  className="image"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default SliderOne;
