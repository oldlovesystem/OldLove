import axios from 'axios';

// Interface for Shopify login response
interface ShopifyResponse {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
}

// Login function using Shopify Storefront API
export async function loginShopify(
  email: string,
  password: string
): Promise<{ success: boolean; token?: string; message?: string }> {
  const shopifyUrl = `https://9eca2f-11.myshopify.com/api/2023-01/graphql.json`;
  const data = {
    query: `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        email,
        password,
      },
    },
  };

  try {
    const response = await axios.post<ShopifyResponse>(shopifyUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b',
      },
    });

    const { customerAccessToken, userErrors } =
      response.data.data.customerAccessTokenCreate;

    if (customerAccessToken) {
      // Store the access token
      const accessToken = customerAccessToken.accessToken;

      // Make a background request to get customer details
      fetchCustomerDetails(accessToken);

      return { success: true, token: accessToken };
    } else {
      return {
        success: false,
        message: userErrors[0]?.message || 'Invalid login credentials',
      };
    }
  } catch (error) {
    return { success: false, message: 'Server error' };
  }
}

// Function to fetch customer details and store the first name in local storage
async function fetchCustomerDetails(accessToken: string): Promise<void> {
  const shopifyUrl = `https://9eca2f-11.myshopify.com/api/2024-07/graphql.json`;
  const query = `
    query GetCustomer {
      customer(customerAccessToken: "${accessToken}") {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    const response = await axios.post(
      shopifyUrl,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b',
        },
      }
    );

    const customer = response.data.data.customer;
    if (customer && customer.firstName) {
      // Store the first name in local storage
      localStorage.setItem('customerFirstName', customer.firstName);
      localStorage.setItem('customeremail', customer.email);
    }
  } catch (error) {
    console.error('Failed to fetch customer details', error);
  }
}
