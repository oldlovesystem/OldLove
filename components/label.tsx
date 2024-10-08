import clsx from 'clsx';
import Price from './price';

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
  return (
    <div
      className={clsx(' -bottom-2 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className=" items-center  p-1 text-xs font-semibold text-black ">
        <h3 className="line-clamp-2 product-origin-price caption1 text-secondary2">{title}</h3>
        <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title">${amount}0</div>          
                 </div>
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
