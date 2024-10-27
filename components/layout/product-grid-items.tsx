"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from 'lib/shopify/types';

interface ProductGridItemsProps {
  products: Product[];
}

const ProductGridItems: React.FC<ProductGridItemsProps> = ({ products }) => {
  return (
    <div className="product-grid-items">
      {products.length ? (
        <div className="grid grid-cols-2 gap-4 md:hidden"> {/* Mobile view: 2 products in a row */}
          {products.map((product) => (
            <Link key={product.handle} href={`/product/${product.handle}`} className="relative block overflow-hidden">
              <div className="bg-white p-4">
                <Image
                  src={product.featuredImage?.url}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover transition duration-500 ease-in-out transform hover:scale-105 bg-gray-300"
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
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No products available.</p>
      )}

      {/* Larger screens: 4 products in a row, stacking 4 per row */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4">
        {products.map((product, index) => (
          <Link key={product.handle} href={`/product/${product.handle}`} className="relative block overflow-hidden">
            <div className="bg-white p-4">
              <Image
                src={product.featuredImage?.url}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-auto object-cover bg-gray-300 transition duration-500 ease-in-out transform hover:scale-105"
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
        ))}
      </div>

      {/* Additional products stacking in groups of four */}
      <div className="md:hidden mt-4">
        {products.map((product, index) => (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4" key={index}>
            {products.slice(index * 4, index * 4 + 4).map((subProduct) => (
              <Link key={subProduct.handle} href={`/product/${subProduct.handle}`} className="relative block overflow-hidden">
                <div className="bg-white p-4">
                  <Image
                    src={subProduct.featuredImage?.url}
                    alt={subProduct.title}
                    width={300}
                    height={300}
                    className="w-full h-auto bg-gray-300 object-cover transition duration-500 ease-in-out transform hover:scale-105"
                    loading="lazy"
                  />
                  <div className="mt-2 text-sm text-gray-700">
                    <div>{subProduct.title}</div>
                    <div>
                      {subProduct.priceRange.maxVariantPrice.amount} {subProduct.priceRange.maxVariantPrice.currencyCode}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridItems;
