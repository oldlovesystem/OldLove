'use client';

import { useState } from 'react';

const TrackOrder = () => {
  const [trackingMethod, setTrackingMethod] = useState('awb'); // Default tracking method
  const [identifier, setIdentifier] = useState(''); // Order ID or AWB number

  const handleTracking = async () => {
    if (identifier) {
      if (trackingMethod === 'awb') {
        window.open(`https://shiprocket.co/tracking/${identifier}`, '_blank');
      } else if (trackingMethod === 'orderId') {
        try {
          const response = await fetch(`https://cancelorder.vercel.app/api/getAWB/${identifier}`);
          const data = await response.json();

          if (response.ok) {
            const awbCode = data.awbCode;
            window.open(`https://shiprocket.co/tracking/${awbCode}`, '_blank');
          } else {
            alert(data.error || 'Error retrieving AWB code.');
          }
        } catch (error) {
          alert('Error: ' + error.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container p-8 lg:w-1/2">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl">Order Tracking</h2>
          <div className="mb-4 flex items-center">
            <input
              type="radio"
              id="awb"
              name="trackingMethod"
              value="awb"
              checked={trackingMethod === 'awb'}
              onChange={() => setTrackingMethod('awb')}
              className="mr-2"
            />
            <label htmlFor="awb" className="mr-4">
              AWB Number
            </label>
            <input
              type="radio"
              id="orderId"
              name="trackingMethod"
              value="orderId"
              checked={trackingMethod === 'orderId'}
              onChange={() => setTrackingMethod('orderId')}
              className="mr-2"
            />
            <label htmlFor="orderId">Order ID</label>
          </div>
          <div className="mb-4 flex">
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={`Enter ${trackingMethod === 'awb' ? 'AWB Number' : 'Order ID'}`}
              className="w-3/4 rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-0 focus:ring-black"
            />
            <button
              onClick={handleTracking}
              className="flex w-1/4 items-center justify-center rounded-r-lg bg-black p-2 text-white hover:bg-gray-800"
            >
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
