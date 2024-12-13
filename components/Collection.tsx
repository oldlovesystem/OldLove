'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';

const Collection = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return (
    <>
      <div className="collection-block mb-10 pt-10 md:pt-20 lg:mb-0">
        <div className="container">
          <div className="logo-font collectionheading text-center font-thin uppercase">
            Explore Collections
          </div>
        </div>
        <div className="list-collection section-swiper-navigation mt-5 px-4 sm:px-5 md:mt-10">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            navigation
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 12
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
            className="h-full"
          >
            {/* Formal Shirts Slide */}
            <SwiperSlide>
              <Link href={'search/formal-shirts'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('swimwear')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/FormalShirt.webp'}
                      width={1000}
                      height={600}
                      alt="swimwear"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Plain shirt
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            {/* Casual Shirts Slide */}
            <SwiperSlide>
              <Link href={'search/casual-shirts'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('top')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/4M6A9532.webp'}
                      width={1000}
                      height={600}
                      alt="top"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Casuals
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            {/* Printed Shirts Slide */}
            <SwiperSlide>
              <Link href={'search/check-shirts'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('t-shirt')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/PrintedShirt.webp'}
                      width={1000}
                      height={600}
                      alt="t-shirt"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Printed
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            {/* Check Shirts Slide */}
            <SwiperSlide>
              <Link href={'search/check-shirts'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('underwear')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/Check Shirts.webp'}
                      width={1000}
                      height={600}
                      alt="underwear"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Checks
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            {/* Jeans Slide */}
            <SwiperSlide>
              <Link href={'search/jeans'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('sets')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/Jeans.webp'}
                      width={1000}
                      height={600}
                      alt="sets"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Jeans
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            {/* Cargo Trousers Slide */}
            <SwiperSlide>
              <Link href={'search/cargo-trousers'}>
                <div
                  className="collection-item group relative block cursor-pointer overflow-hidden"
                  onClick={() => handleTypeClick('outerwear')}
                >
                  <div className="bg-img relative bg-gray-300">
                    <Image
                      src={'/Cargo.webp'}
                      width={1000}
                      height={600}
                      alt="outerwear"
                      className="transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100"></div>
                  </div>
                  <div className="heading5 absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition duration-500 ease-in-out group-hover:opacity-60">
                    Cargo
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Collection;
