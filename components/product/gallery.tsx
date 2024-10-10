'use client';

import { ProductTitle } from 'components/grid/producttitel';
import { useProduct } from 'components/product/product-context';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';

export function Gallery({ images }) {
  const { state } = useProduct();
  const thumbnailRef = useRef<HTMLUListElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('selectedImageUrl');
    if (storedImageUrl) {
      setSelectedImageUrl(storedImageUrl);
    } else {
      setSelectedImageUrl(images[0]?.src || null); // Default to the first image if none stored
    }
    setStartIndex(0); // Reset startIndex to show the first set of thumbnails
  }, [images]);

  const visibleThumbnails = 5; // Number of thumbnails to show

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const totalImages = images.length;

    if (direction === 'left' && startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    } else if (direction === 'right' && startIndex + visibleThumbnails < totalImages) {
      setStartIndex((prev) => Math.min(prev + 1, totalImages - visibleThumbnails));
    }

    if (thumbnailRef.current) {
      const scrollAmount = direction === 'left' 
        ? -thumbnailRef.current.clientWidth / visibleThumbnails 
        : thumbnailRef.current.clientWidth / visibleThumbnails;

      thumbnailRef.current.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {selectedImageUrl && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt="Product Image"
            src={selectedImageUrl}
            priority={true}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center my-12">
          <button
            type="button"
            onClick={() => scrollThumbnails('left')}
            aria-label="Scroll left"
            className="p-2"
            disabled={startIndex === 0}
          >
            <FaChevronLeft />
          </button>
          <ul
            ref={thumbnailRef}
            className="flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0"
          >
            {images.slice(startIndex, startIndex + visibleThumbnails).map((image) => {
              const isActive = image.src === selectedImageUrl;

              return (
                <li key={image.src} className="h-30 w-25">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('selectedImageUrl', image.src);
                      setSelectedImageUrl(image.src);
                    }}
                    aria-label="Select product image"
                    className={`h-full w-full ${isActive ? 'border border-blue-500' : ''}`}
                  >
                    <ProductTitle
                      alt={image.altText}
                      src={image.src}
                      width={100}
                      height={100}
                      active={isActive}
                    />
                  </button>
                </li>
              );
            })}
            {images.length > visibleThumbnails && (
              <div className="text-gray-500">{`+ ${images.length - visibleThumbnails - startIndex} more`}</div>
            )}
          </ul>
          <button
            type="button"
            onClick={() => scrollThumbnails('right')}
            aria-label="Scroll right"
            className="p-2"
            disabled={startIndex + visibleThumbnails >= images.length}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </form>
  );
}
