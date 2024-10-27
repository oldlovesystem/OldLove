"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerCustomer } from '../../lib/customer';

import Breadcrumb from '../../components/Breadcrumb';
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customer = await registerCustomer(email, password, firstName, lastName);
      setSuccess(`Customer created: ${customer.email}`);
      setError('');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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
                  <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">
                    I agree to the
                    <button type="button" onClick={() => setIsModalOpen(true)} className='text-black hover:underline pl-1'>
                      Terms and Policy
                    </button>
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
                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We’re thrilled to have you with us again!</div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={'/login'} className="button-main">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Terms and Policies */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold mb-4">Terms and Policies</h2>
            <p className="text-sm text-gray-600 mb-4">
            This policy applies to all the Old Love platforms (the “Site” or “Web Site” or “Mobile
            Application” or “App” or “Us” or “We” or "Social Media Platforms"), which is operated
            and owned by Nandi International, marketed and/or managed by Nandi International. It is
            Old Love’s policy to comply with general laws for protecting user information and bank
            details shared for the purpose of availing Old Love (Nandi International) services. This regulates the
            processing of information relating to you and grants you various rights in respect of
            your personal data. Any Images, Data or Files Uploaded on the website must not be used
            without the consent of the authorized personnel of the brand. The Web Site contains
            links to other websites over which we have no control. Old Love is not responsible for
            the privacy policies or practices of other web sites to which you choose to link from
            OldLove (Nandi International).in. We encourage you to review the privacy policies of those other web sites so
            you can understand how they collect, use and share your information.
            </p>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
