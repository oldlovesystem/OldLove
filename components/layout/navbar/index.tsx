"use client"
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

const menu = [
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
      router.push('/my-account');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerAccessToken');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const backgroundColor = fixedHeader ? 'bg-white' : 'bg-white';

  return (
    <div className="relative">
      <nav className={`header-menu style-one flex items-center justify-between p-4 lg:px-6 ${fixedHeader ? 'left-0 right-0 top-0 z-10' : ''} ${backgroundColor}`}>
        <div className="mr-1 block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="xs:ml-3 ml-2 flex w-auto items-center">
            <Link href="/" prefetch={true} className="flex items-center justify-center">
              <div className="logo text-3xl font-bold uppercase text-black">OldLove</div>
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
            <CartModal />

            <div
              className="relative"
              onMouseEnter={() => setProfileHover(true)}
              onMouseLeave={() => setProfileHover(false)}
            >
              <button onClick={handleProfileClick}>
                <Icon.User className="text-2xl" />
              </button>

              {profileHover && (
                <div className="absolute right-0 top-full z-20 w-56 rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-lg">
                  {isLoggedIn ? (
                    <>
                      <Link href="/my-account">
                        <div className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100">
                          <FaUser className="mr-5 ml-3 text-gray-600" />
                          <span className="font-semibold text-black">My Account</span>
                        </div>
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <Link href="/orders">
                        <div className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100">
                          <FaBox className="mr-5 ml-3 text-gray-600" />
                          <span className="font-semibold text-black">My Orders</span>
                        </div>
                      </Link>
                      <div className="flex w-full cursor-pointer items-center rounded-md px-3 py-3 transition hover:bg-gray-100" onClick={handleLogout}>
                        <span className="font-semibold text-black">Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className=" button-main mb-2 block w-full rounded-md bg-black py-2 text-center font-semibold text-white transition ">
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

            <div className="mb-2 hidden md:flex">
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
