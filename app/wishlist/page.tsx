'use client';

import { useEffect, useState } from 'react';
import ProductGridItems from 'components/layout/product-grid-items';
import Link from 'next/link';
import { Oval } from 'react-loader-spinner';

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
            fetch(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_KEY
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
                  id: `${id}`
                }
              })
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
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading your wishlist...</p>
      </div>
    )
   
  }

  return (
    <section className="ml-5 min-h-screen bg-white lg:ml-14">
      <h1 className="mb-6 text-2xl font-bold">Your Wishlist</h1>

      {products.length === 0 ? (
        <div className="py-3 text-center text-lg text-gray-500">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div className="relative w-full max-w-sm rounded bg-white p-6 shadow-lg">
            {/* Close button */}

            <h2 className="mb-4 text-xl font-bold">Login Required</h2>
            <p className="mb-6 text-gray-700">Please log in to view your wishlist.</p>

            <Link href={'/login'}>
              <button className="button-main w-full rounded px-4 py-2 text-white">Login</button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
