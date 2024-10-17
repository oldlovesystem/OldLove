'use client';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import CartModal from 'components/cart/modal';
import Image from 'next/image';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import MobileMenu from './mobile-menu';
import SpotlightSearch from 'components/spotlight-search';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ShopHoverContent from './ShopHoverContent';

const menu: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/search' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' }
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const customerToken = localStorage.getItem('customerAccessToken');
    setIsLoggedIn(!!customerToken);
  }, []);
 
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

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/my-account'); // Redirect to "my-account" if logged in
    } else {
      router.push('/login'); // Redirect to "/login" if not logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerAccessToken');
    setIsLoggedIn(false);
    router.push('/login');
  };

  // Background color only changes when scrolled
  const backgroundColor = fixedHeader ? 'bg-white' : 'bg-white';

  return (
    <div className="relative">
      <nav
        className={`header-menu style-one flex items-center justify-between p-4 lg:px-6 ${fixedHeader ? 'left-0 right-0 top-0 z-10' : ''} ${backgroundColor}`}
      >
        <div className="block flex-none md:hidden mr-1">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="ml-2 xs:ml-3 flex w-auto items-center">
            <Link href="/" prefetch={true} className="flex items-center justify-center">
              <Image src="/updatedlog.svg" alt="logo" width={50} height={30}  className='md:ml-10' />
              <div className="logofont  ml-2 text-3xl font-bold uppercase text-black">
                OldLove
              </div>
            </Link>

            <ul className="mega-menu ml-16 mr-3 hidden gap-9 text-lg uppercase md:flex md:items-center">
              {menu.map((item) => (
                <li
                  key={item.title}
                  className="group relative text-sm font-semibold"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={item.title !== 'About Us' ? handleMouseLeave : undefined}
                >
                  <Link
                    href={item.path}
                    prefetch={true}
                    className={`hover:text-black hover:underline hover:underline-offset-8 ${pathname === item.path ? 'text-black underline underline-offset-8' : ''} `}
                    onClick={item.title === 'About Us' ? () => setIsHovering(false) : undefined}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center space-x-4 ml-3">
            <CartModal />

            <div
              className="relative"
              onMouseEnter={() => setProfileHover(true)}
              onMouseLeave={() => setProfileHover(false)}
            >
              <button onClick={handleProfileClick}>
                <Icon.User className="text-2xl mt-1" />
              </button>

              {profileHover && (
                <div className="absolute right-0 top-full z-20 w-64 rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-lg">
                  {isLoggedIn ? (
                    <button
                      className="block w-full rounded-md bg-black py-2 text-center font-semibold text-white transition hover:bg-gray-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="mb-2 block w-full rounded-md bg-black py-2 text-center font-semibold text-white transition hover:bg-gray-800">
                          Login
                        </button>
                      </Link>
                     
                        <div className="block w-full rounded-md text-sm py-2 text-center font-semibold text-black ">
                        <span className='text-gray-400 text-sm'> Don't have an account?</span> <Link href="/register" className='hover:underline'> Register</Link>
                        </div>
                      
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="hidden md:flex -mt-1">
              <SpotlightSearch color="white" />
            </div>
          </div>
        </div>
      </nav>

      {hoveredItem && isHovering && (
        <div
          className={`absolute left-0 right-0 top-full z-20 transition-all duration-300 ease-in-out ${isHovering ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
          onMouseEnter={() => handleMouseEnter(hoveredItem)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`transition-transform duration-300 ease-in-out ${isHovering ? 'translate-y-0' : 'translate-y-2'}`}
          >
            {renderHoverContent()}
          </div>
        </div>
      )}
    </div>
  );
}
