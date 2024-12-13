// pages/login.jsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loginShopify } from '../../lib/login';
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [resetEmail, setResetEmail] = useState(''); // State for the reset email
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    const token = localStorage.getItem('customerAccessToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginShopify(email, password);
      if (result.success) {
        if (result.token) {
          localStorage.setItem('customerAccessToken', result.token);
        }
        setSuccess('Login successful!');
        setError('');
        
        // Refresh the page and then navigate to the home page
        setTimeout(() => {
          router.replace('/'); // Navigate to the home page
        ; // Refresh the page
        }, 10); // Adjust the delay as needed
      } else {
        setError(result.message || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setSuccess('');
    }
  };
  
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetError("Email is required to reset password.");
      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT,
        {
          query: `
            mutation customerRecover($email: String!) {
              customerRecover(email: $email) {
                customerUserErrors {
                  field
                  message
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            email: resetEmail,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_KEY,
          },
        }
      );

      if (response.data.data.customerRecover.userErrors.length) {
        setResetError("Error sending reset password email.");
      } else {
        setResetSuccess("Reset password email sent successfully! Please check your inbox.");
        setResetEmail(''); // Clear the email input after success
      }
    } catch (error) {
      setResetError("Error sending reset password request.");
    }
  };

  return (
    <>
      <div className="login-block md:py-20 py-10 font-tenor-sans">
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
                <div className="pass mt-5 relative">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <Icon.EyeSlash size={20} /> : <Icon.Eye size={20} />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className='flex items-center'>
                    <div className="block-input">
                      <input type="checkbox" name='remember' id='remember' />
                      <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                    </div>
                    <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(true)} className='font-semibold hover:underline'>Forgot Your Password?</button>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button type="submit" className="button-main">Login</button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-secondary font-tenor-sans">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={'/register'} className="button-main">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for resetting password */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 font-tenor-sans">Reset Password</h2>
            {resetError && <p className="text-red-500">{resetError}</p>}
            {resetSuccess && <p className="text-green-500">{resetSuccess}</p>}
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              required
            />
            <button onClick={handleResetPassword} className="button-main w-full">
              Send Reset Link
            </button>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 text-gray-500 hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
