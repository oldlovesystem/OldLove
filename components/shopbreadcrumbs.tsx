'use client'; // Ensure this is a client component

import React from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname for path access

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  // Safely handle undefined by providing a default empty string
  const pathSegments: string[] = pathname ? pathname.split('/').filter((segment) => segment) : [];

  // Define heading and subheading with checks
  const heading = pathSegments.length > 0 ? pathSegments[0].replace('-', ' ') : 'Home';
  const subHeading = pathSegments.length > 1 ? pathSegments[1].replace('-', ' ') : 'All'; // Set to "ALL" if undefined or empty

  return (
    <div className="breadcrumb-block style-shared">
      <div className="breadcrumb-main overflow-hidden">
        <div className="container relative pb-7 pt-7 lg:pt-[20px]">
          <div className="main-content relative z-[1] flex h-full w-full flex-col items-center justify-center">
            <div className="text-content">
              <div className="heading2 font-tenor-sans text-center uppercase">{heading}</div>
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
};

export default Breadcrumb;
