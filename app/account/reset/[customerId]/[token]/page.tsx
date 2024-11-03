"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const ResetPage = () => {
  const params = useParams();
  const customerId = params.customerId; // Capture the customer segment from the URL
  const token = params.token; // Capture the token segment from the URL
  const [password, setPassword] = useState(''); // State for new password
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState(false); // State for success message

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Update password state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const resetUrl = `https://9eca2f-11.myshopify.com/account/reset/${customerId}/${token}`; // Construct the reset URL
    console.log(resetUrl);
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
      resetUrl,
    };

    try {
      const response = await fetch('https://9eca2f-11.myshopify.com/api/2024-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b'
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (data.errors || data.data.customerResetByUrl.customerUserErrors.length > 0) {
        // Handle errors
        setError(data.errors || data.data.customerResetByUrl.customerUserErrors.map((err: any) => err.message).join(', '));
      } else {
        // Handle success
        setSuccess(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="reset-block md:py-20 py-10">
      <div className="container">
        <div className="content-main flex flex-col items-center">
          <h1 className="heading4 mb-6">Password Reset</h1>
          {token ? (
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <input
                  className="border-line border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                  type="password"
                  placeholder="New Password *"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="block-button md:mt-7 mt-4">
                <button type="submit" className="button-main w-full">Reset Password</button>
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
              <Link href="/login" className="text-blue-500 hover:underline">Go to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
