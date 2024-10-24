"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Modal from './Modal';

// Skeleton Component
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }: { images: Array<{ src: string; altText?: string }> }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleThumbnails = 5;

  useEffect(() => {
    const imageLoadPromises = images.slice(0, visibleThumbnails).map((image) =>
      new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.src = image.src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      })
    );

    Promise.all(imageLoadPromises)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setImageError(true);
      });
  }, [images]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Featured Image Container */}
      <div
        className="relative aspect-square h-full max-h-[550px] lg:w-11/12 w-full overflow-hidden"
        onClick={() => openModal(selectedImageIndex)}
      >
        {loading || imageError ? (
          <Skeleton className="h-full w-full object-contain" />
        ) : (
          <Image
            className="h-full w-full object-contain cursor-pointer bg-gray-300"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt="Product Image"
            src={images[selectedImageIndex]?.src}
            priority={true}
          />
        )}

        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2    focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening modal
            goToPreviousImage();
          }}
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2  focus:outline-none"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening modal
            goToNextImage();
          }}
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      {loading || images.length === 0 ? (
        <div className="my-12 flex items-center justify-center">
          {[...Array(visibleThumbnails)].map((_, i) => (
            <Skeleton key={i} className="mx-2 h-20 w-20" />
          ))}
        </div>
      ) : (
        images.length > 0 && (
          <div className="my-12 flex items-center justify-center lg:mr-14">
            <ul className="flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0">
              {images.slice(0, visibleThumbnails).map((image, idx) => (
                <button
                  type="button"
                  key={image.src}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label="Select product image"
                  className={`h-30 w-25 ${idx === selectedImageIndex ? 'border border-gray-500' : ''}`}
                >
                  <div className="h-full w-full bg-gray-300">
                    <Image
                      alt={image.altText}
                      src={image.src}
                      width={100}
                      height={100}
                      className="object-contain"
                      onError={() => setImageError(true)}
                    />
                  </div>
                </button>
              ))}
              {images.length > visibleThumbnails &&
                images.slice(visibleThumbnails).map((image, idx) => (
                  <button
                    type="button"
                    key={image.src}
                    onClick={() => setSelectedImageIndex(visibleThumbnails + idx)}
                    aria-label="Select product image"
                    className={`h-30 w-25 ${visibleThumbnails + idx === selectedImageIndex ? 'border border-gray-500' : ''}`}
                  >
                    <div className="h-full w-full bg-gray-300">
                      <Image
                        alt={image.altText}
                        src={image.src}
                        width={100}
                        height={100}
                        className="object-contain"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </button>
                ))}
            </ul>
          </div>
        )
      )}

      {/* Modal for fullscreen image */}
      <Modal
        isOpen={isModalOpen}
        images={images}
        selectedIndex={selectedImageIndex}
        onClose={closeModal}
        onNext={goToNextImage}
        onPrevious={goToPreviousImage}
      />
    </div>
  );
}
