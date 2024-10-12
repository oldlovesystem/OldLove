import { AddToCart } from 'components/cart/add-to-cart';
import React from 'react';
import * as Icon from '@phosphor-icons/react/dist/ssr';
// import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  // console.log('product varinat', product.variants);
  // console.log('product in product descripion compo', product);

  const getDeliveryRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const deliveryRange = getDeliveryRange(); // Get the delivery range

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <p className="mb-2 uppercase text-gray-400">{product.tags}</p>
        <h1 className="mb-2 text-2xl font-medium">{product.title}</h1>
        <div className="mr-auto flex w-auto items-center rounded-full p-2 text-sm text-black">
          <span className="text-2xl font-semibold">
            ₹{product.priceRange.maxVariantPrice.amount}{' '}
            {product.priceRange.maxVariantPrice.currencyCode}
          </span>

          <div className="mx-2 ml-2 h-6 border-l border-gray-300"></div>

          <span className="ml-2 text-gray-400 line-through">
            ₹{(+product.priceRange.maxVariantPrice.amount + 100).toFixed(2)}{' '}
            {product.priceRange.maxVariantPrice.currencyCode}
          </span>

          {(() => {
            const originalPrice = +product.priceRange.maxVariantPrice.amount + 100;
            const currentPrice = +product.priceRange.maxVariantPrice.amount;
            const discountPercentage = ((originalPrice - currentPrice) / originalPrice) * 100;

            return (
              <span className="ml-2 rounded-full bg-[rgb(216,238,163)] px-4 py-1 text-xs font-bold text-black">
                - {discountPercentage.toFixed(0)}%
              </span>
            );
          })()}
        </div>
        <div className="mt-4 text-sm font-bold uppercase text-gray-600"></div>
        {product.descriptionHtml ? (
          <Prose className="mb-6 text-sm text-gray-600" html={product.descriptionHtml} />
        ) : null}
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      <AddToCart product={product} />
      <div className="more-info mt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon.ArrowClockwise className="body1" />
            <div className="text-title">Delivery & Return</div>
          </div>
          <div className="flex items-center gap-1">
            <Icon.Question className="body1" />
            <div className="text-title">Ask A Question</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <Icon.Timer className="body1" />
          <div className="text-title">Estimated Delivery:</div>
          <div className="text-secondary">{deliveryRange}</div>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <Icon.Eye className="body1" />
          <div className="text-title">38</div>
          <div className="text-secondary">people viewing this product right now!</div>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <div className="text-title">Tag:</div>
          <div className="text-secondary">{product.tags}</div>
        </div>
      </div>
    </>
  );
}
