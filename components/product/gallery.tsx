'use client';

import { ProductTitle } from 'components/grid/producttitel';
import { useProduct } from 'components/product/product-context';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Modal from './Modal'; 

// Skeleton Component
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }) {
  const { selectedVariantImage, updateSelectedVariantImage } = useProduct();
  const thumbnailRef = useRef<HTMLUListElement>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    selectedVariantImage || images[0].src
  );
  const [selectedIndex, setSelectedIndex] = useState(0); // Index of selected image
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const visibleThumbnails = 5;

  useEffect(() => {
    setLoading(true);

    // If a variant is selected, find its index in images array
    const regex = /files\/([^?]+)/;
    const match = selectedVariantImage?.match(regex);
    const storedImageId = match ? match[1] : null;

    const foundIndex = selectedVariantImage
      ? images.findIndex((image: any) => image.src.includes(storedImageId))
      : -1;

    if (foundIndex !== -1) {
      setSelectedIndex(foundIndex); // Set index of found image
      setSelectedImageUrl(images[foundIndex].src);
    } else {
      setSelectedIndex(0); // Default to first image
      setSelectedImageUrl(images[0]?.src || null);
    }

    setLoading(false);
  }, [images]);

  useEffect(() => {
    if (selectedImageUrl !== selectedVariantImage) {
      setLoading(true);
      setSelectedImageUrl(selectedVariantImage);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [selectedVariantImage, selectedImageUrl]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {!selectedImageUrl || loading ? (
          // Show skeleton loader when loading
          <Skeleton className="h-full w-full object-contain" />
        ) : (
          selectedImageUrl && (
            <Image
              className="h-full w-full object-contain cursor-pointer bg-gray-300" // Add cursor pointer
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt="Product Image"
              src={selectedImageUrl}
              priority={true}
              onClick={openModal} // Open modal on click
            />
          )
        )}
      </div>

      {loading || images.length === 0 ? (
        // Skeletons for thumbnails
        <div className="my-12 flex items-center justify-center">
          {[...Array(visibleThumbnails)].map((_, i) => (
            <div key={i} className={`mx-2 h-20 w-20 animate-pulse bg-gray-300`} />
          ))}
        </div>
      ) : (
        images.length > 1 && (
          <div className="my-12 flex items-center justify-center">
            <ul
              ref={thumbnailRef}
              className="flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0"
            >
              {images
                .slice(
                  selectedIndex,
                  selectedIndex + visibleThumbnails > images.length
                    ? images.length
                    : selectedIndex + visibleThumbnails
                )
                .map((image, idx) => {
                  const isActive = image.src === selectedImageUrl;

                  return (
                    image.src && (
                      <button
                        type="button"
                        key={image.src}
                        onClick={() => {
                          setSelectedImageUrl(image.src);
                          // Prevent changing selectedIndex on thumbnail click
                          // setSelectedIndex(selectedIndex + idx); 
                          updateSelectedVariantImage(image.src);
                        }}
                        aria-label="Select product image"
                        className={`h-30 w-25 ${isActive ? 'border border-blue-500' : ''}`}
                      >
                        <div className="h-full w-full bg-gray-300">
                          <ProductTitle
                            alt={image.altText}
                            src={image.src}
                            width={100}
                            height={100}
                            active={isActive}
                          />
                        </div>
                      </button>
                    )
                  );
                })}
            </ul>
          </div>
        )
      )}
      <Modal
        isOpen={isModalOpen}
        imageUrl={selectedImageUrl}
        onClose={closeModal}
      />
    </form>
  );
}
