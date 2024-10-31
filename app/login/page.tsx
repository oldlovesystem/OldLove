"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginShopify } from '../../lib/login';
import Breadcrumb from '../../components/Breadcrumb';
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if a token exists on mount
    const token = localStorage.getItem('customerAccessToken');
    if (token) {
      // Redirect to the home page if already logged in
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginShopify(email, password);
      if (result.success) {
        if (result.token) {
          localStorage.setItem('customerAccessToken', result.token);
        }
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => {
          // Refresh the page and then redirect to home
          window.location.reload();
          router.push('/');
        }, 1000);
      } else {
        setError(result.message || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setSuccess('');
    }
  };

  return (
    <>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Login</div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}
              <form onSubmit={handleSubmit} className="md:mt-7 mt-4">
                <div className="email">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type="email"
                    placeholder="Username or email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass mt-5">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className='flex items-center'>
                    <div className="block-input">
                      <input type="checkbox" name='remember' id='remember' />
                      <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                    </div>
                    <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                  </div>
                  <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button type="submit" className="button-main">Login</button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={'/register'} className="button-main">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
