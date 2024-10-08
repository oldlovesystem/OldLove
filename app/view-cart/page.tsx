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
import { useFormStatus } from 'react-dom';
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
        <Breadcrumb heading='Contact Us' subHeading='Shopping cart' />
      </div>

      <div className="container mx-auto p-6 flex">
        
        <div className="w-2/3">
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
                <div className="heading bg-surface rounded-4 pt-4 pb-4">
                  <div className="flex">
                    <div className="w-1/2">
                      <div className="text-button text-center">Products</div>
                    </div>
                    <div className="w-1/12">
                      <div className="text-button text-center">Price</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Quantity</div>
                    </div>
                    <div className="w-1/6">
                      <div className="text-button text-center">Total Price</div>
                    </div>
                  </div>
                </div>

                <ul>
                  {cart.lines.map((item, index) => {
                    const merchandiseUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams());
                    const totalPrice = item.cost.totalAmount.amount;

                    return (
                      <li key={index} className="flex items-center border-b border-neutral-300 p-4">
                        <div className="w-1/2 flex items-center">
                          <div className="relative h-24 w-24 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                            <Image
                              className="h-full w-full object-contain"
                              width={100} 
                              height={100} 
                              alt={item.merchandise.product.title}
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>
                          <Link href={merchandiseUrl} className="ml-4 flex flex-col">
                            <span className="font-medium">{item.merchandise.product.title}</span>
                            {item.merchandise.title !== 'Default Option' && (
                              <p className="text-sm text-neutral-500">{item.merchandise.title}</p>
                            )}
                          </Link>
                        </div>
                        <div className="w-1/12 price flex items-center justify-center">
                          <div className="text-title text-center">
                            <Price amount={String(item.cost.totalAmount.amount)} currencyCode={item.cost.totalAmount.currencyCode} />
                          </div>
                        </div>
                        <div className="w-1/6 flex items-center justify-center">
                          <div className="quantity-block bg-surface p-2 flex items-center justify-between rounded-lg border border-line">
                            <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                            <div className="text-button quantity">{item.quantity}</div>
                            <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                          </div>
                        </div>
                        <div className="w-1/6 flex items-center justify-center">
                          <div className="text-title text-center">
                            <Price amount={String(totalPrice)} currencyCode={item.cost.totalAmount.currencyCode} />
                          </div>
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
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

        <div className="w-1/3 pl-6 bg-gray-100 rounded-xl ml-2 pr-6">
          <div className="checkout-block bg-surface p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">Order Summary</h2>
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
            <div className="discount-block py-5 flex justify-between border-b border-line">
              <div className="text-title">Taxes</div>
              <div className="text-title">
                {cart && Number(cart.cost.totalTaxAmount.amount) > 0 ? (
                  <Price amount={String(cart.cost.totalTaxAmount.amount)} currencyCode={cart.cost.totalTaxAmount.currencyCode} />
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>
            <div className="shipping-block py-5 flex justify-between border-b border-line">
              <div className="text-title">Shipping</div>
              <div className="text-title">Calculated at checkout</div>
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
          </div>
        </div>
      </div>
    </>
  );
}
