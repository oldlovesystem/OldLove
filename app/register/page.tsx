"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use this for client-side navigation
import { registerCustomer } from '../../lib/customer';


import Breadcrumb from '../../components/Breadcrumb';

import * as Icon from "@phosphor-icons/react/dist/ssr";

const Register = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customer = await registerCustomer(email, password, firstName, lastName);
      setSuccess(`Customer created: ${customer.email}`);
      setError('');

      // Redirect to home page after successful registration
      setTimeout(() => {
        router.push('/'); // Redirect to home page
      }, 1000); // Delay for 1 second to show success message before redirecting
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
      <div id="header" className='relative w-full'>
        <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
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
                <div className="first-name mt-5">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="last-name mt-5">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className='flex items-center mt-5'>
                  <div className="block-input">
                    <input
                      type="checkbox"
                      name='remember'
                      id='remember'
                    />
                    <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                  </div>
                  <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">I agree to the
                    <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of Use</Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button type="submit" className="button-main">Register</button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={'/login'} className="button-main">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
