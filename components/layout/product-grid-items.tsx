'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Product } from 'lib/shopify/types';

interface ProductGridItemsProps {
  products: Product[];
}

const ProductGridItems: React.FC<ProductGridItemsProps> = ({ products }) => {
  const pathname = usePathname();
  const isSalePath = pathname.endsWith('/search/republic-sale');

  return (
    <div className="product-grid-items">
      {products.length ? (
        <>
          {/* Mobile view: 2 products in a row */}
          <div className="grid grid-cols-2 md:hidden">
            {products.map((product) => {
              // Extract unique color images
              const colorVariants = product.variants.filter((variant) =>
                variant.selectedOptions.some((opt) => opt.name === 'Color')
              );

              const uniqueColorImages = Array.from(
                new Map(
                  colorVariants.map((variant) => [variant.selectedOptions.find((opt) => opt.name === 'Color')?.value, variant.image?.url])
                )
              ).map(([_, url]) => url);

              const maxThumbnails = uniqueColorImages.slice(0, 3);
              const remainingCount = uniqueColorImages.length - 3;

              return (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <div className="relative">
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="h-auto w-full transform rounded-xl bg-gray-300 object-cover transition duration-500 ease-in-out hover:scale-105"
                        loading="lazy"
                      />

                      {/* Sale box on top-right corner */}
                      {isSalePath && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          Sale
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                    <div className="line-clamp-1">{product.title}</div>
                      <div>₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}</div>
                    </div>

                    {/* Thumbnails for Unique Color Images */}
                    {uniqueColorImages.length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {maxThumbnails.map((url, index) => (
                          <div
                            key={index}
                            className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-gray-100 border border-gray-300 overflow-hidden"
                          >
                            <img
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
              );
            })}
          </div>

          {/* Larger screens: 4 products in a row */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-2">
            {products.map((product) => {
              const colorVariants = product.variants.filter((variant) =>
                variant.selectedOptions.some((opt) => opt.name === 'Color')
              );

              const uniqueColorImages = Array.from(
                new Map(
                  colorVariants.map((variant) => [variant.selectedOptions.find((opt) => opt.name === 'Color')?.value, variant.image?.url])
                )
              ).map(([_, url]) => url);

              const maxThumbnails = uniqueColorImages.slice(0, 3);
              const remainingCount = uniqueColorImages.length - 3;

              return (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <div className="relative">
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="h-auto w-full transform rounded-xl bg-gray-300 object-cover transition duration-500 ease-in-out hover:scale-105"
                        loading="lazy"
                      />

                      {/* Sale box on top-right corner */}
                      {isSalePath && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          Sale
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                    <div className="line-clamp-1">{product.title}</div>
                      <div>₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}</div>
                    </div>

                    {/* Thumbnails for Unique Color Images */}
                    {uniqueColorImages.length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {maxThumbnails.map((url, index) => (
                          <div
                            key={index}
                            className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-gray-100 border border-gray-300 overflow-hidden"
                          >
                            <img
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
              );
            })}
          </div>
        </>
      ) : (
        <p className="mt-4 text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default ProductGridItems;
