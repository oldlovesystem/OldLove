'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';

const Collection = () => {
    const router = useRouter()

    const handleTypeClick = (type: string) => {
        router.push(`/shop/breadcrumb1?type=${type}`);
    };

    return (
        <>
            <div className="collection-block md:pt-20 pt-10 mb-10 lg:mb-0">
                <div className="container">
                    <div className="text-center logo-font text-3xl font-thin uppercase">Explore Collections</div>
                </div>
                <div className="list-collection section-swiper-navigation md:mt-10 sm:px-5 px-4 mt-5">
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={2}
                        navigation
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 12,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className='h-full'
                    >
                        {/* Formal Shirts Slide */}
                        <SwiperSlide>
                            <Link href={'search/formal-shirts'}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('swimwear')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={"/FormalShirt.webp"}
                                            width={1000}
                                            height={600}
                                            alt='swimwear'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Plain shirt
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                        {/* Casual Shirts Slide */}
                        <SwiperSlide>
                            <Link href={'search/casual-shirts'}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('top')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={'/4M6A9532.webp'}
                                            width={1000}
                                            height={600}
                                            alt='top'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Casuals
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                        {/* Printed Shirts Slide */}
                        <SwiperSlide>
                            <Link href={"search/check-shirts"}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('t-shirt')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={'/PrintedShirt.webp'}
                                            width={1000}
                                            height={600}
                                            alt='t-shirt'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Printed
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                        {/* Check Shirts Slide */}
                        <SwiperSlide>
                            <Link href={"search/check-shirts"}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('underwear')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={'/Check Shirts.webp'}
                                            width={1000}
                                            height={600}
                                            alt='underwear'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Checks
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                        {/* Jeans Slide */}
                        <SwiperSlide>
                            <Link href={'search/jeans'}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('sets')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={'/Jeans.webp'}
                                            width={1000}
                                            height={600}
                                            alt='sets'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Jeans
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                        {/* Cargo Trousers Slide */}
                        <SwiperSlide>
                            <Link href={"search/cargo-trousers"}>
                                <div
                                    className="collection-item block relative overflow-hidden cursor-pointer group"
                                    onClick={() => handleTypeClick('outerwear')}
                                >
                                    <div className="bg-img relative bg-gray-300">
                                        <Image
                                            src={'/Cargo.webp'}
                                            width={1000}
                                            height={600}
                                            alt='outerwear'
                                            className="transition duration-500 ease-in-out transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></div>
                                    </div>
                                    <div className="heading5 text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 text-white transition duration-500 ease-in-out">
                                        Cargo
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default Collection
