'use client';

import { useEffect } from 'react';
import { useCart } from '../../components/cart/cart-context';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from 'components/Breadcrumb';
import { DeleteItemButton } from '../../components/cart/delete-item-button';
import { EditItemQuantityButton } from '../../components/cart/edit-item-quantity-button';
import { redirectToCheckout } from '../../components/cart/actions';

export default function ViewCart() {
  const { cart, updateCartItem } = useCart();

  useEffect(() => {
    if (!cart) {
      // Handle the case when the cart is empty or not initialized
    }
  }, [cart]);

  const totalAmount = cart ? Number(cart.cost.totalAmount.amount) : 0;

  return (
    <>
      <div id="header" className="relative w-full">
        <Breadcrumb heading="Shopping Cart" subHeading="Shopping cart" />
      </div>

      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <ShoppingCartIcon className="h-12" />
              <p className="mt-4 text-lg font-bold">Your cart is empty.</p>
              <Link href="/" className="mt-2 text-blue-600 hover:underline">Continue Shopping</Link>
            </div>
          ) : (
            <div className="list-product w-full mt-5">
              <ul>
                {cart.lines.map((item, index) => {
                  const merchandiseUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams());
                  const totalPrice = item.cost.totalAmount.amount;

                  return (
                    <li key={index} className="border-b border-neutral-300 py-4 flex flex-col lg:flex-row items-center justify-between">
                      {/* Product Image */}
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-neutral-300 bg-neutral-300">
                          <Image
                            className="object-contain"
                            width={80}
                            height={80}
                            alt={item.merchandise.product.title}
                            src={item.merchandise.product.featuredImage.url}
                          />
                        </div>
                      </div>

                      {/* Product Title */}
                      <div className="flex-grow text-center sm:text-left px-4 mt-2 lg:mt-0">
                        <Link href={merchandiseUrl}>
                          <span className="font-medium">{item.merchandise.product.title}</span>
                          {item.merchandise.title !== 'Default Option' && (
                            <span className="text-xs text-neutral-500 block">{item.merchandise.title}</span>
                          )}
                        </Link>
                      </div>

                      {/* Quantity, Total Price, and Delete Button */}
                      <div className="flex flex-col lg:flex-row items-center justify-between mt-2 lg:mt-0 w-full lg:w-auto">
                        {/* Quantity */}
                        <div className="flex items-center bg-gray-200 p-1 sm:p-2 rounded-lg border border-gray-300 mx-4">
                          <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                          <div className="text-center w-6 sm:w-8 text-xs sm:text-sm">{item.quantity}</div>
                          <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                        </div>

                        {/* Total Price */}
                        <div className="text-sm sm:text-base font-semibold mx-4">
                          <span>{totalPrice} {item.cost.totalAmount.currencyCode}</span>
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-center">
                          <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 bg-gray-100 rounded-xl p-4 mt-6 lg:ml-6">
          <div className="checkout-block bg-surface py-4 px-2 rounded-xl">
            <h2 className="text-lg font-semibold py-2">Order Summary</h2>
            <div className="total-block py-4 flex justify-between border-b border-gray-300">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-sm font-medium">
                {cart && Number(cart.cost.totalAmount.amount) > 0 ? (
                  `${totalAmount} ${cart.cost.totalAmount.currencyCode}`
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </span>
            </div>
            <div className="total-cart-block pt-4 pb-4 flex justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                {totalAmount > 0 ? (
                  `${totalAmount} ${cart.cost.totalAmount.currencyCode}`
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </span>
            </div>
            <div className="block-button flex flex-col items-center gap-y-4 mt-4">
              <form action={redirectToCheckout} onSubmit={(e) => totalAmount <= 0 && e.preventDefault()}>
                <button
                  className={`w-full bg-black px-8 py-3 text-sm font-medium text-white rounded-lg hover:opacity-90 ${totalAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={totalAmount <= 0}
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
            <div className="text-center mt-4 font-medium">
              <Link href="/" className="text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
