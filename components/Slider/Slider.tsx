'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';

const Slider = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const sliderRef = useRef(null); 
  const [startTouch, setStartTouch] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); 
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  // Mobile Slider Slides
  const mobileSlides = [
    { href: '/search/republic-sale', src: '/Mobilebanner.jpg' },
    { href: '/search/formal-shirts', src: '/BannerMobile1.jpg' },
    { href: '/search/printed-shirts', src: '/BannerMobile3.jpg' }
  ];

  // Handle swipe start
  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    setStartTouch(touchStart);
  };

  // Handle swipe move
  const handleTouchMove = (e) => {
    if (startTouch === 0) return; // Ensure touch start is defined

    const touchMove = e.touches[0].clientX;
    const moveDifference = startTouch - touchMove;

    // Apply movement based on swipe direction
    if (Math.abs(moveDifference) > 50) {
      if (moveDifference > 0) {
        // Swiped left
        moveSlider('next');
      } else {
        // Swiped right
        moveSlider('prev');
      }
      setStartTouch(0); // Reset start touch
    }
  };

  // Handle swipe end
  const handleTouchEnd = () => {
    setStartTouch(0); // Reset start touch on swipe end
  };

  // Move the slider manually
  const moveSlider = (direction) => {
    const totalSlides = mobileSlides.length;

    let newIndex = currentIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalSlides; // Move to the next slide
    } else {
      newIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Move to the previous slide
    }

    setCurrentIndex(newIndex); // Update the current index
  };

  // Auto-slide for mobile horizontal slider
  useEffect(() => {
    if (isMobileView) {
      const interval = setInterval(() => {
        moveSlider('next');
      }, 3000); // Auto-slide every 3 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isMobileView, currentIndex]);

  return (
    <div className="slider">
      {isMobileView ? (
        // Mobile Horizontal Slider with manual swipe and seamless loop
        <div
          className="relative h-[55vh] w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={sliderRef}
            className="flex h-full flex-row transition-transform duration-700"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {mobileSlides.map((slide, index) => (
              <a key={index} href={slide.href} className="h-full w-full flex-shrink-0">
                <img
                  src={slide.src}
                  alt={`Mobile Slide ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      ) : (
        // PC Horizontal Swiper Slider
        <div className="slider">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 4000
            }}
          >
            {[
              { href: '/search/republic-sale', src: '/Banner4.png' },
              { href: '/search/formal-shirts', src: '/Banner1.png' },
              { href: '/search', src: '/Banner3.png' }
            ].map((slide, index) => (
              <SwiperSlide key={index}>
                <Link href={slide.href}>
                  <div className="image-container relative">
                    <img
                      src={slide.src}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      className="image"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Slider;
