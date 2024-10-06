"use client";
import React, { useState, useEffect, useRef } from 'react';
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

// Import hover components
import ShopHoverContent from './ShopHoverContent';


const menu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/search/check-shirts' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = (itemTitle: string) => {
    if (itemTitle !== 'About Us') {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current); // Prevent closing if already hovering
      }
      setHoveredItem(itemTitle);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      setHoveredItem(null);
    }, 100); // Delay closing by 300ms
  };

  const renderHoverContent = () => {
    switch (hoveredItem) {
      case 'Shop':
        return <ShopHoverContent />;
    
      default:
        return null;
    }
  };

  return (
    <div className={`relative `}>
      <nav className={`header-menu style-one bg-linear  flex items-center justify-between p-4 lg:px-6 ${fixedHeader ? 'fixed top-0 left-0 right-0 z-10' : ''}`}>
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
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={item.title !== 'About Us' ? handleMouseLeave : undefined} // No leave handler for About Us
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    className={`
                      hover:text-black hover:underline hover:underline-offset-8 
                      ${pathname === item.path ? 'text-black underline underline-offset-8' : ''}
                    `}
                    onClick={item.title === 'About Us' ? () => setIsHovering(false) : undefined} // Close hover on click for About Us
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <CartModal />
            <Link href={"/reg"}>
            <Icon.User className="text-2xl" />
            </Link>
            <div className="hidden md:flex">
              <SpotlightSearch color="white" />
            </div>
          </div>
        </div>
      </nav>

      {hoveredItem && isHovering && (
        <div
          className="absolute left-0 right-0 top-full z-20"
          onMouseEnter={() => handleMouseEnter(hoveredItem)} // Keep it open when hovering over the content
          onMouseLeave={handleMouseLeave}
        >
          {renderHoverContent()}
        </div>
      )}
    </div>
  );
}
