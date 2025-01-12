'use client';

import React from 'react';
import useMediaQuery from '../Slider/useMediaQuery'; // Import the custom hook

const NewArrivalSlider = () => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Check for mobile screen size

  const imageSrc = isMobile
    ? '/banner/Mobile/BannerMobileNewArrival.jpg' // Mobile-specific image
    : '/banner/PC/Bannernewarrival.jpg';   // PC-specific image

  return (
    <div className="mt-4 mb-2">
      <div className="image-container relative">
        <a href="/search">
          <img
            src={imageSrc}
            alt="New Arrival Slide"
            className="image"
            style={{ width: '100%'}}
          />
        </a>
      </div>
    </div>
  );
};

export default NewArrivalSlider;
