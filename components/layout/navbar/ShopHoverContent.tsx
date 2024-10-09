"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';



const ShopHoverContent: React.FC = () => {
  return (
    <div className="w-full rounded bg-white p-4 px-10 shadow-lg">
      <div className="mt-4 grid grid-cols-6 gap-4">
        {/* Column 1: Top Wear */}

        <div className="nav-link flex basis-2/3 gap-12 pr-12">
          <div className="nav-item">
            <div className="text-button-uppercase pb-2">TOPWEAR</div>
            <ul>
              <li>
                <Link href={'/search/check-shirts'} className={`link text-secondary duration-300`}>
                 Checks Shirts
                </Link>
              </li>
              <li>
                <Link href={'search/casual-shirts'} className={`link text-secondary duration-300`}>
                Casual Shirts
                </Link>
              </li>
              <li>
                <Link href={'/search/formal-shirts'} className={`link text-secondary duration-300`}>
                  Fromal Shirts
                </Link>
              </li>
              <li>
                <Link href={'/search/printed-shirts'} className={`link text-secondary duration-300`}>
                  Printed Shirts
                </Link>
              </li>
            </ul>
          </div>

        </div>
        <div className="nav-link flex basis-2/3 gap-12 pr-12">
          <div className="nav-item">
            <div className="text-button-uppercase pb-2">Bottom Wear</div>
            <ul>
              <li>
                <Link href={'/search/jeans'} className={`link text-secondary duration-300`}>
                 Jeans
                </Link>
              </li>
              <li>
                <Link href={'/search/cargo-trousers'} className={`link text-secondary duration-300`}>
                Cargo Trousers
                </Link>
              </li>


            </ul>
          </div>
          <div className="col-span-6">

        </div>
        </div>
        {[
          {
            src: '/4M6A2498.JPG',
            name: 'Formal shirt',
            price: '₹499.99',
            oldPrice: '₹599.99',
            discount: '-17%'
          },
          {
            src: '/FormalShirt.webp',
            name: 'Classsic Shirt',
            price: '₹590.99',
            oldPrice: '₹799.99',
            discount: '-25%'
          },
          {
            src: '/PrintedShirt.webp',
            name: 'Formal Shirt',
            price: '₹449.99',
            oldPrice: '₹599.99',
            discount: '-25%'
          },
          {
            src: '/IMG_0012.JPG',
            name: 'Fromal shirt',
            price: '₹399.99',
            oldPrice: '₹499.99',
            discount: '-20%'
          }
        ].map((product, index) => {
          const [isHovered, setIsHovered] = useState(false); // Manage hover state for each product

          return (
            <div
              key={index}
              className="relative mb-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="group relative">
                <Image
                  src={product.src}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="mb-2 object-cover"
                />
                {/* Overlay Buttons */}
                <div
                  className={`absolute bottom-0 mb-4 flex w-full transform justify-center transition-transform duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  <div className="flex space-x-2">
                    <button className="transform rounded-full bg-white px-4 py-2 text-xs uppercase text-black shadow-md transition-transform duration-300 hover:scale-105">
                      Quick Shop
                    </button>
                    <button className="transform rounded-full bg-white px-4 py-2 text-xs uppercase text-black shadow-md transition-transform duration-300 hover:scale-105">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
              <span className="product-tag text-button-uppercase absolute left-3 top-3 z-[1] inline-block rounded-full bg-[rgb(210,239,154)] px-3 py-0.5">
                New
              </span>
              <div className="mb-1 text-gray-700">{product.name}</div>
              <div className="flex items-center">
                <div className="mr-2 text-lg font-bold">{product.price}</div>
                <div className="text-gray-700 line-through">{product.oldPrice}</div>
                <span className="product-tag text-button-uppercase ml-2 inline-block rounded-full bg-[rgb(210,239,154)] px-3 py-0.5">
                  {product.discount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopHoverContent;
