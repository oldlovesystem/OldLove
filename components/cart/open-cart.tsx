import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className={`relative flex h-11 w-11 items-center justify-center transition-colors  rounded-full ${className}`}>
      <Icon.Handbag 
        className='text-3xl transition-all ease-in-out hover:scale-110'
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-0 h-5 w-5 rounded-full bg-gray-900 text-[11px] font-medium text-white flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
