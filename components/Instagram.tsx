'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const Instagram = () => {
  return (
    <>
      <div className="instagram-block font-tenor-sans pt-10 md:pt-20">
        <div className="container">
          <div className="font-tenor-sans font-thin">
            <div className="font-tenor-sans text-center text-3xl uppercase">
              Oldlove On Instagram
            </div>
            <div className="font-tenor-sans mt-3 text-center">#Oldlovetheme</div>
          </div>
          <div className="list-instagram mt-6 md:mt-10">
            <Swiper
              spaceBetween={12}
              slidesPerView={2}
              loop={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 4000
              }}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                  spaceBetween: 16
                },
                680: {
                  slidesPerView: 3,
                  spaceBetween: 16
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 16
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 16
                }
              }}
            >
              <SwiperSlide>
                <Link
                  href={'https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D'}
                  target="_blank"
                  className="item relative block overflow-hidden rounded-[32px]"
                >
                  <Image
                    src={'/IMG_0062.JPG'}
                    width={300}
                    height={300}
                    alt="1"
                    className="relative h-full w-full duration-500"
                  />
                  <div className="icon absolute left-1/2 top-1/2 z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white duration-500 hover:bg-black">
                    <div className="icon-instagram text-2xl text-black"></div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  href={'https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D'}
                  target="_blank"
                  className="item relative block overflow-hidden rounded-[32px]"
                >
                  <Image
                    src={'/4M6A2692.JPG'}
                    width={300}
                    height={300}
                    alt="1"
                    className="relative h-full w-full duration-500"
                  />
                  <div className="icon absolute left-1/2 top-1/2 z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white duration-500 hover:bg-black">
                    <div className="icon-instagram text-2xl text-black"></div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  href={'https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D'}
                  target="_blank"
                  className="item relative block overflow-hidden rounded-[32px]"
                >
                  <Image
                    src={'/IMG_0012.JPG'}
                    width={300}
                    height={300}
                    alt="1"
                    className="relative h-full w-full duration-500"
                  />
                  <div className="icon absolute left-1/2 top-1/2 z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white duration-500 hover:bg-black">
                    <div className="icon-instagram text-2xl text-black"></div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  href={'https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D'}
                  target="_blank"
                  className="item relative block overflow-hidden rounded-[32px]"
                >
                  <Image
                    src={'/4M6A2769.JPG'}
                    width={300}
                    height={300}
                    alt="1"
                    className="relative h-full w-full duration-500"
                  />
                  <div className="icon absolute left-1/2 top-1/2 z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white duration-500 hover:bg-black">
                    <div className="icon-instagram text-2xl text-black"></div>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  href={'https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D'}
                  target="_blank"
                  className="item relative block overflow-hidden rounded-[32px]"
                >
                  <Image
                    src={'/4M6A2498.JPG'}
                    width={300}
                    height={300}
                    alt="1"
                    className="relative h-full w-full duration-500"
                  />
                  <div className="icon absolute left-1/2 top-1/2 z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white duration-500 hover:bg-black">
                    <div className="icon-instagram text-2xl text-black"></div>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instagram;
