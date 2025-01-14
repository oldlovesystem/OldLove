'use client';
import React from 'react';
import Breadcrumb from 'components/Breadcrumb';

const AboutUs = () => {
  return (
    <>
      <div id="header" className="font-tenor-sans relative w-full">
        <Breadcrumb heading="About Us" subHeading="About Us" />
      </div>
      <div className="about pt-10 md:pt-5">
        <div className="about-us-block">
          <div className="container flex flex-col items-center">
            <div className="mb-5 w-full">
              <img src="/Aboutus.jpg" alt="Oldlove" className="h-auto w-full object-cover" />
            </div>

            <div className="content w-full md:w-2/3 md:pr-10">
              <div className="heading3 font-tenor-sans text-center uppercase md:text-left md:text-2xl lg:text-3xl">
                The Story of Oldlove
              </div>
              <div className="body1 mt-5 text-justify md:mt-7">
                Welcome to Oldlove, where style meets comfort. Our journey began with a passion for
                timeless fashion and a vision to provide men with quality clothing that exudes
                confidence. At Oldlove, we take pride in curating a collection that reflects
                sophistication and modern elegance. Discover the perfect blend of craftsmanship and
                contemporary design as we redefine men's fashion. Our team is dedicated to
                delivering exceptional service, ensuring that every customer feels empowered and
                inspired by their wardrobe choices.
                <br />
                <br />
                Explore our story to uncover the inspiration behind Oldlove and join us in
                celebrating individuality and sartorial expression. Embrace the essence of
                sophistication with Oldlove Menswear.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
