"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Skeleton Component
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(images[0]?.src || null);
  const [loading, setLoading] = useState(true); // Loading state for all images
  const [imageError, setImageError] = useState(false); // Error state for images

  const visibleThumbnails = 5;

  useEffect(() => {
    // Load all images and wait for all to load before setting loading to false
    const imageLoadPromises = images.slice(0, visibleThumbnails).map((image) =>
      new Promise<void>((resolve, reject) => {
        const img = document.createElement('img'); // Use HTMLImageElement
        img.src = image.src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      })
    );

    Promise.all(imageLoadPromises)
      .then(() => {
        setLoading(false); // All images loaded
      })
      .catch(() => {
        setImageError(true); // Handle error if any image fails to load
      });
  }, [images]);

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
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
          <div className="my-12 flex items-center justify-center">
            <ul className="flex items-center justify-center gap-2 overflow-x-auto py-1 lg:mb-0">
              {images.slice(0, visibleThumbnails).map((image, idx) => {
                const isActive = image.src === selectedImageUrl;

                return (
                  image.src && (
                    <button
                      type="button"
                      key={image.src}
                      onClick={() => {
                        setImageError(false); // Reset image error state
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
                          onError={() => setImageError(true)} // Handle error in thumbnail as well
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
    </form>
  );
}
