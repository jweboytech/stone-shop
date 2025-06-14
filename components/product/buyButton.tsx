'use client';

import React from 'react';

import { Button } from '../ui/button';
import CartDrawer, { CartDrawerRef } from '../drawer';

import gqlClient from '@/lib/graphqlClient';
import { CREATE_CART } from '@/graphql/cart';
import localStorage from '@/utils/storage';
import { formatPrice } from '@/utils/price';
import { ShoppingBag } from 'lucide-react';
import VisaIcon from '../icons/visa';
import AmexIcon from '../icons/amex';
import ApplePayIcon from '../icons/applePay';
import PaypalIcon from '../icons/paypal';
import GooglePayIcon from '../icons/googlePay';
import MasterIcon from '../icons/master';

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
        <div className="flex flex-col h-full">
          <div className="py-3 bg-surface-light">
            <p className="text-center uppercase text-sm font-semibold text-amber">
              new season sale
            </p>
            <p className="text-center uppercase text-sm font-bold">
              Buy 1 & Get Any 2nd Free
            </p>
          </div>
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
            <div className="flex gap-2 items-center justify-center pt-4">
              <AmexIcon />
              <ApplePayIcon />
              <GooglePayIcon />
              <MasterIcon />
              <PaypalIcon />
              <VisaIcon />
            </div>
          </div>
        </div>
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
