'use client'
import React from 'react'
import Image from 'next/image';
import Benefit from '../../components/Benefit'
import Breadcrumb from 'components/Breadcrumb';


const AboutUs = () => {
    return (
        <>  
        <div id="header" className='relative w-full'>
               <Breadcrumb heading='About Us' subHeading='About Us' />
          </div>
            <div className='about md:pt-20 pt-10 '>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                           <div className="content md:w-5/6 w-full">
                                <div className="heading3 text-center">Old Love</div>
                                <div className="body1 text-center md:mt-7 mt-5">Welcome to OLD LOVE, where style meets comfort. Our journey began
with a passion for timeless fashion and a vision to provide men with
quality clothing that exudes confidence. At OLD LOVE, we take pride in
curating a collection that reflects sophistication and modern elegance.
Discover the perfect blend of craftsmanship and contemporary design
as we redefine men's fashion. Our team is dedicated to delivering
exceptional service, ensuring that every customer feels empowered
and inspired by their wardrobe choices.
Explore our story to uncover the inspiration behind OLD LOVE and join
us in celebrating individuality and sartorial expression. Embrace the
essence of sophistication with OLD LOVE Menswear.</div>
                            </div>
                        </div>
                        <div className="list-img grid sm:grid-cols-3 gap-[30px] md:pt-20 pt-10">
                            <div className="bg-img">
                                <Image
                                    src={'/FormalShirt.webp'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/PrintedShirt.webp'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/4M6A2498.JPG'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Benefit props="md:pt-20 pt-10" />
        </>
    )
}

export default AboutUs