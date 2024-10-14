'use client'
import React from 'react';
import Image from 'next/image';
import Benefit from '../../components/Benefit';
import Breadcrumb from 'components/Breadcrumb';

const AboutUs = () => {
    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='About Us' subHeading='About Us' />
            </div>
            <div className='about pt-10 md:pt-5 '>
                <div className="about-us-block">
                    <div className="container flex flex-col md:flex-row items-center">
                        {/* Text Section */}
                        <div className="content md:w-1/2 w-full md:pr-10">
                            <div className="heading3 text-center md:text-left logofont uppercase text-5xl lg:text-3xl">Oldlove</div>
                            <div className="body1  md:text-justify md:mt-7 mt-5 text-justify">
                                Welcome to Oldlove, where style meets comfort. Our journey began with a passion for timeless fashion and a vision to provide men with quality clothing that exudes confidence. At Oldlove, we take pride in curating a collection that reflects sophistication and modern elegance. Discover the perfect blend of craftsmanship and contemporary design as we redefine men's fashion. Our team is dedicated to delivering exceptional service, ensuring that every customer feels empowered and inspired by their wardrobe choices. Explore our story to uncover the inspiration behind Oldlove and join us in celebrating individuality and sartorial expression. Embrace the essence of sophistication with Oldlove Menswear.
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start">

                            <div className="bg-img ">
                                <Image
                                    src={'/PrintedShirt.webp'}
                                    width={500}
                                    height={500}
                                    alt='Printed Shirt'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;
