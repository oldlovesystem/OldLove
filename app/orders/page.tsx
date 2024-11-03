"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimesCircle, FaExchangeAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";// Import Link for routing

// CSS Spinner Styles
const spinnerStyles = `
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const cancellationReasons = [
  "Changed my mind",
  "Order was incorrect",
  "Found a better price",
  "Delayed shipment",
  "Product no longer needed",
  "Other"
];

const OrdersPage = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customCancelReason, setCustomCancelReason] = useState("");
  const [refundedOrders, setRefundedOrders] = useState([]);

  const fetchCustomerOrders = async () => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("customerAccessToken") : null;

    if (!accessToken) {
      setError("No customer access token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://9eca2f-11.myshopify.com/api/2024-07/graphql.json",
        {
          query: `
            query GetCustomerOrders($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                id
                firstName
                lastName
                email
                orders(first: 30) {
                  edges {
                    node {
                      id
                      orderNumber
                      processedAt
                      canceledAt
                      currentTotalPrice {
                        amount
                        currencyCode
                      }
                      fulfillmentStatus
                      lineItems(first: 5) {
                        edges {
                          node {
                            title
                            quantity
                          }
                        }
                      }
                      shippingAddress {
                        address1
                        city
                        country
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            customerAccessToken: accessToken,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b",
          },
        }
      );

      const customerData = response.data?.data?.customer;
      if (customerData) {
        setCustomer(customerData);
        setOrders(customerData.orders.edges.map(({ node }) => ({ ...node, canceled: node.canceledAt !== null })));
      } else {
        setError("No customer data found.");
      }
    } catch (err) {
      setError("Error fetching customer data or orders.");
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setCancelReason(""); // Reset reason when opening modal
    setCustomCancelReason(""); // Reset custom reason
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCancelReason("");
    setCustomCancelReason("");
  };

  const confirmCancellation = async () => {
    const reasonToSend = cancelReason === "Other" ? customCancelReason : cancelReason;

    if (!reasonToSend) {
      alert("Cancellation reason is required.");
      return;
    }

    try {
      await axios.post("https://cancelorder.vercel.app/api/cancelOrder", {
        orderId: selectedOrder.orderNumber,
        cancelReason: reasonToSend,
        id: selectedOrder.id,
      });

      alert("Order canceled! Please allow a few minutes for the cancellation to reflect.");
      closeModal();
      fetchCustomerOrders();
    } catch (error) {
      setError("Error canceling order: " + (error.response?.data?.error || error.message));
    }
  };

  const trackOrder = async (orderId) => {
    try {
      const response = await fetch(`https://cancelorder.vercel.app/api/getAWB/${orderId}`);
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
  };

 

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <style>{spinnerStyles}</style>
        <div className="flex justify-center items-center h-screen">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold logofont pt-10 mb-6">Your Orders</h1>
        <div className="bg-white p-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="order-item border border-gray-300 rounded-lg my-2 bg-gray-50">
                  <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-lg">
                    <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                    <h4 className="font-semibold text-lg">Status: {order.fulfillmentStatus}</h4>
                  </div>

                  <div className="flex flex-col sm:flex-row p-4">
                    <div className="w-full sm:w-3/4 pr-4">
                      <p className="text-gray-600">Processed At: {new Date(order.processedAt).toLocaleDateString()}</p>
                      <p className="font-bold mt-2">
                        Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}
                      </p>

                      <div className="mt-3">
                        <h4 className="font-semibold">Shipping Address:</h4>
                        <p className="text-gray-600">
                          <FaMapMarkerAlt className="inline mr-1" />
                          {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>

                      <h4 className="font-semibold mt-3">Items:</h4>
                      <ul className="list-disc pl-5">
                        {order.lineItems.edges.map(({ node: item }) => (
                          <li key={item.title} className="text-gray-600">
                            {item.title} (Quantity: {item.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="hidden sm:block border-l border-gray-300 mx-4"></div>

                    <div className="w-full sm:w-1/4 flex flex-col space-y-3 items-center sm:items-start mt-4 sm:mt-0">
                      {order.canceled ? (
                        <p className="text-red-600 flex items-center">
                          <FaTimesCircle className="mr-1" /> Order Canceled
                        </p>
                      ) : (
                        <button
                          onClick={() => openCancelModal(order)}
                          className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                          Cancel Order
                        </button>
                      )}

                      <button
                        onClick={() => trackOrder(order.orderNumber)}
                        disabled={order.canceled} // Disable button if order is canceled
                        className={`w-full px-4 py-2 rounded-lg transition ${order.canceled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                      >
                        Track Order
                      </button>

                      {/* Updated Return/Exchange button */}
                      <Link
                        href={"/returnexchange"} // Using Link component to navigate
                        className={`w-full px-4 py-2 rounded-lg  text-center transition ${order.canceled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                      >
                        Return / Exchange
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Cancel Order</h2>
            <p className="mb-4">Please select a reason for cancellation:</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select a reason</option>
              {cancellationReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {cancelReason === "Other" && (
              <input
                type="text"
                value={customCancelReason}
                onChange={(e) => setCustomCancelReason(e.target.value)}
                placeholder="Please specify..."
                className="border rounded p-2 w-full mb-4"
              />
            )}
            <div className="flex justify-end">
              <button onClick={closeModal} className="mr-2 bg-gray-300 hover:bg-gray-400 rounded px-4 py-2">Cancel</button>
              <button onClick={confirmCancellation} className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
