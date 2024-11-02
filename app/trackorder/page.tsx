"use client";

import { useState } from "react";

const TrackOrder = () => {
  const [trackingMethod, setTrackingMethod] = useState("awb"); // Default tracking method
  const [identifier, setIdentifier] = useState(""); // Order ID or AWB number

  const handleTracking = async () => {
    if (identifier) {
      if (trackingMethod === "awb") {
        // Redirect to AWB tracking page directly
        window.open(`https://shiprocket.co/tracking/${identifier}`, "_blank");
      } else if (trackingMethod === "orderId") {
        // Call API to get the AWB number using the Order ID
        try {
          const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${identifier}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUzNTY5NTUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzMxMDg1NTgzLCJqdGkiOiJxdTVJVFEwWXNUVWwxZmlBIiwiaWF0IjoxNzMwMjIxNTgzLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczMDIyMTU4MywiY2lkIjo1MDMwMjEwLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.HZUcWNbBg2sIJn9hARA915_IHHWWwejTB7lDvfTtz6U'
            }
          });
          console.log(response);
          if (!response.ok) throw new Error("Failed to fetch tracking data");

          const data = await response.json();
          const awbCode = data[0]?.tracking_data?.shipment_track[0]?.awb_code;

          if (awbCode) {
            // Redirect to the AWB tracking page using the retrieved AWB code
            window.open(`https://shiprocket.co/tracking/${awbCode}`, "_blank");
          } else {
            alert("AWB code not found in the response.");
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
