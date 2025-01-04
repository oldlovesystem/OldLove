'use client';
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
        <>
          {/* Mobile view: 2 products in a row */}
          <div className="grid grid-cols-2 md:hidden">
            {products.map((product) => (
              product?.handle && product?.featuredImage?.url && product?.title && product?.priceRange?.maxVariantPrice?.amount ? (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="h-auto w-full transform bg-gray-300 object-cover rounded-xl transition duration-500 ease-in-out hover:scale-105"
                      loading="lazy"
                    />
                    <div className="mt-2 text-sm text-gray-700">
                      <div>{product.title}</div>
                      <div>
                        ₹{parseInt(product.priceRange.maxVariantPrice.amount, 10)} 
                        {/* {product.priceRange.maxVariantPrice.currencyCode} */}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null
            ))}
          </div>

          {/* Larger screens: 4 products in a row */}
          <div className="hidden md:grid md:grid-cols-4 md:gap-2">
            {products.map((product) => (
              product?.handle && product?.featuredImage?.url && product?.title && product?.priceRange?.maxVariantPrice?.amount ? (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="relative block overflow-hidden"
                >
                  <div className="bg-white p-1">
                    <Image
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
                         {/* {product.priceRange.maxVariantPrice.currencyCode} */}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null
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
