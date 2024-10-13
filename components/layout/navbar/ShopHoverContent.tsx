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
                <Link href={'/search/check-shirts'} className="link text-secondary text-gray-500 has-line-before duration-300">
                  Checks Shirts
                </Link>
              </li>
              <li>
                <Link href={'/search/casual-shirts'} className="link text-secondary  text-gray-500 has-line-before duration-300">
                  Casual Shirts
                </Link>
              </li>
              <li>
                <Link href={'/search/formal-shirts'} className="link text-secondary text-gray-500  has-line-before duration-300">
                  Formal Shirts
                </Link>
              </li>
              <li>
                <Link href={'/search/printed-shirts'} className="link text-secondary text-gray-500  has-line-before duration-300">
                  Printed Shirts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Bottom Wear */}
        <div className="nav-link flex basis-2/3 gap-12 pr-12">
          <div className="nav-item">
            <div className="text-button-uppercase pb-2">Bottom Wear</div>
            <ul>
              <li>
                <Link href={'/search/jeans'} className="link text-secondary text-gray-500 has-line-before duration-300">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href={'/search/cargo-trousers'} className="link text-secondary text-gray-500  has-line-before duration-300">
                  Cargo Trousers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Products */}
        {[
          {
            src: '/4M6A2498.JPG',
            name: 'Formal Shirt',
            price: '₹499.99',
            oldPrice: '₹599.99',
            discount: '-17%',
          },
          {
            src: '/FormalShirt.webp',
            name: 'Classic Shirt',
            price: '₹590.99',
            oldPrice: '₹799.99',
            discount: '-25%',
          },
          {
            src: '/PrintedShirt.webp',
            name: 'Printed Shirt',
            price: '₹449.99',
            oldPrice: '₹599.99',
            discount: '-25%',
          },
          {
            src: '/IMG_0012.JPG',
            name: ' Casual Shirts',
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
              <Link href="/search" className="group relative">
                <Image
                  src={product.src}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="mb-2 object-cover bg-gray-300"
                />
                {/* Overlay Buttons */}
                <div
                  className={`absolute bottom-0 mb-4 flex w-full transform justify-center transition-transform duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
               
                </div>
              </Link>
              
              <div className="mb-1 text-gray-700">{product.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopHoverContent;
