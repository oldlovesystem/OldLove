"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { Product } from 'lib/shopify/types';

interface TabSwitcherProps {
  products: Product[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ products }) => {
  const displayProducts = products.length > 6 ? products.slice(0, 8) : products;

  return (
    <div className="what-new-block ml-2 mr-2">
      <div className='section-swiper-navigation'>
        {displayProducts.length ? (
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            loop={true}
            modules={[Autoplay]} // Remove Navigation
            autoplay={{
              delay: 3000, // Adjust delay as needed
              disableOnInteraction: false,
            }}
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
            {displayProducts.map((product) => (
              <SwiperSlide key={product.handle}>
                <Link href={`/product/${product.handle}`} className="relative block overflow-hidden">
                  <div className="bg-white p-4">
                    <Image
                      src={product.featuredImage?.url}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full bg-gray-300 h-auto transition duration-500 ease-in-out transform hover:scale-105"
                      loading="lazy"
                    />
                    <div className="mt-2 text-sm text-gray-700">
                      <div>{product.title}</div>
                      <div>
                        {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="mt-4 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default TabSwitcher;
