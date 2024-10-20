import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  images: Array<{ src: string; altText?: string }>;
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  let startX: number;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          onNext(); // Swipe left
        } else {
          onPrevious(); // Swipe right
        }
      }
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener('touchstart', handleTouchStart);
      modalElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('touchstart', handleTouchStart);
        modalElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50" ref={modalRef}>
      <div className="relative">
        <img
          src={images[selectedIndex]?.src}
          alt="Enlarged Product"
          className="max-w-full max-h-screen bg-gray-200"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-thin text-5xl"
        >
          &times;
        </button>

        {/* Navigation Arrows (Only on laptop screens and up) */}
        <button
          onClick={onPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl hidden lg:block"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl hidden lg:block"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Modal;
