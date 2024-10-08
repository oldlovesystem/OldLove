"use client"
import React, { useState, useEffect, useRef, Suspense } from 'react';
import CartModal from 'components/cart/modal';
import Image from 'next/image';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MobileMenu from './mobile-menu';
import SpotlightSearch from 'components/spotlight-search';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ShopHoverContent from './ShopHoverContent';

const menu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/search' },
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
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0);

      lastScrollY.current = scrollPosition;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (itemTitle: string) => {
    if (itemTitle !== 'About Us') {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setHoveredItem(itemTitle);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      setHoveredItem(null);
    }, 100);
  };

  const renderHoverContent = () => {
    switch (hoveredItem) {
      case 'Shop':
        return <ShopHoverContent />;
      default:
        return null;
    }
  };

  // Background color only changes when scrolled
  const backgroundColor = fixedHeader ? 'bg-linear' : 'bg-linear';

  return (
    <div className="relative">
      <nav className={`header-menu style-one flex items-center justify-between p-4 lg:px-6 ${fixedHeader ? 'top-0 left-0 right-0 z-10' : ''} ${backgroundColor}`}>
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

            <ul className="hidden md:flex mega-menu md:items-center gap-9 text-lg mr-3 ml-16 uppercase">
              {menu.map((item) => (
                <li
                  key={item.title}
                  className="relative group text-sm font-semibold"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={item.title !== 'About Us' ? handleMouseLeave : undefined}
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    className={`
                      hover:text-black hover:underline hover:underline-offset-8 
                      ${pathname === item.path ? 'text-black underline underline-offset-8' : ''}
                    `}
                    onClick={item.title === 'About Us' ? () => setIsHovering(false) : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <CartModal />
            <Link href={"/register"}>
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
          className={`absolute left-0 right-0 top-full z-20 transition-all duration-300 ease-in-out 
          ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          onMouseEnter={() => handleMouseEnter(hoveredItem)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`transition-transform duration-300 ease-in-out ${isHovering ? 'translate-y-0' : 'translate-y-2'}`}>
            {renderHoverContent()}
          </div>
        </div>
      )}
    </div>
  );
}
