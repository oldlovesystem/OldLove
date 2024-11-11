"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Make sure to import axios

const ReturnExchange: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState<string | null>(null); // To display success or error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Reset message before new submission

    try {
      const response = await axios.post('https://cancelorder.vercel.app/api/returnRequest', {
        orderId: orderNumber,
        reason: 'Return/Exchange', // Specify a reason, can be adjusted as needed
        contactInfo // Include the contact information
      });
      
      setMessage(response.data.message); // Set success message
    } catch (error: any) {
      console.error('Error submitting the return/exchange:', error);
      setMessage(error.response?.data?.error || 'An error occurred while processing your request.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-tenor-sans">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Return/Exchange</h2>
        <p className="text-center mb-4">
          Return/Exchange your product in just a few clicks. Please enter your order number and email / mobile number to continue.
        </p>
        <p className="text-center mb-4 font-semibold">
          Please note that ₹ 100 reverse shipment charges are applicable.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number</label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your order number"
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Email / Mobile Number</label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email or mobile number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white rounded-md py-2 hover:bg-black transition duration-200"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>} {/* Display message */}
        <Link href={"/policy"}>
          <p className="text-center mt-4 text-sm text-gray-600">
            Please read our <span className='text-blue-600'>return and exchange</span> policies before proceeding.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ReturnExchange;
