'use client';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const AccountPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const customerAccessToken = localStorage.getItem('customerAccessToken');
    if (customerAccessToken) {
      fetchAddresses(customerAccessToken);
    } else {
      setError('You must log in first.');
      setLoading(false);
    }
  }, []);

  const fetchAddresses = async (customerAccessToken) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_KEY // Your Shopify Storefront API Access Token
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
            `
        })
      });

      const data = await response.json();
      if (data.errors) {
        setError('Failed to fetch addresses');
        setLoading(false);
      } else {
        setAddresses(data.data.customer.addresses.edges);
        setLoading(false);
      }
    } catch (err) {
      setError('Error fetching customer addresses');
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
      country: address.node.country
    });
    setIsModalOpen(true); // Open the modal when Edit is clicked
  };

  const handleUpdateAddress = async () => {
    const customerAccessToken = localStorage.getItem('customerAccessToken');
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
        country: newAddress.country
      },
      customerAccessToken,
      id
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_KEY // Your Shopify Storefront API Access Token
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
          variables
        })
      });

      const data = await response.json();
      if (data.errors) {
        setError('Failed to update address');
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
      setError('Error updating the address');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when canceling the update
  };

  return (
    <div className="font-tenor-sans flex items-center justify-center text-black">
      <div className="w-full max-w-4xl p-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-6 rounded-md p-4">
              <h2 className="text-2xl font-semibold">Your Addresses</h2>
            </div>
            {addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {addresses.map((address) => (
                  <div
                    key={address.node.id}
                    className="rounded-lg bg-white p-6 text-black shadow-md"
                  >
                    <div className="mb-4 flex items-center bg-gray-300 px-2 py-2">
                      <FaMapMarkerAlt className="mr-3 text-2xl text-gray-600" />
                      <p className="text-lg font-semibold">Address:</p>
                    </div>
                    <p>
                      {address.node.address1}, {address.node.address2}
                    </p>
                    <p>
                      <strong>City:</strong> {address.node.city}
                    </p>
                    <p>
                      <strong>Province:</strong> {address.node.province}
                    </p>
                    <p>
                      <strong>Postal Code:</strong> {address.node.zip}
                    </p>
                    <p>
                      <strong>Country:</strong> {address.node.country}
                    </p>
                    <button
                      className="mt-4 flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white"
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Edit Address</h3>
                <button className="text-black" onClick={handleCloseModal}>
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
                  className="mb-2 w-full border p-2"
                />
                <input
                  type="text"
                  value={newAddress.address2}
                  onChange={(e) => setNewAddress({ ...newAddress, address2: e.target.value })}
                  placeholder="Address Line 2"
                  className="mb-2 w-full border p-2"
                />
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="City"
                  className="mb-2 w-full border p-2"
                />
                <input
                  type="text"
                  value={newAddress.province}
                  onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                  placeholder="Province"
                  className="mb-2 w-full border p-2"
                />
                <input
                  type="text"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                  placeholder="Zip Code"
                  className="mb-2 w-full border p-2"
                />
                <input
                  type="text"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  placeholder="Country"
                  className="mb-4 w-full border p-2"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md bg-black px-6 py-2 text-white"
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
