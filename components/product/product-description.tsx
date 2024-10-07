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
    const today = new Date(); 
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); 
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10); 
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }; // Correctly typed options
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    return `${formattedStartDate} - ${formattedEndDate}`; // Return the formatted range
  };

  const deliveryRange = getDeliveryRange(); // Get the delivery range

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 ">
        <p className='uppercase text-gray-400 mb-2'>{product.tags}</p>
        <h1 className="mb-2 text-2xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full p-2 text-sm text-black flex items-center">
  <span className="font-semibold text-2xl">
    ₹{product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
  </span>

  <div className="mx-2 h-6 ml-2 border-l border-gray-300"></div>

  <span className="ml-2 text-gray-400 line-through">
    ₹{(+product.priceRange.maxVariantPrice.amount + 100).toFixed(2)} {product.priceRange.maxVariantPrice.currencyCode}
  </span>

  {/* Calculate Discount Percentage */}
  {(() => {
    const originalPrice = +product.priceRange.maxVariantPrice.amount + 100;
    const currentPrice = +product.priceRange.maxVariantPrice.amount;
    const discountPercentage = ((originalPrice - currentPrice) / originalPrice) * 100;
    
    return (
      <span className="ml-2 bg-[rgb(216,238,163)] text-black font-bold rounded-full px-4 text-xs py-1">
        - {discountPercentage.toFixed(0)}%
      </span>
    );
  })()}
</div>
<div className='font-bold uppercase mt-4 text-sm text-gray-600'></div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6  text-sm text-gray-600 "
          html={product.descriptionHtml}
        />
      ) : null}
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
     
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
