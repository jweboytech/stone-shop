'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

import { Button } from '../ui/button';
import Drawer, { DrawerRef } from '../drawer';
import Cart from '../cart';

import gqlClient from '@/lib/graphqlClient';
import { CREATE_CART } from '@/graphql/cart';
import localStorage from '@/utils/storage';
import CART_LINES_ADD from '@/graphql/mutation/cartLinesAdd.gql';

const ProductBuyButton = ({
  merchandiseId,
  variant = 'button',
}: {
  merchandiseId?: string;
  variant?: 'icon' | 'button';
}) => {
  const drawerRef = React.useRef<DrawerRef>(null);
  
  const handleClick = async () => {
    const cart = localStorage.get('cart');
    if (localStorage.get('cart') == null) {
      const { cartCreate } = await gqlClient.request<{
        cartCreate: CartCreate;
      }>(CREATE_CART, { input: { lines: [{ merchandiseId, quantity: 1 }] } });

      localStorage.set('cart', cartCreate.cart.id);
    } else {
      await gqlClient.request(CART_LINES_ADD, {
        cartId: cart,
        lines: [
          {
            merchandiseId: 'gid://shopify/ProductVariant/46641915953372',
            quantity: 1,
          },
        ],
      });
    }
    drawerRef.current?.onOpen();
  };

  return (
    <React.Fragment>
      <Drawer ref={drawerRef} title="Your Cart">
        <Cart />
      </Drawer>
      {variant === 'button' && (
        <Button
          className="h-15 text-base font-bold tracking-wider uppercase w-full"
          onClick={handleClick}>
          Add To Cart
        </Button>
      )}
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
