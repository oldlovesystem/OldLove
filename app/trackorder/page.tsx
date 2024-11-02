"use client";

import { useState } from "react";

const TrackOrder = () => {
  const [trackingMethod, setTrackingMethod] = useState("awb"); // Default tracking method
  const [identifier, setIdentifier] = useState(""); // Order ID or AWB number

  const handleTracking = async () => {
    if (identifier) {
      if (trackingMethod === "awb") {
        window.open(`https://shiprocket.co/tracking/${identifier}`, "_blank");
      } else if (trackingMethod === "orderId") {
        try {
          const response = await fetch(`https://cancelorder.vercel.app/api/getAWB/${identifier}`);
          const data = await response.json();
  
          if (response.ok) {
            const awbCode = data.awbCode;
            window.open(`https://shiprocket.co/tracking/${awbCode}`, "_blank");
          } else {
            alert(data.error || "Error retrieving AWB code.");
          }
        } catch (error) {
          alert("Error: " + error.message);
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="container lg:w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">Order Tracking</h2>
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
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
