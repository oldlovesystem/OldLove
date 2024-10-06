import { AddToCart } from 'components/cart/add-to-cart';
import React from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  console.log(product);

  const getDeliveryRange = () => {
    const today = new Date(); // Get the current date
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Start from tomorrow
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10); // 10 days from today

    // Format the start and end dates to 'DD Month' format
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }; // Correctly typed options
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    return `${formattedStartDate} - ${formattedEndDate}`; // Return the formatted range
  };

  const deliveryRange = getDeliveryRange(); // Get the delivery range

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 ">
        <h1 className="mb-2 text-xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full  p-2 text-sm text-black">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <div className='font-bold uppercase '>Description</div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm text-black "
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
      <div className="more-info mt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Icon.ArrowClockwise className='body1' />
            <div className="text-title">Delivery & Return</div>
          </div>
          <div className="flex items-center gap-1">
            <Icon.Question className='body1' />
            <div className="text-title">Ask A Question</div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Icon.Timer className='body1' />
          <div className="text-title">Estimated Delivery:</div>
          <div className="text-secondary">{deliveryRange}</div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Icon.Eye className='body1' />
          <div className="text-title">38</div>
          <div className="text-secondary">people viewing this product right now!</div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <div className="text-title">Tag:</div>
          <div className="text-secondary">{product.tags}</div>
        </div>
      </div>
    </>
  );
}
