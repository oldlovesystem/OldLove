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
            <div className="collection-block md:pt-20 pt-10">
                <div className="container">
                    <div className="text-center font-bold text-4xl">Explore Collections</div>
                </div>
                <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
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
                        <SwiperSlide>
                            <Link href={'search/formal-shirts'}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('swimwear')}>
                                <div className="bg-img">
                                    <Image
                                        src={"/FormalShirt.webp"}
                                        width={1000}
                                        height={600}
                                        alt='swimwear'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">Formals</div>
                            </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                        <Link href={'search/casual-shirts'}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('top')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/4M6A9532.JPG'}
                                        width={1000}
                                        height={600}
                                        alt='top'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-3 bg-white rounded-xl duration-500">Casuals</div>
                            </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                        <Link href={"search/check-shirts"}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('t-shirt')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/PrintedShirt.webp'}
                                        width={1000}
                                        height={600}
                                        alt='t-shirt'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">Printed Shirts</div>
                            </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                        <Link href={"search/check-shirts"}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('underwear')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/Check Shirts.webp'}
                                        width={1000}
                                        height={600}
                                        alt='underwear'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">Checks Shirt</div>
                            </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                        <Link href={'search/jeans'}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('sets')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/Jeans.webp'}
                                        width={1000}
                                        height={600}
                                        alt='sets'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">Jeans</div>
                            </div>
                        </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href={"search/cargo-trousers"}>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('outerwear')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/Cargo.webp'}
                                        width={1000}
                                        height={600}
                                        alt='outerwear'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">Cargo</div>
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