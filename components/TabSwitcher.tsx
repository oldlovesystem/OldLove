"use client";
import React, { useState } from 'react';
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
  console.log("TabSwitcher ", collectionProducts);

  const formatTitle = (title: string) => {
    return title
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Ensure activeTab is a valid index
  const isValidTab = activeTab >= 0 && activeTab < collectionProducts.length;

  return (
    <div className="p-4">
        <div className='text-center text-5xl font-bold py-2 mb-4 '>What's New</div>
      <div className="flex justify-center mb-4">
        <div className="border-b bg-gray-200 rounded-full px-10 py-2">
          <div className="flex space-x-4">
            {collectionProducts.map((collection, index) => (
              <button
                key={collection.title}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-4 font-semibold transition-colors text-sm duration-300 rounded-full ${
                  activeTab === index 
                    ? 'bg-white text-black transform scale-105' 
                    : 'bg-gray-200 text-gray-700 hover:bg-white '
                }`}
              >
                {formatTitle(collection.title)} {/* Use the formatting function here */}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="tab-content">
        {/* Check if the active tab is valid and has products */}
        {isValidTab && collectionProducts[activeTab]?.products.length ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {collectionProducts[activeTab]?.products.map((product) => (
              <li key={product.handle} className="relative">
                <Link href={`/product/${product.handle}`} className="relative h-full w-full block">
                  <div className="w-full h-[50vh] relative overflow-hidden"> {/* Half the viewport height */}
                    <GridTileImage
                      alt={product.title}
                      label={{
                        title: product.title,
                        amount: product.priceRange.maxVariantPrice.amount,
                        currencyCode: product.priceRange.maxVariantPrice.currencyCode
                      }}
                      src={product.featuredImage?.url}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-contain" // Changed to object-contain
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
