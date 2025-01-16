'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Product } from 'lib/shopify/types';

interface ProductGridItemsProps {
  products: Product[];
}

const ProductGridItems: React.FC<ProductGridItemsProps> = ({ products }) => {
  const pathname = usePathname(); // Get the current path
  const isSalePath = pathname.endsWith('/search/republic-sale'); // Check if the path ends with '/search/republic-sale'

  return (
    <div className="product-grid-items">
      {products.length ? (
        <>
          {/* Mobile view: 2 products in a row */}
          <div className="grid grid-cols-2 md:hidden">
            {products.map((product) => (
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
                    <div>{product.title}</div>
                    <div>₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Larger screens: 4 products in a row */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-2">
            {products.map((product) => (
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
                    <div>{product.title}</div>
                    <div>₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default ProductGridItems;
