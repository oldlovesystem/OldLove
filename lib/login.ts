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
      return { success: true, token: customerAccessToken.accessToken };
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
