import clsx from 'clsx';
import React from 'react';

function formatAmountInINR(numericAmount: number) {
  // Use Intl.NumberFormat without currency style and manually prepend 'INR'
  return numericAmount.toLocaleString('en-IN');
}

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  const numericAmount = Number(amount); // Convert amount to a number

  return (
    <div
      className={clsx('-bottom-2 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="logo-font text-black">
        <h3 className="lg:text text-sm">{title}</h3>
        <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
          <div className="text-sm">
            INR {formatAmountInINR(numericAmount)}
          </div>
        </div>
        {/* Uncomment and use Price component if needed */}
        {/* <Price
          className="flex-none rounded-full"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        /> */}
      </div>
    </div>
  );
};

export default Label;
