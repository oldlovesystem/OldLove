import React from 'react'
import Image from 'next/image';
import { RiLoopRightLine } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

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
                        <RiLoopRightLine className='text-5xl font-thin' />
                            <div className="heading6 text-center mt-5">Fast Shipping & Easy Returns</div>
                            <div className="caption1 text-secondary text-center mt-3">Get Your Orders Delivered Quickly with Hassle-Free Returns.</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <MdLockOutline className='text-5xl font-thin'/>
                            <div className="heading6 text-center mt-5">Our Guarantee</div>
                            <div className="caption1 text-secondary text-center mt-3">Shop with Confidence: Your Payment Information is Safe</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <MdOutlineSupportAgent className='text-5xl font-thin' />
                            <div className="heading6 text-center mt-5">Dedicated Customer Support</div>
                            <div className="caption1 text-secondary text-center mt-3">We're Here to Assist You Every Step of the Way.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit;
