'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Importing React icons for Instagram and Facebook
import Search, { SearchSkeleton } from './search';

export default function MobileMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-9 w-9 items-center justify-center text-black transition-colors md:hidden dark:border-neutral-700"
      >
        <Bars3Icon className="h-10" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
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
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-white">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                <div className="flex h-full flex-col">
                  {/* Scrollable List */}
                  <ul className="flex-grow overflow-y-auto pl-4 pr-4 font-light uppercase tracking-widest">
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/cargo-trousers"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Cargo Trousers
                      </Link>
                    </li>
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/casual-shirts"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Casual Shirts
                      </Link>
                    </li>
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/check-shirts"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Check Shirts
                      </Link>
                    </li>
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/formal-shirts"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Formal Shirts
                      </Link>
                    </li>
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/jeans"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Jeans
                      </Link>
                    </li>
                    <li className="w-full border-b border-gray-300 py-4">
                      <Link
                        href="/search/printed-shirts"
                        onClick={closeMobileMenu}
                        className="block h-full w-full"
                      >
                        Printed Shirts
                      </Link>
                    </li>
                    {/* Add more list items as needed */}
                  </ul>

                  {/* Fixed Social Media & Links Section */}
                  <div className="mt-auto flex flex-col space-y-4">
                    {/* Social Media Box */}
                    <div className="flex border-b border-t border-gray-300 p-4">
                      <div className="flex flex-1 items-center justify-center">
                        <a
                          href="https://www.instagram.com/oldlove.in/?igsh=MTE4bHNuZXk1d2Y3aA%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <FaInstagram className="h-8 w-8 text-center text-black" />
                        </a>
                      </div>
                      <div className="mx-4 h-8 border-l border-gray-300" /> {/* Vertical Line */}
                      <div className="flex flex-1 items-center justify-center">
                        <a
                          href="https://www.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <FaFacebook className="h-8 w-8 text-black" />
                        </a>
                      </div>
                    </div>

                    {/* About Us / Contact Us Box */}
                    <div className="flex border-b border-t border-gray-300 p-4">
                      <div className="flex flex-1 items-center justify-center">
                        <Link href="/about" onClick={closeMobileMenu}>
                          <div className="uppercase">About Us</div>
                        </Link>
                      </div>
                      <div className="mx-4 h-8 border-l border-gray-300" /> {/* Vertical Line */}
                      <div className="flex flex-1 items-center justify-center">
                        <Link href="/contact" onClick={closeMobileMenu}>
                          <div className="uppercase">Contact Us</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
