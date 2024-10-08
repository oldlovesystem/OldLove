import React from 'react'
import Image from 'next/image';

interface Props {
    props: string;
}

const Benefit: React.FC<Props> = ({ props }) => {
    return (
        <>
            <div className="container flex justify-center items-center">
                <div className={`benefit-block ${props}`}>
                    <div className="list-benefit grid lg:grid-cols-3 grid-cols-1 gap-[30px] justify-center text-center items-center">
                        <div className="benefit-item flex flex-col items-center justify-center">
                        <i className="icon-phone-call lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">24/7 Customer Service</div>
                            <div className="caption1 text-secondary text-center mt-3">We&apos;re here to help you with any questions or concerns you have, 24/7.</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <i className="icon-guarantee lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">Our Guarantee</div>
                            <div className="caption1 text-secondary text-center mt-3">We stand behind our products and services and guarantee your satisfaction.</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <i className="icon-delivery-truck lg:text-7xl text-5xl"></i>
                            <div className="heading6 text-center mt-5">Shipping All over India</div>
                            <div className="caption1 text-secondary text-center mt-3">We ship our products through out India, making them accessible to customers everywhere.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit;
