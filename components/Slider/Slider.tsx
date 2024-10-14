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
    <div className="slider-block bg-linear style-one h-[350px] w-full max-[420px]:h-[320px] sm:h-[500px] md:h-[580px] lg:h-[800px] xl:h-[860px] pt-4"> {/* Added padding-top */}
      <div className="slider-main h-full w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="relative h-full"
          autoplay={{
            delay: 4000
          }}
        >
                 <SwiperSlide>
            <Link href="/search/formal-shirts">
              <div className="relative h-full w-full">
                <Image
                  src={'/b3.jpg'}
                  layout="fill"
                  objectFit="cover"
                  alt="bg1-1"
                  priority={true}
                  className="object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/search/printed-shirts">
              <div className="relative h-full w-full">
                <Image
                  src={'/b-2.jpeg'}
                  layout="fill"
                  objectFit="cover"
                  alt="bg1-1"
                  priority={true}
                  className="object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/search/cargo-trousers">
              <div className="relative h-full w-full">
                <Image
                  src={'/bgg.jpeg'}
                  layout="fill"
                  objectFit="cover"
                  alt="bg1-1"
                  priority={true}
                  className="object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
     
        </Swiper>
      </div>
    </div>
  );
};

export default SliderOne;
