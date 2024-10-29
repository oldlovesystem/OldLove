"use client";

import { useState } from "react";
import { FaTruck } from "react-icons/fa"; // Truck icon from React Icons

const TrackOrder = () => {
  const [trackingMethod, setTrackingMethod] = useState("awb"); // Default tracking method
  const [identifier, setIdentifier] = useState(""); // Order ID or AWB number
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleTracking = async () => {
    // Here you would typically make an API call to track the order
    // For demonstration, we'll just simulate the tracking result
    if (identifier) {
      setTrackingResult(`Tracking ${trackingMethod.toUpperCase()} ${identifier}: Your order is in transit.`);
    }
  };

  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="container lg:w-1/2  p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl  mb-4">Order Tracking</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="awb"
              name="trackingMethod"
              value="awb"
              checked={trackingMethod === "awb"}
              onChange={() => setTrackingMethod("awb")}
              className="mr-2"
            />
            <label htmlFor="awb" className="mr-4">AWB Number</label>
            <input
              type="radio"
              id="orderId"
              name="trackingMethod"
              value="orderId"
              checked={trackingMethod === "orderId"}
              onChange={() => setTrackingMethod("orderId")}
              className="mr-2"
            />
            <label htmlFor="orderId">Order ID</label>
          </div>
          <div className="flex mb-4">
  <input
    type="text"
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
    placeholder={`Enter ${trackingMethod === "awb" ? "AWB Number" : "Order ID"}`}
    className="border border-gray-300 rounded-l-lg p-2 w-3/4 focus:outline-none focus:ring-0 focus:ring-black"
  />

  <button
    onClick={handleTracking}
    className="bg-black text-white rounded-r-lg p-2 hover:bg-gray-800 w-1/4 flex items-center justify-center"
  >
    Track
  </button>
</div>

          {trackingResult && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p>{trackingResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
