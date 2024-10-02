"use client"
import React, { useState, useEffect } from 'react';
import CartModal from 'components/cart/modal';
import Image from 'next/image';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MobileMenu from './mobile-menu';
import SpotlightSearch from 'components/spotlight-search';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const menu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Features', path: '/#!' },
  { title: 'Shop', path: '/shop' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
];
interface HoverContentProps {
  title: string;
}
const HoverContent: React.FC<HoverContentProps> = ({ title }) => (
  <div className="mt-2 w-full bg-white shadow-lg p-4 rounded">
    <h3 className="text-lg font-semibold">{title} Additional Content</h3>
    <p>This is the content that shows when hovering over {title}.</p>
  </div>
);

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative`}>
      <nav className={`header-menu style-one flex items-center justify-between p-4 lg:px-6 ${fixedHeader ? 'fixed top-0 left-0 right-0 z-10' : ''}`}>
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center w-auto ml-12">
            <Link href="/" prefetch={true} className="flex items-center justify-center">
              <Image src="/logo.png" alt="logo" width={50} height={30} />
              <div className="heading4 ml-2 text-black text-2xl font-medium uppercase">
                Old Love
              </div>
            </Link>

            <ul className="hidden md:flex md:items-center gap-9 text-lg mr-3 ml-16 uppercase">
              {menu.map((item) => (
                <li
                  key={item.title}
                  className="relative group text-sm font-semibold"
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    className={`
                      hover:text-black hover:underline hover:underline-offset-8 
                      ${pathname === item.path ? 'text-black underline underline-offset-8' : ''}
                    `}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
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

      {/* Hover Content Rendered Below Navbar */}
      {hoveredItem && (
        <HoverContent title={hoveredItem} />
      )}
    </div>
  );
}
