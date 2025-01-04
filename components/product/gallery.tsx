'use client';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Modal from './Modal';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}

export function Gallery({ images }) {
  const { state, selectedVariantImage, updateSelectedVariantImage } = useProduct();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundIndex, setFoundIndex] = useState(0);
  const updateURL = useUpdateURL();
  const [initialLoad, setInitialLoad] = useState(true);

  const visibleThumbnails = 5;

  useEffect(() => {
    setSelectedImageUrl(selectedVariantImage);
  }, [selectedVariantImage]);

  useEffect(() => {
    setLoading(true);
    const regex = /files\/([^?]+)/;
    const match = selectedVariantImage?.match(regex);

    const storedImageId = match ? match[1] : null;
    if (images?.length > 0) {
      const newIndex = images?.findIndex((image: any) => image.src.includes(storedImageId)) || 0;
      setFoundIndex(newIndex);
      setSelectedIndex(newIndex);
      setSelectedImageUrl(images[newIndex]?.src);
      updateSelectedVariantImage(images[newIndex]?.src);
    }
    setLoading(false);
  }, [images, selectedVariantImage]);

  const handleNext = () => {
    const nextIndex =
      selectedIndex % visibleThumbnails === 4 ? selectedIndex - 4 : selectedIndex + 1;
    setSelectedIndex(nextIndex);
    setSelectedImageUrl(images[nextIndex].src);
    updateSelectedVariantImage(images[nextIndex].src);
  };

  const handlePrevious = () => {
    const previousIndex =
      selectedIndex % visibleThumbnails === 0 ? selectedIndex + 4 : selectedIndex - 1;
    setSelectedIndex(previousIndex);
    setSelectedImageUrl(images[previousIndex].src);
    updateSelectedVariantImage(images[previousIndex].src);
  };

  const getThumbnailIndices = () => {
    if (selectedIndex !== -1) {
      let startIndex = selectedIndex - (selectedIndex % 5);
      let lastIndex = 0;
      if (selectedIndex % 5 === 0) {
        lastIndex = Math.ceil((selectedIndex + 1) / 5) * 5;
      } else {
        lastIndex = Math.ceil(selectedIndex / 5) * 5;
      }
      const thumbnails = [];
      for (let i = startIndex; i < lastIndex; i++) {
        thumbnails.push(images[i]);
      }
      return thumbnails;
    } else {
      const thumbnails = [];
      for (let i = 0; i < visibleThumbnails; i++) {
        const index = (selectedIndex + i) % images.length;
        thumbnails.push(images[index]);
      }
      return thumbnails;
    }
  };

  return (
    <form>
      <div className="group relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {!selectedImageUrl || loading ? (
          <Skeleton className="h-full w-full object-contain" />
        ) : (
          <>
            <img
              className="h-full w-full cursor-pointer object-contain"
              alt="Product Image"
              src={selectedImageUrl}
              onClick={() => setIsModalOpen(true)}
            />

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
              const isActive = image?.src === selectedImageUrl;

              return (
                image?.src && (
                  <button
                    type="button"
                    key={image.src}
                    onClick={() => {
                      setSelectedImageUrl(image.src);
                      setSelectedIndex((selectedIndex + idx) % images.length);
                      updateSelectedVariantImage(image.src);
                    }}
                    aria-label="Select product image"
                    className="h-20 w-20 lg:h-24 lg:w-24"
                  >
                    <div className="h-full w-full">
                      <img
                        alt={image.altText}
                        src={image.src}
                        width={100}
                        height={100}
                        className={`${
                          isActive ? 'border-2 border-black' : 'border border-gray-300'
                        }`}
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
