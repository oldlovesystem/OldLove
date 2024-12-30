"use client";
import clsx from 'clsx';
import React, { useState } from 'react';
import Image from 'next/image';
import Label from '../label';

export function ProductTitle({
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
      className="flex flex-col h-full w-full relative" // Make the wrapper relative for absolute positioning
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >

      
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
              'transition duration-300 ease-in-out group-hover:scale-105 bg-gray-300': isInteractive,
            })}

            {...props}
          />
        )}

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
