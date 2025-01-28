'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
  const [expandedOrder, setExpandedOrder] = useState(null); // For tracking details
  const [trackingDetails, setTrackingDetails] = useState({});

  const fetchCustomerOrders = async () => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('customerAccessToken') : null;
    if (!accessToken) {
      setError('No customer access token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT,
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
                            variant {
                              id
                              title
                              priceV2 {
                                amount
                                currencyCode
                              }
                              image {
                                src
                                altText
                              }
                              product {
                                id
                                title
                                descriptionHtml
                              }
                            }
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
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_KEY
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
      const response = await fetch(`https://cancelorder.vercel.app/track-order/${orderId}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const shipment = data.ShipmentData?.[0]?.Shipment;
        const awb = shipment?.AWB || null;
        const scans = shipment?.Scans || [];

        let status = 'Order is yet to be dispatched';
        let lastUpdated = null;
        let checkpoints = [];

        if (awb && scans.length > 0) {
          const lastScan = scans[scans.length - 1]?.ScanDetail;
          status = lastScan?.Instructions || 'In Transit';
          lastUpdated = lastScan?.StatusDateTime || 'Unknown';
          checkpoints = scans.map((scan) => ({
            location: scan.ScanDetail.ScannedLocation,
            dateTime: scan.ScanDetail.StatusDateTime,
            status: scan.ScanDetail.Instructions
          }));
        }

        setTrackingDetails((prev) => ({
          ...prev,
          [orderId]: {
            awb,
            status,
            lastUpdated,
            checkpoints
          }
        }));
        setExpandedOrder(orderId); // Expand tracking details for the order
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
    <div className="font-tenor-sans min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-tenor-sans mb-6 pt-10 text-4xl font-bold">Your Orders</h1>

        {/* Sort Dropdown */}
        <div className="mb-4 flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="custom-select rounded bg-gray-200 p-2 pr-8"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
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

                      <div className="mt-3">
                        <h4 className="font-semibold">Shipping Address:</h4>
                        {order.shippingAddress ? (
                          <p className="text-gray-600">
                            <FaMapMarkerAlt className="mr-1 inline" />
                            {order.shippingAddress.address1}, {order.shippingAddress.city},{' '}
                            {order.shippingAddress.country}
                          </p>
                        ) : (
                          <p className="text-gray-600">Shipping address not available</p>
                        )}
                      </div>

                      <h4 className="mt-3 font-semibold">Items:</h4>
                      <ul className="list-disc pl-5">
                        {order.lineItems.edges.map(({ node }) => (
                          <li key={node.variant.id} className="flex items-center py-2">
                            <img
                              src={node.variant.image.src}
                              alt={node.variant.image.altText}
                              className="object-fit mr-4 h-24 w-24"
                            />
                            <div className="flex-1">
                              <p className="font-semibold">{node.title}</p>
                              <p>{node.variant.title}</p>
                              <p>Quantity: {node.quantity}</p>
                              <p>
                                Price: {node.variant.priceV2.amount}{' '}
                                {node.variant.priceV2.currencyCode}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:w-1/4">
                      {order.canceled ? (
                        <p className="text-red-600">Order Canceled</p>
                      ) : (
                        <div>
                          <button
                            className="mb-2 w-full rounded bg-black px-4 py-2 text-white"
                            onClick={() => openCancelModal(order)}
                          >
                            Cancel Order
                          </button>
                          <button
                            className="mb-2 w-full rounded bg-black px-4 py-2 text-white"
                            onClick={() => trackOrder(order.orderNumber)}
                          >
                            Track Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {expandedOrder === order.orderNumber && trackingDetails[order.orderNumber] && (
                    <div className="mt-4 border-t border-gray-200 p-4">
                      <h4 className="mb-4 font-semibold">Tracking Details</h4>

                      {trackingDetails[order.orderNumber].awb ? (
                        <div>
                          <p>
                            <strong>AWB Code:</strong> {trackingDetails[order.orderNumber].awb}
                          </p>
                          <p>
                            <strong>Current Status:</strong>{' '}
                            {trackingDetails[order.orderNumber].status}
                          </p>
                          <p>
  <strong>Last Updated:</strong> 
  {new Date(trackingDetails[order.orderNumber].lastUpdated).toLocaleString('en-US', {
    weekday: 'long', // e.g., Monday
    year: 'numeric', // e.g., 2025
    month: 'long', // e.g., January
    day: 'numeric', // e.g., 28
    hour: 'numeric', // e.g., 6
    minute: 'numeric', // e.g., 59
    second: 'numeric', // e.g., 23
    hour12: true, // AM/PM
  })}
</p>

                          {/* Checkpoints */}
                          <div className="mt-6 space-y-4">
                            {trackingDetails[order.orderNumber].checkpoints.map(
                              (checkpoint, index) => {
                                const isLastCheckpoint =
                                  index ===
                                  trackingDetails[order.orderNumber].checkpoints.length - 1;

                                // Check if the last status is "Delivered to consignee"
                                const isDelivered =
                                  isLastCheckpoint &&
                                  checkpoint.status === 'Delivered to consignee';

                                return (
                                  <div key={index} className="flex items-start space-x-4">
                                    {/* Checkpoint Circle */}
                                    <div
                                      className={`h-6 w-6 flex-shrink-0 rounded-full ${
                                        isDelivered
                                          ? 'bg-green-500'
                                          : isLastCheckpoint
                                            ? 'bg-blue-500'
                                            : 'bg-green-500'
                                      } flex items-center justify-center`}
                                    >
                                      {isDelivered ? (
                                        <span className="text-white">✔</span> // Green checkmark for "Delivered"
                                      ) : isLastCheckpoint ? (
                                        <span className="text-white">🔵</span> // Blue circle for non-delivered last checkpoint
                                      ) : (
                                        <span className="text-gray-600">{index + 1}</span>
                                      )}
                                    </div>

                                    {/* Checkpoint Details */}
                                    <div>
                                      <p className="font-semibold">{checkpoint.status}</p>
                                      <p className="text-sm text-gray-500">{checkpoint.location}</p>
                                      <p className="text-xs text-gray-400">
                                        {new Date(checkpoint.dateTime).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          <strong>Status:</strong> {trackingDetails[order.orderNumber].status}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Cancel Order</h2>
            <p>Why are you canceling the order?</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="my-3 w-full rounded border px-4 py-2"
            >
              <option value="">Select a reason</option>
              {cancellationReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {cancelReason === 'Other' && (
              <textarea
                value={customCancelReason}
                onChange={(e) => setCustomCancelReason(e.target.value)}
                className="my-3 w-full rounded border px-4 py-2"
                placeholder="Enter custom reason"
              />
            )}
            <div className="mt-4 flex justify-end">
              <button className="mr-4 rounded bg-gray-300 px-4 py-2" onClick={closeModal}>
                Close
              </button>
              <button
                className="rounded bg-black px-4 py-2 text-white"
                onClick={confirmCancellation}
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
