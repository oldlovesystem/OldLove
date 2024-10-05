export const registerCustomer = async (email, password, firstName, lastName) => {
    const query = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;
  
    const variables = {
      input: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    };
  
    try {
      const response = await fetch(`https://9eca2f-11.myshopify.com/api/2024-07/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'e5f230e4a5202dc92cf9d9341c72bc5b',
        },
        body: JSON.stringify({ query, variables }),
      });
  
      const result = await response.json();
      if (result.data.customerCreate.customerUserErrors.length > 0) {
        throw new Error(result.data.customerCreate.customerUserErrors[0].message);
      }
  
      return result.data.customerCreate.customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error(error.message || 'Customer registration failed');
    }
  };
  