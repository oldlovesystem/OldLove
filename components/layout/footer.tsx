import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div id="footer" className='footer'>
                <div className="footer-main bg-white mt-10 logofont">
                    <div className="container">
                        <hr className='mt-5 '></hr>
                        <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
                            {/* Company Info Section */}
                            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                                <p className='text-button-uppercase pb-3'>Customer Care</p>
                                <div className='flex gap-3 mt-3'>
                                    <div className="flex flex-col ">
                                        <span className="text-button">Mail:</span>
                                        <span className="text-button mt-3">WhatsApp</span>
                                        <span className="text-button mt-3">Instagram</span>
                                    </div>
                                    <div className="flex flex-col ">
                                        <span>support@oldlove.in</span>
                                        <span className='mt-3'>+91 7996777369</span>
                                        <Link href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D" className='mt-3'>
                                            <span className='mt-3 text-blue-500'>OldLove</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content Section */}
                            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
                                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                                    {/* Get to Know Us Section */}
                                    <div className="item flex flex-col basis-1/2 ">
                                        <div className="text-button-uppercase pb-3">Get to know us</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit' href={'/pages/contact'}>Contact us</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/my-account'}>My Account</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/my-account'}>Order & Returns</Link>
                                    </div>
                                    {/* Customer Services Section */}
                                    <div className="item flex flex-col basis-1/2 ">
                                        <div className="text-button-uppercase pb-3">Customer Services</div>
                                        <Link className='caption1 has-line-before duration-300 w-fit' href={'/policy'}>Orders FAQs</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/policy'}>Shipping</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/policy'}>Privacy Policy</Link>
                                        <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/policy'}>Return & Refund</Link>
                                    </div>
                                </div>
                                
                                {/* Newsletter Section (Takes 1/3 Width) */}
                                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0 flex flex-col">
                                    <div className="text-button-uppercase">Newsletter</div>
                                    <div className="caption1 mt-3">Sign up for our newsletter and get 10% off your first purchase</div>
                                    <div className="input-block w-full h-[52px] mt-4">
                                        <form className='w-full h-full relative' action="post">
                                            <input type="email" placeholder='Enter your e-mail' className='caption1 w-full h-full pl-4 pr-14 rounded-xl border-gray-300 border-line' required />
                                            <button className='w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1'>
                                                <Icon.ArrowRight size={24} color='#fff' />
                                            </button>
                                        </form>
                                    </div>
                                    <div className="list-social flex items-center gap-6 mt-4">
                                        <Link href={'https://www.facebook.com/'} target='_blank'>
                                            <AiOutlineFacebook className='text-3xl' />
                                        </Link>
                                        <Link href={'https://www.instagram.com/'} target='_blank'>
                                            <FaInstagram className='text-2xl' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom Section */}
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="copyright caption1 text-secondary">©2024 OldLove. All Rights Reserved.</div>
                                <div className="select-block flex items-center gap-5 max-md:hidden">
                                    <div className="choose-language flex items-center gap-1.5">
                                        <select name="language" id="chooseLanguageFooter" className='caption2 bg-transparent'>
                                            <option value="English">English</option>
                                        </select>
                                        <Icon.CaretDown size={12} color='#1F1F1F' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
