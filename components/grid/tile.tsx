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
  height?: number; // Add height as a prop
  variants?: { color: string; colorImage: string }[]; 
} & React.ComponentProps<typeof Image>) {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <div 
      className="flex flex-col h-full w-full relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
    >
      <div
        className={clsx(
          'group bg-gray-200 flex h-full w-full items-center justify-center overflow-hidden hover:border-blue-600',
          {
            relative: label,
            'border-1 border-blue-600': active,
          }
        )}
      >
        {props.src && (
          <Image
            className={clsx('lg:h-full w-full object-scale-down  md:object-scale-down lg:object-fill ' , {
              'transition duration-700 ease-in-out': isInteractive,
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
