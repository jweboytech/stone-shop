'use client';

import React from 'react';

import { CREATE_CART } from '@/graphql/cart';
import gqlClient from '@/lib/graphqlClient';

const ProductBuyButton = () => {
  const handleClick = async () => {
    const { cartCreate } = await gqlClient.request<{ cartCreate: CartCreate }>(
      CREATE_CART,
      {
        input: {
          lines: [
            {
              merchandiseId: 'gid://shopify/ProductVariant/46624197345500',
              quantity: 1,
            },
          ],
        },
      },
    );

    window.open(cartCreate.cart.checkoutUrl, '__blank');
  };

  return (
    <div aria-hidden onClick={handleClick}>
      ProductBuyButton
    </div>
  );
};

export default ProductBuyButton;
