'use client';

import React from 'react';

import { Button } from '../ui/button';
import CartDrawer, { CartDrawerRef } from '../drawer';

import gqlClient from '@/lib/graphqlClient';
import { CREATE_CART } from '@/graphql/cart';
import localStorage from '@/utils/storage';
import { formatPrice } from '@/utils/price';

const ProductBuyButton = ({ merchandiseId }: { merchandiseId: string }) => {
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
        <div className="flex flex-col">
          <div className="flex-1">sd</div>
          <div className="px-8 pb-2 bg-surface-light">
            <div className="flex items-center justify-between py-2">
              <span className="uppercase font-bold text-14 tracking-wider">
                subtotal
              </span>
              <span className="font-bold text-14">{formatPrice(79)}</span>
            </div>
            <hr className="border-surface-muted" />
            <div className="flex items-center justify-between py-2">
              <span className="uppercase font-bold text-14 tracking-wider">
                shipping
              </span>
              <span className="uppercase font-bold text-14 tracking-wider">
                free
              </span>
            </div>
            <Button className="w-full h-15 font-bold text-base uppercase mt-1 tracking-widest">
              Safe Checkout
            </Button>
            <ul>
              <li>Card List TODO</li>
            </ul>
          </div>
        </div>
      </CartDrawer>
      <Button onClick={handleClick}>Buy Now</Button>
    </React.Fragment>
  );
};

export default ProductBuyButton;
