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

      <div className="container mx-auto flex flex-col p-4 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <h1 className="mb-4 text-2xl font-bold">Your Shopping Cart</h1>

          {!cart || cart.lines.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center">
              <img
  className="h-12"
  width="48"
  height="48"
  src="https://img.icons8.com/parakeet-line/96/shopping-cart.png"
  alt="shopping-cart"
/>

              <p className="mt-4 text-lg font-bold">Your cart is empty.</p>
              <Link href="/" className="mt-2 text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="list-product mt-5 w-full">
              <ul>
                {cart.lines.map((item, index) => {
                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams()
                  );
                  const totalPrice = item.cost.totalAmount.amount;

                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b border-neutral-300 py-4 lg:flex-row"
                    >
                      {/* Product Image */}
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-neutral-300 bg-neutral-300">
                        <img
  className="object-contain"
  width={80}
  height={80}
  alt={item.merchandise.product.title}
  src={item.merchandise.product.featuredImage.url}
/>
                        </div>
                      </div>

                      {/* Product Title */}
                      <div className="mt-2 flex-grow px-4 text-center sm:text-left lg:mt-0">
                        <Link href={merchandiseUrl}>
                          <span className="font-medium">{item.merchandise.product.title}</span>
                          {item.merchandise.title !== 'Default Option' && (
                            <span className="block text-xs text-neutral-500">
                              {item.merchandise.title}
                            </span>
                          )}
                        </Link>
                      </div>

                      {/* Quantity, Total Price, and Delete Button */}
                      <div className=" ">
                        <span>₹{totalPrice} </span>
                      </div>
                      <div className="mt-2 flex w-full flex-col items-center justify-between lg:mt-0 lg:w-auto lg:flex-row">
                        {/* Quantity */}
                        <div className="mx-4 flex items-center rounded-lg border border-gray-300 bg-gray-200 p-1 sm:p-2">
                          <EditItemQuantityButton
                            item={item}
                            type="minus"
                            optimisticUpdate={updateCartItem}
                          />
                          <div className="w-6 text-center text-xs sm:w-8 sm:text-sm">
                            {item.quantity}
                          </div>
                          <EditItemQuantityButton
                            item={item}
                            type="plus"
                            optimisticUpdate={updateCartItem}
                          />
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

        <div className="mt-6 w-full rounded-xl bg-gray-100 p-4 lg:ml-6 lg:w-1/3">
          <div className="checkout-block bg-surface rounded-xl px-2 py-4">
            <h2 className="py-2 text-lg font-semibold">Order Summary</h2>
            <div className="total-block flex justify-between border-b border-gray-300 py-4">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-sm font-medium">
                {cart && Number(cart.cost.totalAmount.amount) > 0 ? (
                  `${totalAmount} ${cart.cost.totalAmount.currencyCode}`
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </span>
            </div>
            <div className="total-cart-block flex justify-between pb-4 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                {totalAmount > 0 ? (
                  `${totalAmount} ${cart.cost.totalAmount.currencyCode}`
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </span>
            </div>
            <div className="block-button mt-4 flex flex-col items-center gap-y-4">
              <form
                action={redirectToCheckout}
                onSubmit={(e) => totalAmount <= 0 && e.preventDefault()}
              >
                <button
                  className={`button-main w-full rounded-lg bg-black px-8 py-3 text-sm font-medium text-white ${totalAmount <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                  type="submit"
                  disabled={totalAmount <= 0}
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
            <div className="mt-4 text-center font-medium">
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
