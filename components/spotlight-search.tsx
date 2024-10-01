'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

type SpotlightSearchProps = {
  color: 'black' | 'white';
};

export default function SpotlightSearch({ color }: SpotlightSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };

  const isBlackTheme = color === 'black';

  return (
    <>
      <button
        onClick={toggleSearch}
        className={`text-${isBlackTheme ? 'white' : 'black'}`}
        aria-label="Open Spotlight Search"
      >
        <MagnifyingGlassIcon className={`h-6 w-6 text-${isBlackTheme ? 'white' : 'black'}`} />
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center pt-20 ${
            isBlackTheme ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-80'
          }`}
        >
          <div className="relative w-[90%] max-w-[600px]">
            <form action="/search" className="relative w-full">
              <input
                key={searchParams?.get('q')}
                type="text"
                name="q"
                placeholder="Search for products..."
                autoComplete="off"
                defaultValue={searchParams?.get('q') || ''}
                className={`w-full rounded-lg border ${
                  isBlackTheme
                    ? 'border-slate-600 bg-black/30 text-white'
                    : 'border-gray-200 bg-white text-black'
                } px-6 py-3 text-sm shadow-lg backdrop-blur-md placeholder:text-neutral-500 focus:outline-none md:text-lg`}
              />
              <div className="absolute bottom-0 right-4 top-0 hidden items-center md:flex">
                <MagnifyingGlassIcon
                  className={`h-5 w-5 ${
                    isBlackTheme ? 'text-neutral-500 dark:text-neutral-300' : 'text-gray-400'
                  }`}
                />
              </div>
            </form>
            <button
              onClick={closeSearch}
              className={`absolute right-0 top-0 -mr-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border ${
                isBlackTheme
                  ? 'border-slate-600 bg-black/80 text-white'
                  : 'border-gray-200 bg-white text-black'
              } shadow-md backdrop-blur-md`}
              aria-label="Close Spotlight Search"
            >
              <XMarkIcon className={`h-5 w-5 ${isBlackTheme ? 'text-white' : 'text-black'}`} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
