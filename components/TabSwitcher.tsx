"use client";
import React from 'react';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { Product } from 'lib/shopify/types';

interface TabSwitcherProps {
  products: Product[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ products }) => {
  // Limit the number of products displayed
  const displayProducts = products.length > 6 ? products.slice(0, 10) : products;

  return (
    <div className="what-new-block md:pt-20">
      <div className="text-center logo-font uppercase collectionheading font-thin mb-8">Redefine your Wadrobe</div>

      <div className='mt-10'>
        {displayProducts.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 ml-2 mr-2 ">
            {displayProducts.map((product) => (
              <li key={product.handle} className="relative">
                <Link href={`/product/${product.handle}`} className="relative h-full w-full inline-block">
                <div className="w-full height-responsive relative overflow-hidden">
                    <GridTileImage
                      alt={product.title}
                      label={{
                        title: product.title,
                        amount: product.priceRange.maxVariantPrice.amount,
                        currencyCode: product.priceRange.maxVariantPrice.currencyCode
                      }}
                      fill
                      src={product.featuredImage?.url}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 60vw"
                     
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default TabSwitcher;
