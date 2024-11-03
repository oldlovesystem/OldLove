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
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false); // For email verification modal
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false); // State for terms agreement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user has agreed to the terms
    if (!isAgreedToTerms) {
      setError('You must agree to the terms and conditions.'); // Set error message
      return; // Exit early if terms are not agreed
    }

    // Attempt to register the customer
    const response = await registerCustomer(email, password, firstName, lastName);
    console.log(response);
    if (response.success) {
      setSuccess(`Customer created: ${response.customer.email}.`);
      setError('');
      setTimeout(() => {
        router.push('/');
      }, 3000); // Redirect after 3 seconds
    } else {
      setError(response.message); // Display error message from server
      setSuccess('');
      
      // Show verification modal if the error is about email verification
      if (response.message.includes('verify your email address')) {
        setIsVerificationModalOpen(true);
      }
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
              {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}
              {success && <p className="text-green-500 mb-4">{success}</p>} {/* Success message */}
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
                      name='terms'
                      id='terms'
                      checked={isAgreedToTerms}
                      onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                    />
                    <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                  </div>
                  <label htmlFor='terms' className="pl-2 cursor-pointer text-secondary2">
                    I agree to the
                    <button type="button" onClick={() => setIsModalOpen(true)} className='text-black hover:underline pl-1'>
                      Terms and Policy
                    </button>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button 
                    type="submit" 
                    className="button-main" 
                    disabled={!isAgreedToTerms} // Disable if terms are not agreed
                  >
                    Register
                  </button>
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Terms and Policies</h2>
            <p>Content of the terms and policies...</p>
          </div>
        </div>
      )}

      {/* Modal for Verification */}
      {isVerificationModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVerificationModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setIsVerificationModalOpen(false)}>&times;</span>
            <h2>Email Verification Required</h2>
            <p>We have sent an email to {email}, please click the link included to verify your email address.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
