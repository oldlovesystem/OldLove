import React from 'react';
import Image from 'next/image';

interface Props {
  props: string;
}

const Benefit: React.FC<Props> = ({ props }) => {
  return (
    <div className="font-tenor-sans container flex justify-center pt-2 mt-2 font-bold">
      <div className={`benefit-block ${props} w-full`}>
        <div className="list-benefit flex justify-evenly items-center w-full">
          {/* Benefit Item 1 */}
          <div className="benefit-item flex flex-col items-center justify-center">
            <img
              src="/benfits/Shipping.png"
              alt="handle-with-care"
              className="w-9 h-9 lg:w-14 lg:h-14"
            />
            <div className="text-xs md:text-2xl mt-5 text-center font-bold">Free Shipping</div>
          </div>

          {/* Benefit Item 2 */}
          <div className="benefit-item flex flex-col items-center justify-center">
          <img
  src="/benfits/security.png"
  alt="security-checked--v1"
  width="50"
  height="50"
  className="w-9 h-9 lg:w-14 lg:h-14"
/>
            <div className="text-xs md:text-2xl mt-5 text-center">Our Guarantee</div>
          </div>

          {/* Benefit Item 3 */}
          <div className="benefit-item flex flex-col items-center justify-center">
            <img
              src="/return.png"
              alt="online-support--v1"
              className="w-9 h-9 lg:w-14 lg:h-14"
            />
            <div className="text-xs md:text-2xl mt-5 text-center">Easy Returns</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
