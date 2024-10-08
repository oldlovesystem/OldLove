"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
                        name
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
                        currentTotalTax {
                          amount
                          currencyCode
                        }
                        currentSubtotalPrice {
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
                        successfulFulfillments {
                          trackingCompany
                          trackingInfo {
                            number
                            url
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
              "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b", // Replace with your Storefront API access token
            },
          }
        );
        console.log(response)
        if (response.data && response.data.data && response.data.data.customer) {
          const customerData = response.data.data.customer;
          setCustomer(customerData);
          setOrders(customerData.orders.edges);
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

    fetchCustomerOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {customer.firstName} {customer.lastName}</h1>
      <p>Email: {customer.email}</p>

      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(({ node: order }) => (
            <li key={order.id} className="order-item">
              <h3>Order #{order.orderNumber}</h3>
              <p>Processed At: {new Date(order.processedAt).toLocaleDateString()}</p>
              <p>Status: {order.fulfillmentStatus}</p>
              <p>Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}</p>
              <p>Total Tax: {order.currentTotalTax.amount} {order.currentTotalTax.currencyCode}</p>
              <p>Subtotal: {order.currentSubtotalPrice.amount} {order.currentSubtotalPrice.currencyCode}</p>
              <p>Billing Address: {order.billingAddress?.address1}, {order.billingAddress?.city}, {order.billingAddress?.country}</p>
              <p>Shipping Address: {order.shippingAddress?.address1}, {order.shippingAddress?.city}, {order.shippingAddress?.country}</p>
              {order.canceledAt && <p>Order Canceled At: {new Date(order.canceledAt).toLocaleDateString()}</p>}
              {order.cancelReason && <p>Cancellation Reason: {order.cancelReason}</p>}
              <h4>Items:</h4>
              <ul>
                {order.lineItems.edges.map(({ node: item }) => (
                  <li key={item.title}>
                    {item.title} (Quantity: {item.quantity})
                  </li>
                ))}
              </ul>
              <h4>Fulfillment:</h4>
              {order.successfulFulfillments.map((fulfillment, index) => (
                <p key={index}>Tracking: {fulfillment.trackingCompany}, Number: {fulfillment.trackingInfo?.number} (<a href={fulfillment.trackingInfo?.url}>Track</a>)</p>
              ))}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .dashboard {
          padding: 20px;
          max-width: 600px;
          margin: auto;
        }
        .order-item {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
        }
        h1, h2 {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
