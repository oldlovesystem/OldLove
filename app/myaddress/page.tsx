"use client";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Add an icon for location
import { MdClose } from "react-icons/md"; // Close icon for the modal

const AccountPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  useEffect(() => {
    const customerAccessToken = localStorage.getItem("customerAccessToken");
    if (customerAccessToken) {
      fetchAddresses(customerAccessToken);
    } else {
      setError("You must log in first.");
      setLoading(false);
    }
  }, []);

  const fetchAddresses = async (customerAccessToken) => {
    try {
      const response = await fetch(
        "https://9eca2f-11.myshopify.com/api/2024-07/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b", // Your Shopify Storefront API Access Token
          },
          body: JSON.stringify({
            query: `
              query {
                customer(customerAccessToken: "${customerAccessToken}") {
                  addresses(first: 10) {
                    edges {
                      node {
                        id
                        address1
                        address2
                        city
                        province
                        zip
                        country
                      }
                    }
                  }
                }
              }
            `,
          }),
        }
      );

      const data = await response.json();
      if (data.errors) {
        setError("Failed to fetch addresses");
        setLoading(false);
      } else {
        setAddresses(data.data.customer.addresses.edges);
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching customer addresses");
      setLoading(false);
    }
  };

  const handleEditClick = (address) => {
    // Populate the form with the selected address's data and open the modal
    setSelectedAddress(address);
    setNewAddress({
      address1: address.node.address1,
      address2: address.node.address2,
      city: address.node.city,
      province: address.node.province,
      zip: address.node.zip,
      country: address.node.country,
    });
    setIsModalOpen(true); // Open the modal when Edit is clicked
  };

  const handleUpdateAddress = async () => {
    const customerAccessToken = localStorage.getItem("customerAccessToken");
    if (!customerAccessToken || !selectedAddress) {
      return;
    }

    const { id } = selectedAddress.node;

    const variables = {
      address: {
        address1: newAddress.address1,
        address2: newAddress.address2,
        city: newAddress.city,
        province: newAddress.province,
        zip: newAddress.zip,
        country: newAddress.country,
      },
      customerAccessToken,
      id,
    };

    try {
      const response = await fetch("https://9eca2f-11.myshopify.com/api/2024-07/graphql.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "e5f230e4a5202dc92cf9d9341c72bc5b", // Your Shopify Storefront API Access Token
        },
        body: JSON.stringify({
          query: `
            mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
              customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
                customerAddress {
                  address1
                  address2
                  city
                  province
                  zip
                  country
                }
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
          variables,
        }),
      });

      const data = await response.json();
      if (data.errors) {
        setError("Failed to update address");
      } else {
        const updatedAddress = data.data.customerAddressUpdate.customerAddress;

        // Update the addresses state with the updated address
        setAddresses((prev) => {
          return prev.map((address) => {
            if (address.node.id === updatedAddress.id) {
              return { ...address, node: updatedAddress };
            }
            return address;
          });
        });

        setIsModalOpen(false); // Close the modal after updating
        setSelectedAddress(null); // Clear selected address after update
      }
    } catch (err) {
      setError("Error updating the address");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when canceling the update
  };

  return (
    <div className="text-black flex items-center justify-center">
      <div className="w-full max-w-4xl p-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="p-4 rounded-md mb-6">
              <h2 className="text-2xl font-semibold">Your Addresses</h2>
            </div>
            {addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.node.id}
                    className="bg-white text-black p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4 bg-gray-300 py-2 px-2">
                      <FaMapMarkerAlt className="text-2xl mr-3 text-gray-600" />
                      <p className="font-semibold text-lg">Address:</p>
                    </div>
                    <p>{address.node.address1}, {address.node.address2}</p>
                    <p><strong>City:</strong> {address.node.city}</p>
                    <p><strong>Province:</strong> {address.node.province}</p>
                    <p><strong>Postal Code:</strong> {address.node.zip}</p>
                    <p><strong>Country:</strong> {address.node.country}</p>
                    <button
                      className="text-white bg-black py-2 px-4 rounded-md flex items-center gap-2 mt-4"
                      onClick={() => handleEditClick(address)}
                    >
                    Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal for editing address */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Edit Address</h3>
                <button
                  className="text-black"
                  onClick={handleCloseModal}
                >
                  <MdClose className="text-2xl" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateAddress();
                }}
              >
                <input
                  type="text"
                  value={newAddress.address1}
                  onChange={(e) => setNewAddress({ ...newAddress, address1: e.target.value })}
                  placeholder="Address Line 1"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newAddress.address2}
                  onChange={(e) => setNewAddress({ ...newAddress, address2: e.target.value })}
                  placeholder="Address Line 2"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="City"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newAddress.province}
                  onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                  placeholder="Province"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                  placeholder="Zip Code"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  placeholder="Country"
                  className="border p-2 w-full mb-4"
                />
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-6 rounded-md flex items-center gap-2"
                >
                  <FaMapMarkerAlt /> Update Address
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
