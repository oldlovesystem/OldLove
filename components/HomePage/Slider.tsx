'use client';

import React from 'react';

const SliderOne = () => {
  return (
    <div className="slider">
      <div className="image-container relative">
        <a href="/search">
          <img
            src="/bannerlower.png"
            alt="Slide 1"
            className="image"
            style={{ width: '100%', height: 'auto' }}
          />
        </a>
      </div>
    </div>
  );
};

export default SliderOne;