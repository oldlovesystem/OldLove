'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import * as Icon from '@phosphor-icons/react/dist/ssr';

const ResetPage = () => {
  const params = useParams();
  const customerId = params.customerId; // Capture the customer segment from the URL
  const token = params.token; // Capture the token segment from the URL
  const [password, setPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success message
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [isPasswordMismatchModalOpen, setIsPasswordMismatchModalOpen] = useState(false); // State for modal visibility

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Update password state
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value); // Update confirm password state
  };

  const getPasswordStrength = (password: string) => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*]/.test(password);

    const criteriaMet = [
      lengthCriteria,
      uppercaseCriteria,
      lowercaseCriteria,
      numberCriteria,
      specialCharCriteria
    ].filter(Boolean).length;

    if (criteriaMet === 5) return 'Strong';
    if (criteriaMet >= 3) return 'Medium';
    return 'Weak';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      setIsPasswordMismatchModalOpen(true);
      return; // Do not proceed with the reset if passwords do not match
    }

    const resetUrl = `https://9eca2f-11.myshopify.com/account/reset/${customerId}/${token}`; // Construct the reset URL
    const query = `
      mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
        customerResetByUrl(password: $password, resetUrl: $resetUrl) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerAccessToken {
            accessToken
          }
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
    `;

    const variables = {
      password,
      resetUrl
    };

    try {
      const response = await fetch('https://9eca2f-11.myshopify.com/api/2024-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b'
        },
        body: JSON.stringify({ query, variables })
      });

      const data = await response.json();

      if (data.errors || data.data.customerResetByUrl.customerUserErrors.length > 0) {
        // Handle errors
        setError(
          data.errors ||
            data.data.customerResetByUrl.customerUserErrors
              .map((err: any) => err.message)
              .join(', ')
        );
      } else {
        // Handle success
        setSuccess(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="reset-block py-10 md:py-20 font-tenor-sans">
      <div className="container">
        <div className="content-main flex flex-col items-center">
          <h1 className="heading4 mb-6">Password Reset</h1>
          {token ? (
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <label htmlFor="password" className="mb-1 block">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="New Password *"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  >
                    {showPassword ? <Icon.EyeSlash size={20} /> : <Icon.Eye size={20} />}
                  </button>
                </div>
                <p
                  className={`mt-1 ${getPasswordStrength(password) === 'Weak' ? 'text-red-500' : getPasswordStrength(password) === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}
                >
                  {getPasswordStrength(password)} Password
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="mb-1 block">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    className="border-line w-full rounded-lg border-gray-300 px-4 pb-3 pt-3"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm Password *"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  >
                    {showConfirmPassword ? <Icon.EyeSlash size={20} /> : <Icon.Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="block-button mt-4 md:mt-7">
                <button type="submit" className="button-main w-full">
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            <p>Loading...</p>
          )}

          {error && (
            <div style={{ color: 'red' }}>
              <h2>Error(s):</h2>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div style={{ color: 'green' }}>
              <h2>Password reset successfully!</h2>
              <div className="block-button  md:mt-7">
                <Link href="/login">
                  <button className="button-main">Go to Login</button>
                </Link>
              </div>
            </div>
          )}

          {/* Modal for password mismatch */}
          {isPasswordMismatchModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-sm rounded bg-white p-6 shadow-md">
                <h2 className="text-red-500">Passwords do not match!</h2>
                <p>Please ensure both password fields are identical.</p>
                <button
                  onClick={() => setIsPasswordMismatchModalOpen(false)}
                  className="mt-4 text-gray-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
