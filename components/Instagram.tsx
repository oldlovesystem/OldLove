'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Instagram = () => {
  const pcImages = [
    { src: '/shacketcollection.JPG', name: 'Shacket', link: '/search/shacket' },
    { src: '/1L9A3393.JPG', name: 'Half Sleeve', link: '/shacket' },
    { src: '/Checks.jpg', name: 'Checks', link: '/search/check-shirts' },
    { src: '/printed.JPG', name: 'Prints', link: '/search/printed-shirts' },
    { src: '/Causals.JPG', name: 'Casual', link: '/search/casual-shirts' },
    { src: '/Formals.jpg', name: 'Formal', link: '/search/formal-shirts' },
    { src: '/striped.JPG', name: 'Striped', link: '/search/striped-shirt' },
    { src: '/cargo.JPG', name: 'Cargo', link: '/search/cargo-trousers' },
    { src: '/jeans.jpg', name: 'Jeans', link: '/search/jeans' },
    { src: '/BD0A2811.JPG', name: 'More', link: '/search' },
  ];

  const mobileImages = [
    { src: '/shacketcollection.JPG', name: 'Shacket', link: '/search/shacket' },
    { src: '/Checks.jpg', name: 'Checks', link: '/search/check-shirts' },
    { src: '/printed.JPG', name: 'Prints', link: '/search/printed-shirts' },
    { src: '/Causals.JPG', name: 'Casual', link: '/search/casual-shirts' },
    { src: '/Formals.jpg', name: 'Formal', link: '/search/formal-shirts' },
    { src: '/striped.JPG', name: 'Striped', link: '/search/striped-shirt' },
    { src: '/cargo.JPG', name: 'Cargo', link: '/search/cargo-trousers' },
    { src: '/jeans.jpg', name: 'Jeans', link: '/search/jeans' },
    { src: '/BD0A2811.JPG', name: 'More', link: '/search' },
  ];

  return (
    <div className="instagram-block font-tenor-sans mb-3">
      <div className="container">
        {/* PC List */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {pcImages.map((image, index) => (
            <div key={index} className="item relative overflow-hidden rounded-lg">
              <Link href={image.link} passHref>
                <Image
                  src={image.src}
                  width={300}
                  height={300}
                  alt={`collection ${index + 1}`}
                  className="h-full w-full object-cover duration-500 bg-gray-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-1 text-center">
                  <span className="text-white font-bold">{image.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile List */}
        <div className="grid grid-cols-3 gap-4 md:hidden">
          {mobileImages.map((image, index) => (
            <div key={index} className="item relative overflow-hidden rounded-lg">
              <Link href={image.link} passHref>
                <Image
                  src={image.src}
                  width={300}
                  height={300}
                  alt={`collection ${index + 1}`}
                  className="h-full w-full object-cover duration-500 bg-gray-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-1 text-center">
                  <span className="text-white font-bold">{image.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
