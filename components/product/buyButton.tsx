'use client';

import React from 'react';

import { Button } from '../ui/button';
import CartDrawer, { CartDrawerRef } from '../drawer';

import gqlClient from '@/lib/graphqlClient';
import { CREATE_CART } from '@/graphql/cart';
import localStorage from '@/utils/storage';
import { formatPrice } from '@/utils/price';
import { ShoppingBag } from 'lucide-react';
import Cart from '../cart';

const ProductBuyButton = ({
  merchandiseId,
  variant = 'button',
}: {
  merchandiseId?: string;
  variant?: 'icon' | 'button';
}) => {
  const drawerRef = React.useRef<CartDrawerRef>(null);

  const handleClick = async () => {
    if (localStorage.get('cart') == null) {
      const { cartCreate } = await gqlClient.request<{
        cartCreate: CartCreate;
      }>(CREATE_CART, { input: { lines: [{ merchandiseId, quantity: 1 }] } });

      localStorage.set('cart', cartCreate.cart.id);
    } else {
      drawerRef.current?.onOpen();
    }
  };

  return (
    <React.Fragment>
      <CartDrawer ref={drawerRef} title="Your Cart">
        <Cart />
      </CartDrawer>
      {variant === 'button' && <Button onClick={handleClick}>Buy Now</Button>}
      {variant === 'icon' && (
        <ShoppingBag
          className="cursor-pointer"
          size={28}
          onClick={handleClick}
        />
      )}
    </React.Fragment>
  );
};

export default ProductBuyButton;
