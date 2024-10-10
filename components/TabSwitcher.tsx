"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { Product } from 'lib/shopify/types';

interface CollectionProduct {
  title: string;
  products: Product[];
}

interface TabSwitcherProps {
  collectionProducts: CollectionProduct[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ collectionProducts }) => {
  const [activeTab, setActiveTab] = useState(0);

  const formatTitle = (title: string) => {
    const firstWord = title.split('-')[0]; 
    return firstWord ? firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + '' : ''; 
  };

  const isValidTab = activeTab >= 0 && activeTab < collectionProducts.length;
  const products = isValidTab ? collectionProducts[activeTab]?.products : [];

  return (
    <div className="whate-new-block md:pt-20">
      <div className="text-center heading3 mb-5">What{String.raw`'s`} new</div>

      <div className="flex justify-center mt-4">
        <div className="whate-new-block border-b bg-gray-200 rounded-2xl py-0.5 px-2 mb-10">
          <div className="flex space-x-2  tab-item"> 
            {collectionProducts.map((collection, index) => (
              <button
                key={collection.title}
                onClick={() => setActiveTab(index)}
                className={`py-2 lg:px-4 lg:text-secondary text-xs  px-2 transition-colors uppercase  duration-300 rounded-full ${
                  activeTab === index 
                    ? 'bg-white text-black transform scale-105' 
                    : 'bg-gray-200 text-gray-700 hover:bg-white '
                }`}
              >
                {formatTitle(collection.title)} 
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4'>
        {isValidTab && products.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 ml-4 mr-4">
            {products.map((product) => (
              <li key={product.handle} className="relative">
                <Link href={`/product/${product.handle}`} className="relative h-full w-full block">
                  <div className="w-full h-[50vh]  md:h-[60vh] relative overflow-hidden">
                    <GridTileImage
                      alt={product.title}
                      label={{
                        title: product.title,
                        amount: product.priceRange.maxVariantPrice.amount,
                        currencyCode: product.priceRange.maxVariantPrice.currencyCode
                      }}
                      src={product.featuredImage?.url}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 60vw"
                      className="object-contain" 
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
