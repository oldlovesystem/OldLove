"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [editedName, setEditedName] = useState({ firstName: "", lastName: "" });
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({ firstName: false, lastName: false, phone: false, email: false });
  const [resetEmail, setResetEmail] = useState(""); // New state for reset email

  const fetchCustomerData = async () => {
    const accessToken = localStorage.getItem("customerAccessToken");
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
            query GetCustomer {
              customer(customerAccessToken: "${accessToken}") {
                id
                firstName
                lastName
                email
                phone
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b",
          },
        }
      );
      console.log(response);
      if (response.data && response.data.data.customer) {
        const customerData = response.data.data.customer;
        setCustomer(customerData);
        setEditedName({ firstName: customerData.firstName, lastName: customerData.lastName });
        setEditedEmail(customerData.email);
        setEditedPhone(customerData.phone || "");
      } else {
        setError("No customer data found.");
      }
    } catch (err) {
      setError("Error fetching customer data.");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomerInfo = async () => {
    const accessToken = localStorage.getItem("customerAccessToken");
    if (!accessToken) {
      setError("No customer access token found.");
      return;
    }

    try {
      await axios.post(
        "https://9eca2f-11.myshopify.com/api/2024-07/graphql.json",
        {
          query: `
            mutation UpdateCustomer($customerAccessToken: String!, $firstName: String, $lastName: String, $phone: String, $email: String) {
              customerUpdate(
                customerAccessToken: $customerAccessToken,
                customer: {
                  firstName: $firstName,
                  lastName: $lastName,
                  phone: $phone,
                  email: $email
                }
              ) {
                customer {
                  id
                  firstName
                  lastName
                  phone
                  email
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            customerAccessToken: accessToken,
            firstName: editedName.firstName,
            lastName: editedName.lastName,
            phone: editedPhone,
            email: editedEmail,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b",
          },
        }
      );

      alert("Customer information updated successfully!");
      fetchCustomerData();
      setIsEditing({ firstName: false, lastName: false, phone: false, email: false });
    } catch (error) {
      setError("Error saving customer details.");
    }
  };

  const handleCancelEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    if (field === "firstName") {
      setEditedName({ firstName: customer.firstName, lastName: editedName.lastName });
    } else if (field === "lastName") {
      setEditedName({ firstName: editedName.firstName, lastName: customer.lastName });
    } else if (field === "phone") {
      setEditedPhone(customer.phone || "");
    } else if (field === "email") {
      setEditedEmail(customer.email);
    }
  };

  const handleResetPassword = async () => {
    if (!editedEmail) {
      setError("Email is required to reset password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://9eca2f-11.myshopify.com/api/2024-07/graphql.json",
        {
          query: `
            mutation customerRecover($email: String!) {
              customerRecover(email: $email) {
                customerUserErrors {
                  field
                  message
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            email: editedEmail,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b",
            "Shopify-Storefront-Buyer-IP": "YOUR_TRUSTED_IP_HERE", // replace with actual IP if needed
          },
        }
      );

      if (response.data.data.customerRecover.userErrors.length) {
        setError("Error sending reset password email.");
      } else {
        alert("Reset password email sent successfully! Please check your inbox.");
      }
    } catch (error) {
      setError("Error sending reset password request.");
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>

        {/* Editable Fields */}
        {["firstName", "lastName", "email", "phone"].map((field, index) => (
          <div key={index} className="mb-4 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-gray-600 font-semibold mb-1">
                  {field === "firstName" ? "First Name" : field === "lastName" ? "Last Name" : field === "email" ? "Email" : "Mobile Number"}
                </label>
                {isEditing[field] ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={field === "firstName" ? editedName.firstName : field === "lastName" ? editedName.lastName : field === "phone" ? editedPhone : editedEmail}
                    onChange={(e) => {
                      if (field === "firstName") {
                        setEditedName((prev) => ({ ...prev, firstName: e.target.value }));
                      } else if (field === "lastName") {
                        setEditedName((prev) => ({ ...prev, lastName: e.target.value }));
                      } else if (field === "phone") {
                        setEditedPhone(e.target.value);
                      } else if (field === "email") {
                        setEditedEmail(e.target.value);
                      }
                    }}
                    className="border border-gray-300 rounded-lg p-2 w-full mb-1"
                  />
                ) : (
                  <div className="text-gray-800 mb-1">{field === "firstName" ? customer.firstName : field === "lastName" ? customer.lastName : field === "phone" ? customer.phone || "N/A" : customer.email}</div>
                )}
              </div>
              {isEditing[field] ? (
                <>
                  <button
                    onClick={updateCustomerInfo}
                    className="bg-gray-300 text-black rounded-lg px-2 ml-2 mt-6"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelEdit(field)}
                    className="bg-gray-300 text-black rounded-lg px-2 ml-2 mt-6"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing({ ...isEditing, [field]: true })}
                  className="bg-gray-300 text-black rounded-lg px-2 ml-2"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

        {/* <div className="mt-4">
          <a href="/reset-password" className="text-blue-600 hover:underline" onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleResetPassword();
          }}>Reset Password</a>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
