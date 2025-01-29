'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import * as Icon from '@phosphor-icons/react';
import { PiYoutubeLogoThin } from 'react-icons/pi';
import { CiLinkedin } from 'react-icons/ci';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <div id="footer" className="footer font-tenor-sans">
        <div className="footer-main mt-10 bg-white">
          <div className="container">
            <hr className="mt-5" />
            <div className="content-footer py-[60px]">
              {/* Mobile View: Dropdown */}
              <div className="sm:hidden">
                {/* Customer Care Section */}
                <div>
                  <div
                    onClick={() => toggleSection('customerCare')}
                    className="flex cursor-pointer items-center justify-between pb-3 font-bold uppercase"
                  >
                    Customer Care
                    <Icon.CaretDown
                      size={20}
                      className={`transition-transform ${openSection === 'customerCare' ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openSection === 'customerCare' && (
                    <div className="flex flex-col space-y-2 pl-4">
                      <span>Mail:</span>
                      <button
                        onClick={() => (window.location.href = 'mailto:support@oldlove.in')}
                        className="text-blue-500 underline"
                      >
                        support@oldlove.in
                      </button>
                    </div>
                  )}
                </div>

                {/* Get to Know Us Section */}
                <div>
                  <div
                    onClick={() => toggleSection('getToKnowUs')}
                    className="flex cursor-pointer items-center justify-between pb-3 font-bold uppercase"
                  >
                    Get to Know Us
                    <Icon.CaretDown
                      size={20}
                      className={`transition-transform ${openSection === 'getToKnowUs' ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openSection === 'getToKnowUs' && (
                    <div className="flex flex-col space-y-2 pl-4">
                      <Link href="/contact">Contact Us</Link>
                      <Link href="/my-account">My Account</Link>
                      <Link href="/my-account">Order & Returns</Link>
                    </div>
                  )}
                </div>

                {/* Customer Services Section */}
                <div>
                  <div
                    onClick={() => toggleSection('customerServices')}
                    className="flex cursor-pointer items-center justify-between pb-3 font-bold uppercase"
                  >
                    Customer Services
                    <Icon.CaretDown
                      size={20}
                      className={`transition-transform ${openSection === 'customerServices' ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openSection === 'customerServices' && (
                    <div className="flex flex-col space-y-2 pl-4">
                      <Link href="/policy">Shipping</Link>
                      <Link href="/policy">Privacy Policy</Link>
                      <Link href="/policy">Return & Refund</Link>
                    </div>
                  )}
                </div>

                {/* Track/Return Exchange Order Section */}
                <div>
                  <div
                    onClick={() => toggleSection('trackOrder')}
                    className="flex cursor-pointer items-center justify-between pb-3 font-bold uppercase"
                  >
                    Return/Exchange Order
                    <Icon.CaretDown
                      size={20}
                      className={`transition-transform ${openSection === 'trackOrder' ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openSection === 'trackOrder' && (
                    <div className="flex flex-col space-y-2 pl-4">
                      <Link href="/returnexchange">Place Return/Exchange Request</Link>
                      <Link href="/policy">Returns/Exchange Policy</Link>
                    </div>
                  )}
                </div>

                {/* Follow Us On Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between pb-3 font-bold uppercase">
                    Follow Us On
                  </div>
                  <div className="flex items-center gap-6 pl-4">
                    <Link
                      href="https://www.facebook.com/people/Old-Love/61566655953803/"
                      target="_blank"
                    >
                      <FaFacebookF className="text-xl text-blue-600" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D"
                      target="_blank"
                    >
                      <FaInstagram className="text-xl text-pink-500" />
                    </Link>
                    <Link
                      href="https://youtube.com/@oldloveindia?si=TmC1tcVLWeqp6HdS"
                      target="_blank"
                    >
                      <PiYoutubeLogoThin className="text-3xl text-red-600" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/old-love-1" target="_blank">
                      <CiLinkedin className="text-3xl text-blue-500" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:flex sm:flex-wrap sm:gap-4">
                {/* Customer Care Section */}
                <div className="company-infor flex flex-col p-4 sm:flex-1">
                  <p className="pb-3 font-bold uppercase">Customer Care</p>
                  <div className="mt-3 flex flex-col">
                    <span className="text-button">Mail:</span>
                  </div>
                  <div>
                    <button
                      onClick={() => (window.location.href = 'mailto:support@oldlove.in')}
                      className="text-blue-500 underline"
                    >
                      support@oldlove.in
                    </button>
                  </div>
                </div>

                {/* Get to Know Us Section */}
                <div className="get-to-know-us flex flex-col p-4 sm:flex-1">
                  <div className="pb-3 font-bold uppercase">Get to Know Us</div>
                  <Link href="/contact">Contact Us</Link>
                  <Link href="/my-account">My Account</Link>
                  <Link href="/my-account">Order & Returns</Link>
                </div>

                {/* Customer Services Section */}
                <div className="customer-services flex flex-col p-4 sm:flex-1">
                  <div className="pb-3 font-bold uppercase">Customer Services</div>
                  <Link href="/policy">Shipping</Link>
                  <Link href="/policy">Privacy Policy</Link>
                  <Link href="/policy">Return & Refund</Link>
                </div>

                {/* Track/Return Exchange Order Section */}
                <div className="track-return flex flex-col p-4 sm:flex-1">
                  <div className="pb-3 font-bold uppercase">Return/Exchange Order</div>
                  <Link href="/returnexchange">Place Return/Exchange Request</Link>
                  <Link href="/policy">Returns/Exchange Policy</Link>
                </div>

                {/* Follow Us On Section */}
                <div className="newsletter flex flex-col p-4 sm:flex-1">
                  <div className="pb-3 font-bold uppercase">Follow Us On</div>
                  <div className="list-social mt-4 flex items-center gap-6">
                    <Link
                      href="https://www.facebook.com/people/Old-Love/61566655953803/"
                      target="_blank"
                    >
                      <FaFacebookF className="text-xl text-blue-600" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D"
                      target="_blank"
                    >
                      <FaInstagram className="text-xl text-pink-500" />
                    </Link>
                    <Link
                      href="https://youtube.com/@oldloveindia?si=TmC1tcVLWeqp6HdS"
                      target="_blank"
                    >
                      <PiYoutubeLogoThin className="text-3xl text-red-600" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/old-love-1" target="_blank">
                      <CiLinkedin className="text-3xl text-blue-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom border-line flex items-center justify-between gap-5 border-t py-3 max-lg:flex-col max-lg:justify-center">
              <div className="left flex items-center gap-8">
                <div className="copyright caption1 text-secondary">
                  ©2024 OldLove. All Rights Reserved.
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
