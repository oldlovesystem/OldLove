import React from 'react';
import Link from 'next/link';

interface Pros {
  heading: string;
  subHeading: string;
}

const Breadcrumb: React.FC<Pros> = ({ heading, subHeading }) => {
  return (
    <>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main overflow-hidden">
          <div className="container relative pb-7 pt-7 lg:pt-[20px]">
            <div className="main-content relative z-[1] flex h-full w-full flex-col items-center justify-center">
              <div className="text-content">
                <div className="heading2 text-cente font-tenor-sans uppercase">{heading}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
