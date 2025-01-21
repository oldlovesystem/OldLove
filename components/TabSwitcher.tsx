'use client';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { Product } from 'lib/shopify/types';

interface TabSwitcherProps {
  products: Product[];
  speed: number;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ products, speed }) => {
  const displayProducts = products.length > 6 ? products.slice(0, 8) : products;

  return (
    <div className="what-new-block ml-2 mr-2">
      <div className="section-swiper-navigation">
        {displayProducts.length ? (
          <Swiper
          spaceBetween={8}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: speed,
            disableOnInteraction: false,
            reverseDirection: true, // Reverses the autoplay direction
          }}
          modules={[Autoplay]} // <-- This is crucial for enabling autoplay
          breakpoints={{
            576: { slidesPerView: 2, spaceBetween: 5 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1200: { slidesPerView: 4, spaceBetween: 15 },
          }}
          className="h-full"
        >
            {displayProducts.map((product) => {
              // Filter unique color images
              const colorVariants = product.variants.filter((variant) =>
                variant.selectedOptions.some((opt) => opt.name === 'Color')
              );

              const uniqueColorImages = Array.from(
                new Map(
                  colorVariants.map((variant) => [variant.selectedOptions.find((opt) => opt.name === 'Color')?.value, variant.image?.url])
                )
              ).map(([_, url]) => url);

              // Limit to 3 thumbnails
              const maxThumbnails = uniqueColorImages.slice(0, 3);
              const remainingCount = uniqueColorImages.length - 3;

              return (
                <SwiperSlide key={product.handle}>
                  <Link href={`/product/${product.handle}`} className="relative block overflow-hidden">
                    <div className="bg-white p-[-1]">
                      {/* Main Product Image */}
                      <img
                        src={product.featuredImage?.url}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="h-auto w-full transform rounded-xl bg-gray-300 transition duration-500 ease-in-out hover:scale-105"
                        loading="lazy"
                      />
                      <div className="mt-2 text-sm text-gray-700">
                      <div className="line-clamp-1">{product.title}</div>
                        <div>
                          <span className="font-bold">₹</span>
                          {parseInt(product.priceRange.maxVariantPrice.amount, 10)}
                        </div>
                      </div>
                      {uniqueColorImages.length > 0 && (
                        <div className="flex space-x-2 mb-1 py-2">
                          {maxThumbnails.map((url, index) => (
                           <div
                           className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-gray-100 border border-gray-300 overflow-hidden"
                         >
                           <img
                             key={index}
                             src={url}
                             alt={`Color Option ${index + 1}`}
                             className="w-full h-full object-cover scale-[4] object-center"
                           />
                         </div>                 
                          ))}

                          {/* Remaining Count Indicator */}
                          {remainingCount > 0 && (
                            <span className="text-sm text-gray-500 font-semibold">+{remainingCount}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p className="mt-4 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default TabSwitcher;
