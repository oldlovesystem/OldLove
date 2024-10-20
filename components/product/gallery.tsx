"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Modal from './Modal';

// Skeleton Component
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(images[0]?.src || null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleThumbnails = 5;
  let startX: number;

  useEffect(() => {
    const imageLoadPromises = images.slice(0, visibleThumbnails).map((image) =>
      new Promise<void>((resolve, reject) => {
        const img = document.createElement('img');
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = startX - endX;

    if (Math.abs(deltaX) > 50) {
      // Detect swipe direction
      if (deltaX > 0) {
        // Swipe left
        goToNextImage();
      } else {
        // Swipe right
        goToPreviousImage();
      }
    }
  };

  const goToNextImage = () => {
    const currentIndex = images.findIndex(image => image.src === selectedImageUrl);
    if (currentIndex < images.length - 1) {
      setSelectedImageUrl(images[currentIndex + 1].src);
    }
  };

  const goToPreviousImage = () => {
    const currentIndex = images.findIndex(image => image.src === selectedImageUrl);
    if (currentIndex > 0) {
      setSelectedImageUrl(images[currentIndex - 1].src);
    }
  };

  return (
    <form>
      <div
        className="relative aspect-square h-full max-h-[550px] lg:w-11/12 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {loading || !selectedImageUrl || imageError ? (
          <Skeleton className="h-full w-full object-contain" />
        ) : (
          <Image
            className="h-full w-full object-contain cursor-pointer bg-gray-300"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt="Product Image"
            src={selectedImageUrl}
            priority={true}
            onClick={openModal}
          />
        )}
      </div>

      {loading || images.length === 0 ? (
        <div className="my-12 flex items-center justify-center">
          {[...Array(visibleThumbnails)].map((_, i) => (
            <Skeleton key={i} className="mx-2 h-20 w-20" />
          ))}
        </div>
      ) : (
        images.length > 1 && (
          <div className="my-12 flex items-center justify-center lg:mr-14">
            <ul className="flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0">
              {images.slice(0, visibleThumbnails).map((image, idx) => {
                const isActive = image.src === selectedImageUrl;

                return (
                  image.src && (
                    <button
                      type="button"
                      key={image.src}
                      onClick={() => {
                        setImageError(false);
                        setSelectedImageUrl(image.src);
                      }}
                      aria-label="Select product image"
                      className={`h-30 w-25 ${isActive ? 'border border-blue-500' : ''}`}
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
