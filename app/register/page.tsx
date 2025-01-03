'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerCustomer } from '../../lib/customer';
import Breadcrumb from '../../components/Breadcrumb';
import * as Icon from '@phosphor-icons/react/dist/ssr';

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
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (password.length < 8) return 'Too Short';
    if (strongPasswordPattern.test(password)) return 'Strong';
    return 'Weak';
  };
  const handleTermsChange = (e) => {
    if (e.target.checked) {
      setIsModalOpen(true); // Open the modal when the checkbox is checked
    } else {
      setIsAgreedToTerms(false);
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    setIsAgreedToTerms(true); // Set agreement to true after reading the terms
  };

  return (
    <>
      <div id="header" className="relative w-full">
        <Breadcrumb heading="Create An Account" subHeading="Create An Account" />
      </div>
      <div className="register-block py-10 md:py-20">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left border-line w-full md:w-1/2 md:border-r md:pr-[40px] lg:pr-[60px]">
              <div className="heading4">Register</div>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              {success && <p className="mb-4 text-green-500">{success}</p>}
              <form onSubmit={handleSubmit} className="mt-4 md:mt-7">
                <div className="first-name">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="last-name mt-5">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="email mt-5">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass relative mt-5">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {isPasswordVisible ? (
                    <Icon.EyeSlash
                      onClick={() => setIsPasswordVisible(false)}
                      className="absolute right-3 top-3 cursor-pointer"
                    />
                  ) : (
                    <Icon.Eye
                      onClick={() => setIsPasswordVisible(true)}
                      className="absolute right-3 top-3 cursor-pointer"
                    />
                  )}
                  <p
                    className={`mt-1 ${passwordStrength() === 'Strong' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {passwordStrength() === 'Too Short'
                      ? 'Password too short'
                      : `${passwordStrength()} password`}
                  </p>
                </div>
                <div className="confirm-pass relative mt-5">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Re-enter Password *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {isConfirmPasswordVisible ? (
                    <Icon.EyeSlash
                      onClick={() => setIsConfirmPasswordVisible(false)}
                      className="absolute right-3 top-3 cursor-pointer"
                    />
                  ) : (
                    <Icon.Eye
                      onClick={() => setIsConfirmPasswordVisible(true)}
                      className="absolute right-3 top-3 cursor-pointer"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-center">
                  <div className="block-input">
                    <input
                      type="checkbox"
                      name="terms"
                      id="terms"
                      checked={isAgreedToTerms}
                      onChange={handleTermsChange}
                    />
                    <Icon.CheckSquare size={20} weight="fill" className="icon-checkbox" />
                  </div>
                  <label htmlFor="terms" className="text-secondary2 cursor-pointer pl-2">
                    I agree to the
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="pl-1 text-black hover:underline"
                    >
                      Terms and Policy
                    </button>
                  </label>
                </div>
                <div className="block-button mt-4 md:mt-7">
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
            <div className="right flex w-full items-center md:w-1/2 md:pl-[40px] lg:pl-[60px]">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="text-secondary mt-2">
                  Welcome back. Sign in to access your personalized experience, saved preferences,
                  and more. We’re thrilled to have you with us again!
                </div>
                <div className="block-button mt-4 md:mt-7">
                  <Link href={'/login'} className="button-main">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Terms and Policies */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content w-11/12 transform rounded-lg bg-white p-6 transition-all duration-300 ease-in-out sm:w-1/3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 top-2 text-2xl text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="font-tenor-sans mb-4 text-xl font-semibold">Terms and Policies</h2>
            <p>
              This policy applies to all the Old Love platforms (the &quot;Site&quot; or &quot;Web
              Site&quot; or &quot;Mobile Application&quot; or &quot;App&quot; or &quot;Us&quot; or
              &quot;We&quot; or &quot;Social Media Platforms&quot;), which is operated and owned by
              Nandi International, marketed and/or managed by Nandi International. It is Old
              Love&#39;s policy to comply with general laws for protecting user information and bank
              details shared for the purpose of availing Old Love (Nandi International) services.
              This regulates the processing of information relating to you and grants you various
              rights in respect of your personal data. Any Images, Data or Files Uploaded on the
              website must not be used without the consent of the authorized personnel of the brand.
              The Web Site contains links to other websites over which we have no control. Old Love
              is not responsible for the privacy policies or practices of other web sites to which
              you choose to link from OldLove (Nandi International). in. We encourage you to review
              the privacy policies of those other web sites so you can understand how they collect,
              use and share your information.
            </p>
            <button
              onClick={handleModalOk}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
