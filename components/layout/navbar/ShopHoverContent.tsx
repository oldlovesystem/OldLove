"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ShopHoverContent: React.FC = () => {
  return (
    <div className="w-full shadow-lg p-4 rounded bg-white"> 
      <div className="grid grid-cols-6 gap-4 mt-4">
        {/* Column 1: Top Wear */}
        <div>
          <h4 className="font-semibold uppercase text-center ml-1">Top Wear</h4>
          <ul className="pl-5 text-center text-gray-500 mt-2">
            <Link href={'/search/printed-shirts'}>
              <li className="mb-2 hover:underline transition-all duration-300 ml-2">Printed Shirts</li>
            </Link>
            <Link href={"/search/casual-shirts"}>
              <li className="mb-2 hover:underline transition-all duration-300 ml-2">Casual Shirts</li>
            </Link>
            <Link href={'/search/check-shirts'}>
              <li className="mb-2 hover:underline transition-all duration-300 ml-2">Checks Shirts</li>
            </Link>
          </ul>
        </div>

        {/* Column 2: Bottom Wear */}
        <div>
          <h4 className="font-semibold uppercase text-center">Bottom Wear</h4>
          <ul className="pl-5 text-gray-500 mt-2 ml-2">
            <li className="mb-2 hover:underline transition-all duration-300 ml-6">Jeans</li>
            <li className="mb-2 hover:underline transition-all duration-300 ml-6">Cargos</li>
          </ul>
        </div>

        {/* Column 3: Recent Products */}
        {[
          {
            src: '/4M6A2498.JPG',
            name: 'Formal shirt',
            price: '₹499.99',
            oldPrice: '₹599.99',
            discount: '-17%',
          },
          {
            src: '/FormalShirt.webp',
            name: 'Classsic Shirt',
            price: '₹590.99',
            oldPrice: '₹799.99',
            discount: '-25%',
          },
          {
            src: '/PrintedShirt.webp',
            name: 'Formal Shirt',
            price: '₹449.99',
            oldPrice: '₹599.99',
            discount: '-25%',
          },
          {
            src: '/IMG_0012.JPG',
            name: 'Fromal shirt',
            price: '₹399.99',
            oldPrice: '₹499.99',
            discount: '-20%',
          },
        ].map((product, index) => {
          const [isHovered, setIsHovered] = useState(false); // Manage hover state for each product

          return (
            <div 
              key={index} 
              className="relative mb-2" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative group">
                <Image 
                  src={product.src} 
                  alt={product.name} 
                  width={250} 
                  height={200} 
                  className="mb-2 object-cover"
                />
                {/* Overlay Buttons */}
                <div className={`absolute bottom-0 mb-4 w-full flex justify-center transform transition-transform duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <div className="flex space-x-2">
                    <button className="bg-white text-black px-4 py-2 rounded-full text-xs shadow-md uppercase transition-transform duration-300 transform hover:scale-105">Quick Shop</button>
                    <button className="bg-white text-black px-4 py-2 rounded-full text-xs shadow-md uppercase transition-transform duration-300 transform hover:scale-105">Quick View</button>
                  </div>
                </div>
              </div>
              <span className="product-tag text-button-uppercase bg-[rgb(210,239,154)] px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">New</span>
              <div className="text-gray-700 mb-1">{product.name}</div>
              <div className="flex items-center">
                <div className="font-bold text-lg mr-2">{product.price}</div>
                <div className="text-gray-700 line-through">{product.oldPrice}</div>
                <span className="product-tag text-button-uppercase bg-[rgb(210,239,154)] px-3 py-0.5 inline-block rounded-full ml-2">{product.discount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopHoverContent;
