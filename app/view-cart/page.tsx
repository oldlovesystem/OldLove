'use client';

import { useEffect } from 'react';
import { useCart } from '../../components/cart/cart-context';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
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
      <div id="header" className='relative w-full'>
        <Breadcrumb heading='Shopping Cart' subHeading='Shopping cart' />
      </div>

      <div className="container mx-auto p-6 flex flex-col lg:flex-row">
        
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <ShoppingCartIcon className="h-16" />
              <p className="mt-6 text-xl font-bold">Your cart is empty.</p>
              <Link href="/" className="mt-4 text-blue-600 hover:underline">Continue Shopping</Link>
            </div>
          ) : (
            <div className="list-product w-full sm:mt-7 mt-5">
              <div className='w-full'>
                <div className="heading bg-surface rounded-4 pt-4 pb-4 hidden lg:block">
                  <div className="flex flex-col lg:flex-row lg:justify-between bg-gray-100 py-4 rounded-xl">
                    <div className="w-full lg:w-1/2">
                      <div className="text-button text-center ">Products</div>
                    </div>
                    <div className="w-1/4">
                      <div className="text-button text-center">Price</div>
                    </div>
                    <div className="w-1/4">
                      <div className="text-button text-center">Quantity</div>
                    </div>
                    <div className="w-1/4">
                      <div className="text-button text-center">Total Price</div>
                    </div>
                  </div>
                </div>

                <ul>
                  {cart.lines.map((item, index) => {
                    const merchandiseUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams());
                    const totalPrice = item.cost.totalAmount.amount;

                    return (
                      <li key={index} className="flex flex-col lg:flex-row items-center border-b border-neutral-300 p-4 space-y-4 lg:space-y-0 lg:space-x-6">
                        {/* Product Image */}
                        <div className="w-full lg:w-1/3 flex items-center justify-center">
                          <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-neutral-300 bg-neutral-300">
                            <Image
                              className="h-full w-full object-contain"
                              width={100} 
                              height={100} 
                              alt={item.merchandise.product.title}
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>
                        </div>
                        
                        {/* Product Title and Info */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center items-start">
                          <Link href={merchandiseUrl}>
                            <span className="font-medium  ml-10 md:pl-[160px] lg:pl-0 lg:ml-0">{item.merchandise.product.title}</span>
                            {item.merchandise.title !== 'Default Option' && (
                              <span className="text-sm text-neutral-500 px-5  md:px-5">{item.merchandise.title}</span>
                            )}
                          </Link>
                        </div>

                        {/* Price */}
                        <div className="w-full lg:w-1/4 text-center flex items-center justify-center">
                          <Price amount={String(item.cost.totalAmount.amount)} currencyCode={item.cost.totalAmount.currencyCode} />
                        </div>
                        
                        {/* Quantity */}
                        <div className="w-full lg:w-1/4 flex justify-center">
                          <div className="quantity-block flex items-center justify-between bg-gray-200 p-2 rounded-lg border border-gray-300">
                            <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                            <div className="text-center w-8">{item.quantity}</div>
                            <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="w-full lg:w-1/4 flex justify-center">
                          <Price amount={String(totalPrice)} currencyCode={item.cost.totalAmount.currencyCode} />
                        </div>

                        {/* Delete Button */}
                        <div className="w-full lg:w-1/12 flex justify-center">
                          <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 pl-0 lg:pl-6 bg-gray-100 rounded-xl ml-0 lg:ml-12 mt-6 lg:mt-14 pr-6">
          <div className="checkout-block bg-surface py-4 px-2 rounded-2xl">
            <h2 className="heading5 py-4">Order Summary</h2>
            <div className="total-block py-5 flex justify-between border-b border-line">
              <div className="text-title">Subtotal</div>
              <div className="text-title">
                {cart && Number(cart.cost.totalAmount.amount) > 0 ? (
                  <Price amount={String(cart.cost.totalAmount.amount)} currencyCode={cart.cost.totalAmount.currencyCode} />
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>
            <div className="total-cart-block pt-4 pb-4 flex justify-between">
              <div className="heading5">Total</div>
              <div className="heading5">
                {totalAmount > 0 ? (
                  <Price amount={String(totalAmount)} currencyCode={cart.cost.totalAmount.currencyCode} />
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>
            <div className="block-button flex flex-col items-center gap-y-4 mt-5">
              <form action={redirectToCheckout} onSubmit={(e) => totalAmount <= 0 && e.preventDefault()}>
                <button
                  className={`block w-full bg-black px-16 py-4 text-center text-sm font-medium text-white rounded-lg hover:opacity-90 ${totalAmount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={totalAmount <= 0}
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
            <div className='text-center mt-4 font-semibold'>
              <Link href="/">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
