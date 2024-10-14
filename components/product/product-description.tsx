"use client";
import { AddToCart } from 'components/cart/add-to-cart';
import React, { useState } from 'react';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for description expansion

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  

  
  const dropdownItems = [
    {
      title: "Size and Fit",
      content: "Size - Modal Height - 6.1 ft , Chest - 40 , Waist - 32 / 33 , Shoe - 44 , & he is wearning L size"
    },
    {
      title: "Shipping",
      content: (
        <ul className="list-disc pl-6">
          <li>₹100 shipping charges will be charged on orders below ₹1500.</li>
          <li>For international orders, customs duties may be levied at the time of delivery in certain countries.</li>
          <li>Products are shipped from our warehouse within 4 working days.</li>
          <li>The order will be delivered in 10 working days.</li>
          <li>You will receive an order tracking number as soon as we ship your order.</li>
        </ul>
      )
    },
    {
      title: "Returns",
      content: (
        <ul className="list-disc pl-6">
        <li>Exchange is not available for masks, boxers, socks, and products at or below ₹899.</li>
        <li>There is no additional charge for any exchange orders.</li>
        <li>For new orders of lower price, the balance amount will be refunded as a gift voucher.</li>
        <li>Size exchange is subject to availability.</li>
        <li>Please share the package unboxing video for wrong product received.</li>
      </ul>
      )
    },
    {
      title: "Exchange",
      content: (
        <ul className="list-disc pl-6">
        <li>We have a 7-day return policy (only for returnable products).</li>
        <li>Please ensure that the products you return are unused, unworn, and the original tags are intact.</li>
        <li>International orders are not eligible for return.</li>
        <li>Once the product is picked, a refund will be initiated in 3 working days for prepaid orders.</li>
        <li>Please share the package unboxing video for wrong product/missing item received.</li>
        <li>Do not hand over the product without a pick-up slip or SMS confirmation.</li>
        <li>Items purchased during sale are non-returnable.</li>
      </ul>
      )
    },
    {
      title: "Wash Care",
      content: "Machine wash cold with like colors. Do not bleach. Tumble dry low."
    },
    {
      title: " Manufacturing & Marketed by",
      content: (
        <div >
        <p className=' font-black'>Nandi International</p>
        <p>No 79/290 , National park road , Sampigehalli Village , near Sri Shyam Gaushala , Bannerughatta Post , Bengaluru - 560083</p>
        <p className='font-bold'>Country of Origin</p>
        <p>India</p>
      </div>
      )
    },
  ];

  // CSS for truncation
  const truncatedStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as 'vertical', // Cast to 'vertical'
    overflow: 'hidden',
    WebkitLineClamp: 2,
  };

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <p className="mb-2 uppercase text-gray-400 logofont">{product.tags}</p>
        <h1 className="mb-2 text-2xl font-medium  logofont">{product.title}</h1>
        <div className="mr-auto flex w-auto items-center rounded-full p-2 text-sm text-black">
          <span className="text-2xl font-semibold  logofont">
            ₹{product.priceRange.maxVariantPrice.amount}{' '}
            {product.priceRange.maxVariantPrice.currencyCode}
          </span>

          <div className="mx-2 ml-2 h-6 border-l border-gray-300"></div>

          <span className="ml-2 text-gray-400 line-through">
            ₹{(+product.priceRange.maxVariantPrice.amount + 100).toFixed(2)}{' '}
            {product.priceRange.maxVariantPrice.currencyCode}
          </span>
        </div>
        
        <div className="mt-4 text-sm font-bold uppercase text-gray-600"></div>
        
        {product.descriptionHtml ? (
          <div>
            <div
              className={`mb-6 text-sm text-gray-600  logofont ${isDescriptionExpanded ? '' : 'truncated'}`}
              style={isDescriptionExpanded ? {} : truncatedStyle}
            >
              <Prose html={product.descriptionHtml} />
            </div>
            <button
              onClick={toggleDescription}
              className="text-blue-500 hover:underline mb-2"
            >
              {isDescriptionExpanded ? 'See Less' : 'See More'}
            </button>
          </div>
        ) : null}
      </div>

      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />

      <div className="more-info mt-6  ">
        {dropdownItems.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <div
              className="flex cursor-pointer items-center justify-between py-2"
              onClick={() => toggleDropdown(index)}
            >
              <span className="text-lg py-2">{item.title}</span>
              <span className="text-lg">{openDropdown === index ? '-' : '+'}</span>
            </div>
            {openDropdown === index && (
              <div className="bg-white p-2">
                <p className="text-gray-600">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
