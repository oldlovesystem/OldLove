"use client"
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
  variants?: { color: string; colorImage: string }[]; // Array of variations
} & React.ComponentProps<typeof Image>) {
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  return (
    <div 
      className="flex flex-col h-full w-full" 
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      <div
        className={clsx(
          'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border hover:border-blue-600',
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
            <button className="bg-white text-black px-4 py-2 rounded-full  text-sm shadow-md uppercase">Quick Shop</button>
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
