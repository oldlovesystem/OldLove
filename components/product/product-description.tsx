'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import React, { useState } from 'react';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { FaShareAlt } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';

export function ProductDescription({ product }: { product: Product }) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const fetchDeliveryEstimate = async () => {
    try {
      const response = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=560083&delivery_postcode=${postcode}&cod=1&weight=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUzNTY5NTUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzMxMDg1NTgzLCJqdGkiOiJxdTVJVFEwWXNUVWwxZmlBIiwiaWF0IjoxNzMwMjIxNTgzLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczMDIyMTU4MywiY2lkIjo1MDMwMjEwLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.HZUcWNbBg2sIJn9hARA915_IHHWWwejTB7lDvfTtz6U`
          }
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.data?.available_courier_companies?.length > 0) {
        // Retrieve the estimated delivery days from the first available courier company
        const estimatedDays = parseInt(
          data.data.available_courier_companies[0].estimated_delivery_days,
          10
        );
        console.log(estimatedDays);
        const deliveryRange = `${estimatedDays} to ${estimatedDays + 2} days`;
        setEstimatedDelivery(`Estimated delivery in ${deliveryRange}`);
      } else {
        setEstimatedDelivery('No courier options available for this postcode.');
      }
    } catch (error) {
      console.error('Error fetching delivery estimate:', error);
      setEstimatedDelivery('Error fetching estimate');
    }
  };

  const dropdownItems = [
    {
      title: 'Size and Fit',
      content: 'Modal Height - 6.1 ft, Chest - 40, Waist - 32/33, Shoe - 44, & he is wearing L size'
    },
    {
      title: 'Shipping',
      content: (
        <ul className="list-disc pl-6">
          <li>₹100 shipping charges will be charged on orders below ₹1500.</li>
          <li>
            For international orders, customs duties may be levied at the time of delivery in
            certain countries.
          </li>
          <li>Products are shipped from our warehouse within 4 working days.</li>
          <li>The order will be delivered in 10 working days.</li>
          <li>You will receive an order tracking number as soon as we ship your order.</li>
        </ul>
      )
    },
    {
      title: 'Returns',
      content: (
        <ul className="list-disc pl-6">
          <li>
            Exchange is not available for masks, boxers, socks, and products at or below ₹899.
          </li>
          <li>There is no additional charge for any exchange orders.</li>
          <li>
            For new orders of lower price, the balance amount will be refunded as a gift voucher.
          </li>
          <li>Size exchange is subject to availability.</li>
          <li>Please share the package unboxing video for wrong product received.</li>
        </ul>
      )
    },
    {
      title: 'Exchange',
      content: (
        <ul className="list-disc pl-6">
          <li>We have a 7-day return policy (only for returnable products).</li>
          <li>
            Please ensure that the products you return are unused, unworn, and the original tags are
            intact.
          </li>
          <li>International orders are not eligible for return.</li>
          <li>
            Once the product is picked, a refund will be initiated in 3 working days for prepaid
            orders.
          </li>
          <li>Please share the package unboxing video for wrong product/missing item received.</li>
          <li>Do not hand over the product without a pick-up slip or SMS confirmation.</li>
          <li>Items purchased during sale are non-returnable.</li>
        </ul>
      )
    },
    {
      title: 'Wash Care',
      content: 'Machine wash cold with like colors. Do not bleach. Tumble dry low.'
    },
    {
      title: 'Manufactured & Marketed by',
      content: (
        <div className="">
          <p className="text-sm font-semibold">Nandi International</p>
          <p className="font-tenor-sans text-sm">
            National Park Road, Sampigehalli Village, near Sri Shyam Gaushala,
            Bannerughatta Post, Bengaluru - 560083
          </p>
          <p className="text-sm font-semibold">Country of Origin</p>
          <p className="text-sm">India</p>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 font-tenor-sans">
        <p className="font-tenor-sans mb-2 uppercase text-gray-400">{product.tags}</p>
        <h1 className="font-tenor-sans mb-2 text-2xl font-medium uppercase">{product.title}</h1>
        <div className="mr-auto flex w-auto items-center rounded-full text-sm text-black">
          <span className="font-tenor-sans text-2xl font-semibold">
            INR {Math.round(Number(product.priceRange.maxVariantPrice.amount))}{' '}
          </span>
        </div>

        {product.descriptionHtml ? (
          <div>
            <div
              className={` text-sm text-gray-600 ${isDescriptionExpanded ? '' : 'truncated'}`}
              style={
                isDescriptionExpanded
                  ? {}
                  : {
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 2
                    }
              }
            >
              <Prose html={product.descriptionHtml} />
            </div>
            <div className="mr-9 mt-1 flex items-center justify-between">
              <button onClick={toggleDescription} className="ml-auto text-xs hover:underline">
                {isDescriptionExpanded ? 'See Less' : 'See More'}
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center">
          <button
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({
                  title: product.title,
                  url: `https://oldlove.in/product/${product.handle}`
                });
              } else {
                await navigator.clipboard.writeText(`https://oldlove.in/product/${product.handle}`);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex text-sm hover:underline"
          >
            Share this product <FaShareAlt className="ml-2 mt-1" />
          </button>
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />

      <div className="more-info mt-6 ">
        {dropdownItems.map((item, index) => (
          <div key={index} className="border border-gray-100 px-4 text-gray-600">
            <div
              className="flex cursor-pointer items-center justify-between py-2"
              onClick={() => toggleDropdown(index)}
            >
              <span className="py-2 text-sm uppercase">{item.title}</span>
              <span className="text-sm">{openDropdown === index ? '-' : '+'}</span>
            </div>
            {openDropdown === index && (
              <div className="bg-white p-2">
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 w-full px-4  py-2 border border-gray-100 hover:shadow-lg rounded">
      <div className="mt-6 w-full ">
        <label className="mb-2 block text-sm ">
          Enter your postal code for delivery estimate:
        </label>
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="flex-grow rounded border border-gray-500 p-2 focus:ring-0 "
            placeholder="e.g., 560083"
          />
          <button
            onClick={fetchDeliveryEstimate}
            className="flex items-center space-x-2 rounded bg-black p-2 text-white hover:bg-gray-800 transform hover:scale-105 transition-all"
          >

            <span>Check</span>
          </button>
        </div>
      </div>

      {estimatedDelivery && (
        <div className="mt-4 p-2 border rounded-md shadow-lg bg-gray-50">
          <p className="text-gray-800 flex items-center text-sm font-tenor-sans">
            <FaTruck className="mr-2 " />
            {estimatedDelivery}
          </p>
        </div>
      )}
</div>
    </>
  );
}
