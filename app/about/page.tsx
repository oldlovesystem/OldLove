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
                                <div className="body1 text-center md:mt-7 mt-5">Kim Kardashian West needs no introduction. In the 14 years since she first graced our screens in Keeping Up With The Kardashians, she has built her KKW beauty empire, filmed her show, wrapped her show, become a billionaire, studied law, campaigned for the rights of death row inmates, travelled the world to attend events such as Paris Fashion Week, raised four children and launched her wildly successful shapewear brand SKIMS.</div>
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