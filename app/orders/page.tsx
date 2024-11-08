"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimesCircle, FaExchangeAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

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
  'Changed my mind',
  'Order was incorrect',
  'Found a better price',
  'Delayed shipment',
  'Product no longer needed'
];

const OrdersPage = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customCancelReason, setCustomCancelReason] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); 

  const fetchCustomerOrders = async () => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('customerAccessToken') : null;
    if (!accessToken) {
      setError('No customer access token found.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        'https://9eca2f-11.myshopify.com/api/2024-07/graphql.json',
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
            customerAccessToken: accessToken
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b'
          }
        }
      );

      const customerData = response.data?.data?.customer;
      if (customerData) {
        setCustomer(customerData);
        const fetchedOrders = customerData.orders.edges.map(({ node }) => ({
          ...node,
          canceled: node.canceledAt !== null
        }));
        setOrders(fetchedOrders);
      } else {
        setError('No customer data found.');
      }
    } catch (err) {
      setError('Error fetching customer data or orders.');
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setCancelReason('');
    setCustomCancelReason('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCancelReason('');
    setCustomCancelReason('');
  };

  const confirmCancellation = async () => {
    const reasonToSend = cancelReason === 'Other' ? customCancelReason : cancelReason;
    if (!reasonToSend) {
      alert('Cancellation reason is required.');
      return;
    }
    try {
      await axios.post('https://cancelorder.vercel.app/api/cancelOrder', {
        orderId: selectedOrder.orderNumber,
        cancelReason: reasonToSend,
        id: selectedOrder.id
      });
      alert('Order canceled! Please allow a few minutes for the cancellation to reflect.');
      closeModal();
      fetchCustomerOrders();
    } catch (error) {
      setError('Error canceling order: ' + (error.response?.data?.error || error.message));
    }
  };

  const trackOrder = async (orderId) => {
    try {
      const response = await fetch(`https://cancelorder.vercel.app/api/getAWB/${orderId}`);
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
  };

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  const sortedOrders = orders.slice().sort((a, b) => {
    const dateA = new Date(a.processedAt).getTime();
    const dateB = new Date(b.processedAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return (
      <div>
        <style>{spinnerStyles}</style>
        <div className="flex h-screen items-center justify-center">
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
        <h1 className="logofont mb-6 pt-10 text-4xl font-bold">Your Orders</h1>

        {/* Sort Dropdown */}
        <div className="mb-4 flex justify-end">
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="custom-select rounded bg-gray-200 p-2 pr-8"
  >
    <option value="newest">
      Newest to Oldest
      <span className="arrow-down "> &nbsp; &#8595;</span>
    </option>
    <option value="oldest">
      Oldest to Newest
      <span className="arrow-up "> &nbsp; &#8593;</span>
    </option>
  </select>
</div>
        <div className="bg-white p-6">
          {sortedOrders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <ul>
              {sortedOrders.map((order) => (
                <li
                  key={order.id}
                  className="order-item my-2 rounded-lg border border-gray-300 bg-gray-50"
                >
                  <div className="flex items-center justify-between rounded-t-lg bg-gray-300 p-4">
                    <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
                    <h4 className="text-lg font-semibold">Status: {order.fulfillmentStatus}</h4>
                  </div>

                  <div className="flex flex-col p-4 sm:flex-row">
                    <div className="w-full pr-4 sm:w-3/4">
                      <p className="text-gray-600">
                        Processed At: {new Date(order.processedAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2 font-bold">
                        Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}
                      </p>

                      <div className="mt-3">
                        <h4 className="font-semibold">Shipping Address:</h4>
                        {order.shippingAddress ? (
                          <p className="text-gray-600">
                            <FaMapMarkerAlt className="mr-1 inline" />
                            {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.country}
                          </p>
                        ) : (
                          <p className="text-gray-600">Shipping address not available</p>
                        )}
                      </div>

                      <h4 className="mt-3 font-semibold">Items:</h4>
                      <ul className="list-disc pl-5">
                        {order.lineItems.edges.map(({ node: item }) => (
                          <li key={item.title} className="text-gray-600">
                            {item.title} (Quantity: {item.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mx-4 hidden border-l border-gray-300 sm:block"></div>

                    <div className="mt-4 flex w-full flex-col items-center space-y-3 sm:mt-0 sm:w-1/4 sm:items-start">
                      {order.canceled ? (
                        <p className="flex items-center text-red-600">
                          <FaTimesCircle className="mr-1" /> Order Canceled
                        </p>
                      ) : (
                        <button
                          onClick={() => openCancelModal(order)}
                          disabled={order.fulfillmentStatus === 'FULFILLED'} 
                          className={`w-full rounded-lg px-4 py-2 transition ${
                            order.fulfillmentStatus === 'FULFILLED'
                              ? 'cursor-not-allowed bg-gray-400'
                              : 'button-main bg-black text-white'
                          }`}
                        >
                          Cancel Order
                        </button>
                      )}

                      <button
                        onClick={() => trackOrder(order.orderNumber)}
                        disabled={order.canceled}
                        className={`w-full rounded-lg px-4 py-2 transition ${order.canceled ? 'cursor-not-allowed bg-gray-400' : 'button-main bg-black text-white'}`}
                      >
                        Track Order
                      </button>

                      <Link
                        href={'/returnexchange'}
                        className={`w-full rounded-lg px-4 py-2 text-center transition ${
                          order.canceled ? 'cursor-not-allowed bg-gray-400' : 'button-main bg-black text-white'
                        }`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 rounded-lg bg-white p-6 shadow-lg sm:w-1/3">
            <h2 className="mb-4 text-lg font-semibold">Cancel Order</h2>
            <p className="mb-4">Please select a reason for cancellation:</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="mb-4 w-full rounded border p-2"
            >
              <option value="">Select a reason</option>
              {cancellationReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {cancelReason === 'Other' && (
              <input
                type="text"
                value={customCancelReason}
                onChange={(e) => setCustomCancelReason(e.target.value)}
                placeholder="Please specify..."
                className="mb-4 w-full rounded border border-gray-500 p-4 text-lg"
              />
            )}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmCancellation}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
