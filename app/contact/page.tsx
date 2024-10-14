'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from 'components/Breadcrumb';

const ContactUs = () => {
    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Contact Us' subHeading='About Us' />
            </div>

            <div className='contact-us md:py-20 py-10 flex items-center justify-center'>
                <div className="container">
                    <div className="flex justify-center max-lg:flex-col gap-y-10">
                        <div className="left lg:w-2/3 lg:pr-4">
                            <div className="heading3 text-center">Drop Us A Line</div>
                            <div className="body1 text-secondary2 mt-3 text-center">Use the form below to get in touch with the sales team</div>
                            <form className="md:mt-6 mt-4">
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5'>
                                    <div className="name">
                                        <input className="border-line border-gray-400 px-4 py-3 w-full rounded-lg" id="username" type="text" placeholder="Your Name *" required />
                                    </div>
                                    <div className="email">
                                        <input className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" id="email" type="email" placeholder="Your Email *" required />
                                    </div>
                                    <div className="phone_number">
                                        <input className="border-line px-4 border-gray-400 py-3 w-full rounded-lg" id="phone_number" type="number" placeholder="Your Phone Number *" required />
                                    </div>
                                    <div className="order_id">
                                        <input className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" id="order_id" type="text" placeholder="Order Id *" required />
                                    </div>
                                    <div className="message sm:col-span-2">
                                        <textarea className="border-line px-4 border-gray-400 pt-3 pb-3 w-full rounded-lg" id="message" rows={3} placeholder="Your Message *" required />
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4 text-center">
                                    <button className="button-main">Send message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;
