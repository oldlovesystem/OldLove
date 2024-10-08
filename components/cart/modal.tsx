'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 flex h-[96vh] mb-4 mt-2 w-full flex-col border-l md:mt-20 border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[500px] rounded-3xl mr-5">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold heading5">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col flex-grow overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(b.merchandise.product.title)
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams = {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        });

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li key={i} className="flex w-full flex-col border-neutral-300">
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-20 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                  <Image
                                    className="h-full w-full object-fill"
                                    width={100}
                                    height={100}
                                    alt={
                                      item.merchandise.product.featuredImage.altText ||
                                      item.merchandise.product.title
                                    }
                                    src={item.merchandise.product.featuredImage.url}
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-2 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !== DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">{item.quantity}</span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="flex flex-col justify-between mt-auto py-4 text-sm text-neutral-500">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p className='text-3xl font-bold text-black'>Total</p>
                      <Price
                        className="text-3xl font-bold text-black"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);
  const closeCart = () => setIsOpen(false);


  return (
    <div className='flex space-x-2'> 
      <button
        className="block w-full rounded-lg bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
      </button>
      <button
        className="block w-full rounded-lg bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
        onClick={closeCart}
      >
        <Link href="/view-cart" className="text-white hover:underline">View Cart</Link>
      </button>
    </div>
  );
}
