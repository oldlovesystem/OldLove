"use client";
import clsx from 'clsx';
import React, { useState } from 'react';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  variants?: { color: string; colorImage: string }[]; 
} & React.ComponentProps<typeof Image>) {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <div 
      className="flex flex-col h-full w-full relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
    >
      {/* New tag on the left side */}
      <div className="product-tag text-button-uppercase bg-[rgb(210,239,154)] px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
          New
       </div>
      
      <div
        className={clsx(
          'group flex h-full w-full items-center justify-center overflow-hidden hover:border-blue-600',
          {
            relative: label,
            'border-2 border-blue-600': active,
          }
        )}
      >
        {props.src && (
          <Image
            className={clsx('h-full w-full object-contain', {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
            })}

            {...props}
          />
        )}
        {/* Overlay Buttons */}
        <div className={`absolute bottom-0 mb-4 w-full flex justify-center transform transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-4 opacity-0'}`}>
          <div className="flex space-x-2">
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm shadow-md uppercase">Quick Shop</button>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm shadow-md uppercase">Quick View</button>
          </div>
        </div>
      </div>
      {label && (
        <div className="mt-2">
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        </div>
      )}
    </div>
  );
}
