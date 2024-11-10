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
            <div className="container flex justify-center items-center font-tenor-sans">
                <div className={`benefit-block ${props}`}>
                    <div className="list-benefit grid lg:grid-cols-3 grid-cols-1 gap-[30px] justify-center text-center items-center">
                    <div className="benefit-item flex flex-col items-center justify-center">
                        <Image width={50} height={50} className=""src="data:image/png;base64,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"  alt="security-checked"/>
                            <div className="heading6 text-center mt-5">Fast Shipping & Easy Returns</div>
                            <div className="caption1 text-secondary text-center mt-3">Shop with Confidence: Your Payment Information is Safe</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <Image width={50} height={50} src="data:image/png;base64,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" alt="security-checked--v1"/> 
                            <div className="heading6 text-center mt-5">Our Guarantee</div>
                            <div className="caption1 text-secondary text-center mt-3">Shop with Confidence: Your Payment Information is Safe</div>
                        </div>

                        <div className="benefit-item flex flex-col items-center justify-center">
                        <Image src="/support.png" width={50} height={50}  alt='return'/>
                            <div className="heading6 text-center mt-5">Dedicated Customer Support</div>
                            <div className="caption1 text-secondary text-center mt-3">We're Here to Assist You In Every Step of the Way.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit;
