"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation'; // Use usePathname for path access

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();

    // Safely handle undefined by providing a default empty string
    const pathSegments: string[] = pathname ? pathname.split('/').filter(segment => segment) : []; 

    // Define heading and subheading with checks
    const heading = pathSegments.length > 0 ? pathSegments[0].replace('-', ' ') : 'Home';
    const subHeading = pathSegments.length > 1 ? pathSegments[1].replace('-', ' ') : 'All'; // Set to "ALL" if undefined or empty

    return (
        <div className="breadcrumb-block style-shared">
            <div className="breadcrumb-main  overflow-hidden">
                <div className="container lg:pt-[20px] pt-7 pb-7 relative">
                    <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                        <div className="text-content">
                            <div className="heading2 text-center font-tenor-sans uppercase">{heading}</div>
                            {/* <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                <Link href={'/'} className='text-secondary2 hover:underline'>Homepage</Link>
                                <Icon.CaretRight size={14} className='text-secondary2' />
                                <div className='text-secondary2 capitalize'>{subHeading}</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
