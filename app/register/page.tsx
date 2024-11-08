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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isPasswordMismatchModalOpen, setIsPasswordMismatchModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    if (password !== confirmPassword) {
      setIsPasswordMismatchModalOpen(true);
      return;
    }

    const response = await registerCustomer(email, password, firstName, lastName);

    if (response.success) {
      setSuccess(`Customer created: ${response.customer.email}.`);
      setError('');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      setError(response.message);
      setSuccess('');
      if (response.message.includes('verify your email address')) {
        setIsVerificationModalOpen(true);
      }
    }
  };

  const passwordStrength = () => {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPasswordPattern.test(password)) return "Strong";
    if (password.length >= 6) return "Weak";
    return "Too Short";
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
                <div className="first-name">
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
                <div className="email mt-5">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass mt-5 relative">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {isPasswordVisible ? (
                    <Icon.EyeSlash onClick={() => setIsPasswordVisible(false)} className="absolute right-3 top-3 cursor-pointer" />
                  ) : (
                    <Icon.Eye onClick={() => setIsPasswordVisible(true)} className="absolute right-3 top-3 cursor-pointer" />
                  )}
                  <p className={`mt-1 ${passwordStrength() === 'Strong' ? 'text-green-500' : 'text-red-500'}`}>
                    {passwordStrength() === 'Too Short' ? 'Password too short' : `${passwordStrength()} password`}
                  </p>
                </div>
                <div className="confirm-pass mt-5 relative">
                  <input
                    className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Re-enter Password *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {isConfirmPasswordVisible ? (
                    <Icon.EyeSlash onClick={() => setIsConfirmPasswordVisible(false)} className="absolute right-3 top-3 cursor-pointer" />
                  ) : (
                    <Icon.Eye onClick={() => setIsConfirmPasswordVisible(true)} className="absolute right-3 top-3 cursor-pointer" />
                  )}
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal-content bg-white p-6 rounded-lg w-11/12 sm:w-1/3 transform transition-all duration-300 ease-in-out">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-900"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">Terms and Policies</h2>
      <p>This policy applies to all the Old Love platforms (the &quot;Site&quot; or &quot;Web Site&quot; or &quot;Mobile Application&quot; or &quot;App&quot; or &quot;Us&quot;
or &quot;We&quot; or &quot;Social Media Platforms&quot;), which is operated and owned by Nandi International, marketed and/or
managed by Nandi International. It is Old Love&#39;s policy to comply with general laws for protecting user information
and bank details shared for the purpose of availing Old Love (Nandi International) services. This regulates the
processing of information relating to you and grants you various rights in respect of your personal data. Any
Images, Data or Files Uploaded on the website must not be used without the consent of the authorized personnel
of the brand. The Web Site contains links to other websites over which we have no control. Old Love is not
responsible for the privacy policies or practices of other web sites to which you choose to link from OldLove
(Nandi International). in. We encourage you to review the privacy policies of those other web sites so you can
understand how they collect, use and share your information.</p>
    </div>
  </div>
)}

      {/* Modal for Password Mismatch */}
      {isPasswordMismatchModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setIsPasswordMismatchModalOpen(false)}>
    <div className="modal-content bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
      <span className="close cursor-pointer float-right" onClick={() => setIsPasswordMismatchModalOpen(false)}>&times;</span>
      <h2 className="text-red-500">Passwords do not match!</h2>
      <p>Please check that both password fields are identical.</p>
    </div>
  </div>
)}

      {/* Modal for Verification */}
      {isVerificationModalOpen && (
        <div className="modal-overlay z-50" onClick={() => setIsVerificationModalOpen(false)}>
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <span className="close cursor-pointer float-right" onClick={() => setIsVerificationModalOpen(false)}>&times;</span>
            <h2>Email Verification Required</h2>
            <p>We have sent an email to {email}, please click the link included to verify your email address.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
