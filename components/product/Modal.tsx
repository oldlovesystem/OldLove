import React from 'react';

interface ModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative">
        <img src={imageUrl} alt="Enlarged Product" className="max-w-full max-h-screen bg-gray-200" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-thin text-5xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
