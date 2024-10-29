"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

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

const Dashboard = () => {
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
                      billingAddress {
                        address1
                        city
                        country
                      }
                      canceledAt
                      cancelReason
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

      if (response.data && response.data.data && response.data.data.customer) {
        const customerData = response.data.data.customer;
        setCustomer(customerData);

        const updatedOrders = await Promise.all(
          customerData.orders.edges.map(async ({ node: order }) => {
            const cancelCheckResponse = await axios.get(`https://cancelorder.vercel.app/api/cancelOrderCheck/${order.orderNumber}`);
            const isCanceled = cancelCheckResponse.status === 200 && cancelCheckResponse.data.exists;

            return {
              ...order,
              canceled: order.canceledAt || isCanceled,
            };
          })
        );

        setOrders(updatedOrders);
      } else {
        setError("No customer data found.");
      }
    } catch (err) {
      setError("Error fetching customer data or orders.");
      console.error(err);
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
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="profile-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col w-full">
            <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
              <div className="user-info bg-white shadow-lg rounded-lg border border-gray-200 lg:px-7 px-4 lg:py-10 py-5">
                <div className="heading flex flex-col items-center justify-center">
                  <div className="icon mb-4">
                    <Icon.User size={100} className="text-gray-700" />
                  </div>
                  <div className="name heading6 mt-4 text-center font-semibold">{customer.firstName} {customer.lastName}</div>
                  <div className="mail heading6 font-normal text-gray-600 text-center mt-1">{customer.email}</div>
                </div>
              </div>
            </div>

            <div className="right md:w-2/3 w-full pl-2.5">
              <div className="dashboard">
                <h1 className="text-title font-bold text-2xl mb-4">Welcome, {customer.firstName} {customer.lastName}</h1>
                <h2 className="font-semibold text-xl mb-3">Your Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-600">No orders found.</p>
                ) : (
                  <ul>
                    {orders.map((order) => (
                      <li key={order.id} className="order-item border border-gray-300 rounded-lg p-4 my-2 bg-white shadow-sm flex justify-between items-center">
                        <div className="order-details">
                          <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                          {order.canceled ? (
                            <>
                              <p className="text-red-500">Canceled</p>
                              <h4 className="font-semibold mt-3">Items:</h4>
                              <ul className="list-disc pl-5">
                                {order.lineItems.edges.map(({ node: item }) => (
                                  <li key={item.title} className="text-gray-600">
                                    {item.title} {/* Display item name only */}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <>
                              <p className="text-gray-600">Processed At: {new Date(order.processedAt).toLocaleDateString()}</p>
                              <p className="text-gray-600">Status: {order.fulfillmentStatus}</p>
                              <p className="font-bold">Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}</p>
                              <p className="text-gray-600">Billing Address: {order.billingAddress?.address1}, {order.billingAddress?.city}, {order.billingAddress?.country}</p>
                              <h4 className="font-semibold mt-3">Items:</h4>
                              <ul className="list-disc pl-5">
                                {order.lineItems.edges.map(({ node: item }) => (
                                  <li key={item.title} className="text-gray-600">
                                    {item.title} (Quantity: {item.quantity})
                                  </li>
                                ))}
                              </ul>
                              
                              {order.fulfillmentStatus !== "FULFILLED" && ( // Condition to check if order is not fulfilled
                                <button
                                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                  onClick={() => openCancelModal(order)}
                                >
                                  Cancel Order
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
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
              <button onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button onClick={confirmCancellation} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
