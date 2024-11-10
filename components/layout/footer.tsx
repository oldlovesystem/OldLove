import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { AiFillFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div id="footer" className="footer font-tenor-sans">
                <div className="footer-main bg-white mt-10 ">
                    <div className="container">
                        <hr className="mt-5" />
                        <div className="content-footer py-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
                            <div className="company-infor p-4 flex flex-col">
                                <p className="uppercase font-bold pb-3 ">Customer Care</p>
                                <div className="flex flex-col mt-3">
                                    <span className="text-button">Mail:</span>
                                    <span>support@oldlove.in</span>
                                </div>
                            </div>

                            {/* Get to Know Us Section */}
                            <div className="get-to-know-us p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3">Get to know us</div>
                                <Link className="caption1 has-line-before duration-300 w-fit" href="/contact">Contact us</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/my-account">My Account</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/my-account">Order & Returns</Link>
                            </div>

                            {/* Customer Services Section */}
                            <div className="customer-services p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3">Customer Services</div>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Shipping</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Privacy Policy</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Return & Refund</Link>
                            </div>

                            {/* Track/Return Exchange Order Section */}
                            <div className="track-return p-4 flex flex-col">
                                <div className="uppercase font-bold pb-3 font-tenor-sans ">TRACK OR RETURN/EXCHANGE ORDER</div>
                                <Link className="caption1 has-line-before duration-300 w-fit" href="/trackorder">Track Order</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/returnexchange">Place Return/Exchange Request</Link>
                                <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/policy">Returns/Exchange Policy</Link>
                            </div>

                            {/* Newsletter Section */}
                            <div className="newsletter p-4 flex flex-col col-span-1 sm:col-span-2 lg:col-span-1">
                                <div className="uppercase font-bold pb-3 font-tenor-sans">Newsletter</div>
                                <div className="caption1 mt-3">Sign up for our newsletter and get 10% off your first purchase</div>
                                <div className="input-block w-full h-[52px] mt-4">
                                    <form className="w-full h-full relative" action="post">
                                        <input type="email" placeholder="Enter your e-mail" className="caption1 w-full h-full pl-4 pr-14 rounded-xl border-gray-300 border-line" required />
                                        <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                                            <Icon.ArrowRight size={24} color="#fff" />
                                        </button>
                                    </form>
                                </div>
                                <div className="list-social flex items-center gap-6 mt-4">
                                    <Link href="https://www.facebook.com/people/Old-Love/61566655953803/" target="_blank">
                                    <Image width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVR4nO2ZsUrDUBSGv0W6Fpx9B8fqoq2uHYq6iIOTQ7O5ukjrG+ioxsUu4uoi4iKIbxAo6ObiIuLmEAlkKJdcvMm1zUl6Pvi33MP5OOk9kIKiKErd2ABC4L6khEDHV+IEiIVk4DOJWFjaRUSuBDQeG7ksIvJgFBkBBzPOyOgh6Sk3j0aRgNkTGD0kPeVGReZhIovAEfAEfKR1v4B3YAzcVkGkC3z+cStF0kWSnfTjcL1GkkUWgFfHPRFJFunlWHiRZJEzS9PfwBDYBjbTrEoWubOI7DmcDSSJPFtElqom8mIRaTqcDVRkgrmeyAqwY2RsEdnPeLZl1OuXJXKTY2dk5VTKRHxFDusi0quLyHJdRJpVvLV2jee2MuqVdmvl2SONumz2hsPZQEUm0IkY6KuF/kam8xH7zXJr9R3OXv/HR+zQc0tPIxdFRDoCGo+NrFOQgYDm4zTHeNJOR1rWn6HnwJqvhKIoCqL4Bedg+4wWlDNCAAAAAElFTkSuQmCC" alt="facebook"/>
                                    </Link>
                                    <Link href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D" target="_blank">
                                        <FaInstagram className="text-2xl" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom Section */}
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="copyright caption1 text-secondary">©2024 OldLove. All Rights Reserved.</div>
                                <div className="select-block flex items-center gap-5 max-md:hidden">
                                    <div className="choose-language flex items-center gap-1.5">
                                        <select name="language" id="chooseLanguageFooter" className="caption2 bg-transparent">
                                            <option value="English">English</option>
                                        </select>
                                        <Icon.CaretDown size={12} color="#1F1F1F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
