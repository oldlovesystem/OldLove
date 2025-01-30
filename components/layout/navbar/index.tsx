'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import CartModal from 'components/cart/modal';
import Link from 'next/link';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import MobileMenu from './mobile-menu';
import { FaUser, FaBox } from 'react-icons/fa';
import SpotlightSearch from 'components/spotlight-search';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ShopHoverContent from './ShopHoverContent';
import { HiOutlineHome } from 'react-icons/hi2';
import { CiShop } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';

const menu = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/search' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' }
];
function BottomNav({ customerFirstName }: { customerFirstName: string | null }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-gray-200 bg-white py-2 shadow-lg md:hidden">
      <Link href="/" className="flex flex-col items-center text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"></path>
</svg>
        <span className="mt-1 text-xs">Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center text-gray-700">
      <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/48/shop.png" alt="shop"/>
        <span className="mt-1 text-xs">Shop</span>
      </Link>
      <Link href={'/wishlist'}>
        <CiHeart className="ml-2 text-3xl" />
        <span className="mt-1 text-xs">Wishlist</span>
      </Link>

      <Link href="/view-cart" className="flex flex-col items-center text-gray-700">
        <div className="mt-1">
          <CartModal />
        </div>
        <span className="-mt-1 text-xs">Bag</span>
      </Link>
    </div>
  );
}
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const profileHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerFirstName, setCustomerFirstName] = useState<string | null>(null);

  // Polling interval reference
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Start polling for user data
  const startPolling = () => {
    if (pollingRef.current) return; // Prevent multiple intervals
    pollingRef.current = setInterval(() => {
      const customerToken = localStorage.getItem('customerAccessToken');
      setIsLoggedIn(!!customerToken);

      const storedFirstName = localStorage.getItem('customerFirstName');
      setCustomerFirstName(storedFirstName);
    }, 200); // Check every 2 milliseconds
  };

  // Stop polling
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    startPolling();

    return () => {
      stopPolling();
    };
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
    }, 300);
  };

  const renderHoverContent = () => {
    switch (hoveredItem) {
      case 'Shop':
        return <ShopHoverContent />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerFirstName');
    localStorage.removeItem('customeremail');
    setIsLoggedIn(false);
    setCustomerFirstName(null);
    router.push('/login');
  };

  const handleProfileMouseEnter = () => {
    if (profileHoverTimeoutRef.current) {
      clearTimeout(profileHoverTimeoutRef.current);
    }
    profileHoverTimeoutRef.current = setTimeout(() => {
      setProfileHover(true);
    }, 300);
  };

  const handleProfileMouseLeave = () => {
    profileHoverTimeoutRef.current = setTimeout(() => {
      setProfileHover(false);
    }, 300);
  };

  const backgroundColor = fixedHeader ? 'bg-white' : 'bg-white';

  return (
    <div className="relative">
      <nav
        className={`header-menu style-one flex items-center justify-between p-1 lg:px-6 ${fixedHeader ? 'left-0 right-0 top-0 z-10' : ''} ${backgroundColor}`}
      >
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="xs:ml-3 ml-2 flex w-auto items-center">
            <Link href="/" prefetch={true} className="flex flex-col items-center justify-center">
              <div className="logo  text-2xl md:text-3xl font-bold uppercase text-black">OldLove</div>
              <div className="logo  block text-sm text-gray-500 md:hidden lg:hidden">
                {' '}
                Specially Made With Love
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

          <div className="relative ml-3 flex items-center space-x-4">
            <div className="mb-2 hidden md:flex">
              <SpotlightSearch color="white" />
            </div>
            <div className="hidden md:block">
              <CartModal />
            </div>
            <Link href={'/wishlist'}>
              <CiHeart className="xs: mb-2 hidden text-3xl md:block" />
            </Link>
            <div
              className="relative"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <button>
                {customerFirstName ? (
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-white">
                    {customerFirstName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img width="35" height="35" src="https://img.icons8.com/laces/64/gender-neutral-user.png" alt="gender-neutral-user"/>
                )}
              </button>

              {profileHover && (
                <div className="absolute right-0 top-full z-20 w-56 rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <Link href="/my-account">
                        <div className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100">
                        <img width="30" height="30" src="https://img.icons8.com/laces/64/gender-neutral-user.png" alt="gender-neutral-user" className='mr-2 '/>
                          <span className="font-semibold text-black">My Account</span>
                        </div>
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <Link href="/orders">
                        <div className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/box--v1.png" alt="box--v1" className='mr-2'/>
                          <span className="font-semibold text-black">My Orders</span>
                        </div>
                      </Link>
                      <div
                        className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <span className="font-semibold text-black">Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="button-main mb-2 block w-full rounded-md bg-black py-2 text-center font-semibold text-white transition">
                          Login
                        </button>
                      </Link>
                      <div className="block w-full rounded-md py-2 text-center text-sm font-semibold text-black">
                        <span className="text-sm text-gray-400">Don't have an account?</span>
                        <Link href="/register" className="hover:underline">
                          {' '}
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <BottomNav customerFirstName={customerFirstName} />

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
