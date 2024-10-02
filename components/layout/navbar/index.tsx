"use client"
import CartModal from 'components/cart/modal';
import Image from 'next/image';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MobileMenu from './mobile-menu';
import SpotlightSearch from 'components/spotlight-search';
import { usePathname } from 'next/navigation';

const { SITE_NAME } = process.env;

const menu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Features', path: '/#!' },
  { title: 'Shop', path: '/shop' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const collectionMenu: Menu[] = [
  { title: 'Shirts', path: '/shop/shirts' },
  { title: 'Jeans', path: '/shop/jeans' },
  { title: 'Cargo Pants', path: '/shop/cargo-pants' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center w-auto ml-12">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center"
          >
            <Image src={"/logo.png"} alt="logo" width={50} height={30} />
            <div className="heading4 ml-2 text-black text-2xl font-medium uppercase ">
              Old Love
            </div>
          </Link>
          
          {menu.length ? (
            <ul className="hidden md:flex md:items-center gap-9 text-lg mr-3 ml-16 uppercase">
              {menu.map((item: Menu) => (
                <li key={item.title} className="relative group text-sm font-semibold">
                  <Link
                    href={item.path}
                    prefetch={true}
                    className={`
                      hover:text-black  hover:underline hover:underline-offset-8 
                      ${pathname === item.path ? 'text-black underline underline-offset-8 ' : ''}
                    `}
                  >
                    {item.title}
                  </Link>

                  {item.title === 'Shop' && (
                    <div className=" absolute left-0 mt-2 hidden  p-4 bg-white border border-gray-200 shadow-lg group-hover:block ">
                      <h3 className=" text mb-2 text-gray-900">Collections</h3>
                      <div className="flex flex-col">
                        {collectionMenu.map((collection) => (
                          <Link
                            key={collection.title}
                            href={collection.path}
                            className="text text-gray-900 mb-2 hover:text-black"
                          >
                            {collection.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-center space-x-4">
          <CartModal />
          <Icon.User className="text-2xl" />
          <div className="hidden md:flex">
            <SpotlightSearch color="white" />
          </div>
        </div>
      </div>
    </nav>
  );
}
