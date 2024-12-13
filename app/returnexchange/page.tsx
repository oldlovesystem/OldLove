'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const ReturnExchange: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); 

    try {
      const response = await axios.post('https://cancelorder.vercel.app/api/returnRequest', {
        orderId: orderNumber,
        reason: 'Return/Exchange', 
        contactInfo 
      });

      setMessage(response.data.message); 
    } catch (error: any) {
      console.error('Error submitting the return/exchange:', error);
      setMessage(error.response?.data?.error || 'An error occurred while processing your request.');
    }
  };

  return (
    <div className="font-tenor-sans flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-semibold">Return/Exchange</h2>
        <p className="mb-4 text-center">
          Return/Exchange your product in just a few clicks. Please enter your order number and
          email / mobile number to continue.
        </p>
        <p className="mb-4 text-center font-semibold">
          Please note that ₹ 100 reverse shipment charges are applicable.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your order number"
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
              Email / Mobile Number
            </label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email or mobile number"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-500 py-2 text-white transition duration-200 hover:bg-black"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}{' '}
        <Link href={'/policy'}>
          <p className="mt-4 text-center text-sm text-gray-600">
            Please read our <span className="text-blue-600">return and exchange</span> policies
            before proceeding.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ReturnExchange;
