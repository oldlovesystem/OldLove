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
        <Dialog onClose={closeCart} className="fixed inset-0 z-50 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 mt-40 flex h-[99vh] flex-col border-l border-neutral-200 bg-white p-6 text-black backdrop-blur-sm md:w-[450px]">
              <div className="flex items-center justify-between">
                <p className="heading5 text-3xl font-semibold uppercase text-gray-900">Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>
              <hr className="border-t-1 my-2 border-gray-200" />

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-grow flex-col overflow-hidden p-1">
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
                              <div className="absolute z-40 -ml-1 -mt-2"></div>
                              <div className="flex flex-row w-full">
                                <div className="relative h-32 w-30 flex-shrink-0 overflow-hidden border border-neutral-300 bg-neutral-300">
                                  <Image
                                    className="h-full w-full object-fill"
                                    width={200}
                                    height={200}
                                    alt={
                                      item.merchandise.product.featuredImage.altText ||
                                      item.merchandise.product.title
                                    }
                                    src={item.merchandise.product.featuredImage.url}
                                  />
                                </div>
                                <div className="ml-2 flex flex-col flex-grow">
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                    className="z-30 flex-grow"
                                  >
                                    <span className="leading-tight text-base">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !== DEFAULT_OPTION ? (
                                      <p className="text-sm text-neutral-500">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                    <Price
                                      className="mt-2 text-sm"
                                      amount={item.cost.totalAmount.amount}
                                      currencyCode={item.cost.totalAmount.currencyCode}
                                    />
                                  </Link>
                                  <div className="mt-2 flex h-9 w-1/2 flex-row items-center border border-neutral-200">
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
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="mt-auto flex flex-col justify-between py-4 text-sm text-neutral-500">
                    <div className="mb-3 flex items-center justify-between border-t border-neutral-200 pb-1 pt-1">
                      <p className="mt-2 text-xl font-bold text-gray-700">Total</p>
                      <Price
                        className="text-xl font-bold text-black"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                    <form action={redirectToCheckout}>
                      <CheckoutButton closeCart={closeCart} />
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

function CheckoutButton({ closeCart }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex space-x-2">
      <button
        className="block w-full rounded-lg bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
      </button>
      <button
        className="block w-full rounded-lg bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="button" // Change type to button
        disabled={pending}
        onClick={() => {
          closeCart(); // Close the cart
          window.location.href = '/view-cart'; // Navigate to the view cart page
        }}
      >
        View Cart
      </button>
    </div>
  );
}
