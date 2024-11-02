"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

const OrdersPage = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

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
                orders(first: 10) {
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCancelReason("");
  };

  const confirmCancellation = async () => {
    if (!cancelReason) {
      alert("Cancellation reason is required.");
      return;
    }

    try {
      await axios.post("https://cancelorder.vercel.app/api/cancelOrder", {
        orderId: selectedOrder.orderNumber,
        cancelReason,
        id: selectedOrder.id,
      });

      alert("Order canceled! Please allow a few minutes for the cancellation to reflect.");
      closeModal();
      fetchCustomerOrders();
    } catch (error) {
      setError("Error canceling order: " + (error.response?.data?.error || error.message));
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
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="order-item border border-gray-300 rounded-lg my-2 bg-gray-50 flex">
                  <div className="order-details flex-grow p-4">
                    <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                    <p className="text-gray-600">Processed At: {new Date(order.processedAt).toLocaleDateString()}</p>
                    <p className="text-gray-600">Status: {order.fulfillmentStatus}</p>
                    <p className="font-bold mt-2">Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}</p>
                    <h4 className="font-semibold mt-3">Items:</h4>
                    <ul className="list-disc pl-5">
                      {order.lineItems.edges.map(({ node: item }) => (
                        <li key={item.title} className="text-gray-600">
                          {item.title} (Quantity: {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vertical Divider */}
                  <div className="border-l border-gray-300"></div>

                  {/* Status Section */}
                  <div className="order-status flex flex-col justify-between bg-gray-200 p-4 w-1/4">
                    <h4 className="font-semibold text-lg mb-2">Status</h4>
                    <div className="flex-grow">
                      {!order.canceled && (
                        <button
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                          onClick={() => openCancelModal(order)}
                        >
                          Cancel Order
                        </button>
                      )}
                      {order.canceled && (
                        <p className="text-red-600 mt-2">Order Canceled</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">Cancel Order #{selectedOrder?.orderNumber}</h3>
            <textarea
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Enter reason for cancellation..."
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
              <button onClick={confirmCancellation} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
