'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';

const SliderOne = () => {
  return (
    <div className="slider "> {/* Added padding-top */}
      <div className="slider-main  w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="relative "
          autoplay={{
            delay: 3500
          }}
        >
                 <SwiperSlide>
            <Link href="/search/formal-shirts">
              <div className="relative h-full w-full">
              <video
                                    className='w-[100vw]'
                                    loop
                                    autoPlay
                                    muted
                                >
                                    <source src='/CanvaDesign.mp4' type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/search/printed-shirts">
              <div className="relative h-full w-full">
              <video
                                    className='w-[100vw]  '
                                    loop
                                    autoPlay
                                    muted
                                >
                                    <source src='/d3.mp4' type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/search/cargo-trousers">
              <div className="relative h-full w-full">
              <video
                                    className='w-[100vw]   md:mt-0'
                                    loop
                                    autoPlay
                                    muted
                                >
                                    <source src='/d2.mp4' type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
              </div>
            </Link>
          </SwiperSlide>
     
        </Swiper>
      </div>
    </div>
  );
};

export default SliderOne;
