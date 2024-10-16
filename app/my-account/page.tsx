"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

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
                <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                  <Link href={'#!'} scroll={false} className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-gray-100`}>
                    <Icon.HouseLine size={20} />
                    <strong className="heading6">Dashboard</strong>
                  </Link>
                  <Link href={'#!'} scroll={false} className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-gray-100 mt-1.5`}>
                    <Icon.Package size={20} />
                    <strong className="heading6">History Orders</strong>
                  </Link>
                  <Link href={'/login'} className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-gray-100 mt-1.5">
                    <Icon.SignOut size={20} />
                    <strong className="heading6">Logout</strong>
                  </Link>
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
                    {orders.map(({ node: order }) => (
                      <li key={order.id} className="order-item border border-gray-300 rounded-lg p-4 my-2 bg-white shadow-sm">
                        <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                        <p className="text-gray-600">Processed At: {new Date(order.processedAt).toLocaleDateString()}</p>
                        <p className="text-gray-600">Status: {order.fulfillmentStatus}</p>
                        <p className="font-bold">Total Price: {order.currentTotalPrice.amount} {order.currentTotalPrice.currencyCode}</p>
                        <p className="text-gray-600">Billing Address: {order.billingAddress?.address1}, {order.billingAddress?.city}, {order.billingAddress?.country}</p>
                        {order.canceledAt && <p className="text-red-500">Order Canceled At: {new Date(order.canceledAt).toLocaleDateString()}</p>}
                        {order.cancelReason && <p className="text-red-500">Cancellation Reason: {order.cancelReason}</p>}
                        <h4 className="font-semibold mt-3">Items:</h4>
                        <ul className="list-disc pl-5">
                          {order.lineItems.edges.map(({ node: item }) => (
                            <li key={item.title} className="text-gray-600">
                              {item.title} (Quantity: {item.quantity})
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
    </>
  );
};

export default Dashboard;
