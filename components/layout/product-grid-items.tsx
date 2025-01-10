'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from 'lib/shopify/types';

interface ProductGridItemsProps {
  products: Product[];
}

const ProductGridItems: React.FC<ProductGridItemsProps> = ({ products }) => {
  return (
    <div className="product-grid-items">
      {products.length ? (
        <>
          {/* Mobile view: 2 products in a row */}
          <div className="grid grid-cols-2 md:hidden">
            {products.map((product) => {
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
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <img
                      src={product.featuredImage.url}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="h-auto w-full transform rounded-xl bg-gray-300 object-cover transition duration-500 ease-in-out hover:scale-105"
                      loading="lazy"
                    />

                    <div className="mt-2 text-sm text-gray-700">
                      <div>{product.title}</div>
                      <div>
                        ₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}
                      </div>
                    </div>

                    {/* Thumbnails for Unique Color Images (only if color exists) */}
                    {uniqueColorImages.length > 0 && (
                      <div className="mt-2 flex space-x-2 ">
                        {maxThumbnails.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Color Option ${index + 1}`}
                            width={50}
                            height={50}
                            className="h-11 w-9 md:h-14 md:w-12 rounded bg-gray-100 border border-gray-300"
                          />
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
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <img
                      src={product.featuredImage.url}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="h-auto w-full transform rounded-xl bg-gray-300 object-cover transition duration-500 ease-in-out hover:scale-105"
                      loading="lazy"
                    />

                    <div className="mt-2 text-sm text-gray-700">
                      <div>{product.title}</div>
                      <div>
                        ₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}
                      </div>
                    </div>

                    {/* Thumbnails for Unique Color Images (only if color exists) */}
                    {uniqueColorImages.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {maxThumbnails.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Color Option ${index + 1}`}
                            width={50}
                            height={50}
                            className="h-11 w-9 md:h-14 md:w-12  rounded bg-gray-100 border border-gray-300"
                          />
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
