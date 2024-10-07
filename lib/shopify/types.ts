export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  image: Image;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  acceptsMarketing: boolean;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  acceptsMarketing: boolean;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};


export type ShopifyCustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        acceptsMarketing: boolean;
      };
      customerUserErrors: Array<{
        field: string;
        message: string;
        code: string;
      }>;
    };
  };
  variables: {
    input: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      password: string;
      acceptsMarketing: boolean;
    };
  };
};

export type ShopifyGetCustomerOperation = {
  data: {
    customer: {
      id: string;
      firstName: string;
      lastName: string;
      acceptsMarketing: boolean;
      email: string;
      phone?: string;
    } | null;
  };
  variables: {
    customerAccessToken: string;
  };
};

export type ShopifyCustomerAccessTokenCreationOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: Array<{
        message: string;
      }>;
    };
  };
  variables: {
    input: {
      email: string;
      password: string;
    };
  };
};

export type ShopifyCustomerUpdateOperation = {
  data: {
    customerUpdate: {
      customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        acceptsMarketing: boolean;
      };
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: Array<{
        field: string;
        message: string;
      }>;
      userErrors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      acceptsMarketing: boolean;
    };
    customerAccessToken: string;
  };
};

export type ShopifyCustomerAddressCreationOperation = {
  data: {
    customerAddressCreate: {
      customerAddress: {
        address1: string;
        address2: string;
        city: string;
        company: string;
        country: string;
        firstName: string;
        lastName: string;
        phone: string;
        province: string;
        zip: string;
      };
      customerUserErrors: Array<{
        field: string;
        message: string;
      }>;
      userErrors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    address: {
      address1: string;
      address2: string;
      city: string;
      company: string;
      country: string;
      firstName: string;
      lastName: string;
      phone: string;
      province: string;
      zip: string;
    };
    customerAccessToken: string;
  };
};

export type ShopifyCustomerAddressUpdateOperation = {
  data: {
    customerAddressUpdate: {
      customerAddress: {
        address1: string;
        address2: string;
        city: string;
        company: string;
        country: string;
        firstName: string;
        lastName: string;
        phone: string;
        province: string;
        zip: string;
      };
      customerUserErrors: Array<{
        field: string;
        message: string;
      }>;
      userErrors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    address: {
      address1: string;
      address2: string;
      city: string;
      company: string;
      country: string;
      firstName: string;
      lastName: string;
      phone: string;
      province: string;
      zip: string;
    };
    customerAccessToken: string;
    id: string;
  };
};

export type ShopifyCustomerActivateOperation = {
  data: {
    customerActivate: {
      customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        acceptsMarketing: boolean;
      };
      customerAccessToken: {
        accessToken: string;
      };
      customerUserErrors: Array<{
        field: string;
        message: string;
      }>;
      userErrors: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  variables: {
    id: string;
    input: {
      password: string;
    };
  };
};

export type ShopifyCustomerUpdateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
  variables: {
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      acceptsMarketing: boolean;
    };
  }
};

export type ShopifyAddressInput = {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  zip: string;
  variables: {
    address: {
      address1: string;
      address2: string;
      city: string;
      company: string;
      country: string;
      firstName: string;
      lastName: string;
      phone: string;
      province: string;
      zip: string;
    };
  };
  customerAccessToken: string;
  id: string;
};