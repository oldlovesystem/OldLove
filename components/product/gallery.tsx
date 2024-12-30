'use client';

import { ProductTitle } from 'components/grid/producttitel';
import { useProduct } from 'components/product/product-context';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Modal from './Modal';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }) {
  const { selectedVariantImage, updateSelectedVariantImage } = useProduct();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    selectedVariantImage || images[0]?.src
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleThumbnails = 5;

  useEffect(() => {
    setLoading(true);

    const regex = /files\/([^?]+)/;
    const match = selectedVariantImage?.match(regex);
    const storedImageId = match ? match[1] : null;

    const foundIndex = selectedVariantImage
      ? images.findIndex((image: any) => image.src.includes(storedImageId))
      : -1;

    if (foundIndex !== -1) {
      setSelectedIndex(foundIndex);
      setSelectedImageUrl(images[foundIndex].src);
    } else {
      setSelectedIndex(0);
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

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
    setSelectedImageUrl(images[nextIndex].src);
    updateSelectedVariantImage(images[nextIndex].src);
  };

  const handlePrevious = () => {
    const previousIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(previousIndex);
    setSelectedImageUrl(images[previousIndex].src);
    updateSelectedVariantImage(images[previousIndex].src);
  };

  const getThumbnailIndices = () => {
    const thumbnails = [];
    for (let i = 0; i < visibleThumbnails; i++) {
      const index = (selectedIndex + i) % images.length;
      thumbnails.push(images[index]);
    }
    return thumbnails;
  };

  return (
    <form>
      <div className="group relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {!selectedImageUrl || loading ? (
          <Skeleton className="h-full w-full object-contain" />
        ) : (
          <>
            <Image
              className="h-full w-full cursor-pointer bg-[rgb(224,220,225)] object-contain"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt="Product Image"
              src={selectedImageUrl}
              priority={true}
              onClick={() => setIsModalOpen(true)}
            />

            {/* Navigation arrows on main image */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {loading || images.length === 0 ? (
        <div className="my-12 flex items-center justify-center">
          {[...Array(visibleThumbnails)].map((_, i) => (
            <div key={i} className={`mx-2 h-20 w-20 animate-pulse bg-gray-300`} />
          ))}
        </div>
      ) : (
        <div className="my-12 flex items-center justify-center">
          <ul className="flex items-center justify-center gap-2 py-1 lg:mb-0">
            {getThumbnailIndices().map((image, idx) => {
              const isActive = image.src === selectedImageUrl;

              return (
                image.src && (
                  <button
                    type="button"
                    key={image.src}
                    onClick={() => {
                      setSelectedImageUrl(image.src);
                      setSelectedIndex((selectedIndex + idx) % images.length);
                      updateSelectedVariantImage(image.src);
                    }}
                    aria-label="Select product image"
                    className={`h-20 w-20 lg:h-24 lg:w-24 ${
                      isActive ? 'border border-black' : ''
                    }`}
                  >
                    <div className="h-full w-full">
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
      )}

      <Modal
        isOpen={isModalOpen}
        images={images}
        selectedIndex={selectedIndex}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </form>
  );
}
