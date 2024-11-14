'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import React, { useState, useEffect } from 'react';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { FaShareAlt, FaTruck, FaHeart } from 'react-icons/fa';
import SizeChartModal from '../sizechat';

export function ProductDescription({ product }: { product: Product }) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // Check if email is available in localStorage
    const storedEmail = localStorage.getItem('customeremail');
    if (storedEmail) {
      setEmail(storedEmail);
      checkWishlist(storedEmail, product.id); // Check if the product is in the wishlist
    }
  }, [product.id]);

  const checkWishlist = async (email: string, productId: string) => {
    try {
      const response = await fetch(`https://cancelorder.vercel.app/wishlist?email=${email}&productId=${productId}`);
      const data = await response.json();
      setIsInWishlist(data.isWishlist); // Set wishlist status
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!email) {
      setShowLoginPopup(true); // Show login popup if no email is available
      return;
    }

    try {
      const response = await fetch('https://cancelorder.vercel.app/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId: product.id }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setIsInWishlist(true);
       
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!email) {
      setShowLoginPopup(true); // Show login popup if no email is available
      return;
    }

    try {
      const response = await fetch('https://cancelorder.vercel.app/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId: product.id }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setIsInWishlist(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUzNTY5NTUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzMyMTk5MDUzLCJqdGkiOiIxelNpSXJNeTNLT1RMS2J4IiwiaWF0IjoxNzMxMzM1MDUzLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczMTMzNTA1MywiY2lkIjo1MDMwMjEwLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.fIY1yVJlhlmiMICRNiAGBvaGBfiOAxF1ukZV29xUjbU`
          }
        }
      );

      const data = await response.json();
      if (data.data?.available_courier_companies?.length > 0) {
        const estimatedDays = parseInt(data.data.available_courier_companies[0].estimated_delivery_days, 10);
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
        <div className='text-xs'>
          <p className="mb-4 text-xs">
            Welcome to OLDLOVE&#39;s delivery policy...
          </p>
        </div>
      )
    },
    {
      title: 'Returns',
      content: (
        <>
          <p className="mb-4 text-xs">Our return policy...</p>
        </>
      )
    },
    {
      title: 'Exchange',
      content: (
        <>
          <p className="mb-4 text-xs">Exchange details...</p>
        </>
      )
    },
    {
      title: 'Wash Care',
      content: 'Machine wash cold with like colors. Do not bleach.'
    },
    {
      title: 'Manufactured & Marketed by',
      content: (
        <div className="text-xs">
          <p className="text-xs font-semibold">Nandi International</p>
          <p className="font-tenor-sans text-xs">National Park Road, Bengaluru</p>
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

        {/* Product Description */}
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

        {/* Wishlist Button */}
        

        {/* Share Button */}
        <div className="flex items-center mt-4">
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

      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="flex-1">
          <VariantSelector options={product.options} variants={product.variants} />
        </div>

        <div className="mt-4 mb-5 lg:mt-10 lg:ml-4">
          <button
            onClick={() => setIsSizeChartOpen(true)}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 w-full lg:w-auto"
          >
            View Size Chart
          </button>
        </div>
      </div>
      <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
      <AddToCart product={product} />
      <div className="mt-4">
  <button
    onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
    className={`flex items-center justify-center space-x-2 w-full py-4 px-4 rounded-lg transition duration-300 
      ${isInWishlist ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 border  hover:bg-gray-300'}
    `}
  >
    <FaHeart
      className={`text-3xl  broder border-gray-800 transition duration-100 ${isInWishlist ? 'text-red-500' : ' text-gray-500 p-1 rounded-full'}`} 
    />
    <span className="text-sm font-medium">{isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
  </button>
</div>
      <div className="more-info mt-6 font-tenor-sans">
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
                <p className="text-xs text-gray-600">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delivery Estimate */}
      <div className="mt-6 w-full px-4 py-2 border border-gray-100 hover:shadow-lg rounded">
        <label className="mb-2 block text-sm">
          Enter your postal code for delivery estimate:
        </label>
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="flex-grow rounded border border-gray-500 p-2 focus:ring-0"
            placeholder="e.g., 560083"
          />
          <button
            onClick={fetchDeliveryEstimate}
            className="flex items-center space-x-2 rounded bg-black p-2 text-white hover:bg-gray-800 transform hover:scale-105 transition-all"
          >
            <span>Check</span>
          </button>
        </div>

        {estimatedDelivery && (
          <div className="mt-4 p-2 border rounded-md shadow-lg bg-gray-50">
            <p className="text-gray-800 flex items-center text-sm font-tenor-sans">
              <FaTruck className="mr-2" />
              {estimatedDelivery}
            </p>
          </div>
        )}
      </div>


      {showLoginPopup && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md shadow-lg relative">
      {/* Close button */}
      <button
        onClick={() => setShowLoginPopup(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        ✕
      </button>
      
      <h2 className="text-xl font-semibold">Please log in</h2>
      <p className="text-sm mb-4">You need to log in to add items to your wishlist.</p>
      <button
        onClick={handleLoginRedirect}
        className="bg-black text-white py-2 px-4 rounded"
      >
        Log In
      </button>
    </div>
  </div>
)}

    </>
  );
}
