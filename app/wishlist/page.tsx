'use client';

import { useEffect, useState } from 'react';
import ProductGridItems from 'components/layout/product-grid-items';
import Link from 'next/link';

export default function WishlistPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Fetch email from local storage
    const userEmail = localStorage.getItem('customeremail');
    if (!userEmail) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }
    setEmail(userEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const fetchWishlistAndProducts = async () => {
      try {
        setLoading(true);

        // Fetch wishlist product IDs
        const wishlistResponse = await fetch(`https://cancelorder.vercel.app/wishlist/${email}`);
        if (!wishlistResponse.ok) {
          throw new Error('Failed to fetch wishlist.');
        }
        const { productIds } = await wishlistResponse.json();
        console.log(productIds);

        if (!productIds || productIds.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Fetch product details from Shopify
        const shopifyResponses = await Promise.all(
          productIds.map((id: string) =>
            fetch('https://9eca2f-11.myshopify.com/api/2023-10/graphql.json', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b',
              },
              body: JSON.stringify({
                query: `
                  query getProduct($id: ID!) {
                    product(id: $id) {
                      id
                      handle
                      availableForSale
                      title
                      description
                      descriptionHtml
                      options {
                        id
                        name
                        values
                      }
                      priceRange {
                        maxVariantPrice {
                          amount
                          currencyCode
                        }
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                      variants(first: 250) {
                        edges {
                          node {
                            id
                            title
                            image {
                              id
                              src
                              altText
                              width
                              height
                            }
                            availableForSale
                            selectedOptions {
                              name
                              value
                            }
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                      featuredImage {
                        id
                        url
                        altText
                        width
                        height
                      }
                      images(first: 45) {
                        edges {
                          node {
                            id
                            src
                            altText
                            width
                            height
                          }
                        }
                      }
                      seo {
                        title
                        description
                      }
                      tags
                      updatedAt
                    }
                  }
                `,
                variables: {
                  id: `${id}`,
                },
              }),
            })
          )
        );

        const productData = await Promise.all(
          shopifyResponses.map((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch product details.');
            }
            return response.json();
          })
        );

        const fetchedProducts = productData.map((data) => data.data.product);
        setProducts(fetchedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistAndProducts();
  }, [email]);

  const handleLogin = (userEmail: string) => {
    localStorage.setItem('email', userEmail);
    setEmail(userEmail);
    setShowLoginModal(false);
  };

  if (loading) {
    return <p>Loading your wishlist...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="bg-white min-h-screen ml-5 lg:ml-14">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {products.length === 0 ? (
        <div className="py-3 text-lg text-center text-gray-500">
          Your wishlist is empty.{' '}
          <span className="text-blue-500 hover:underline">
            Please <Link href="/search">add items</Link> to your wishlist!
          </span>
        </div>
      ) : (
        <ProductGridItems products={products} />
      )}

{showLoginModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    style={{ backdropFilter: 'blur(4px)' }}
  >
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
      {/* Close button */}


      <h2 className="text-xl font-bold mb-4">Login Required</h2>
      <p className="text-gray-700 mb-6">Please log in to view your wishlist.</p>

      <Link href={"/login"}>
        <button className="button-main text-white px-4 py-2 rounded w-full">Login</button>
      </Link>
    </div>
  </div>
)}
    </section>
  );
}
