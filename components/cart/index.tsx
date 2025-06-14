import React from 'react';

import VisaIcon from '../icons/visa';
import AmexIcon from '../icons/amex';
import ApplePayIcon from '../icons/applePay';
import PaypalIcon from '../icons/paypal';
import GooglePayIcon from '../icons/googlePay';
import MasterIcon from '../icons/master';
import { CartDrawerProps } from '../drawer';
import { Button } from '../ui/button';

import ProductItem from './productItem';

import { formatPrice } from '@/utils';
import gqlClient from '@/lib/graphqlClient';
import localStorage from '@/utils/storage';
import GET_CART from '@/graphql/query/cart.gql';
import { GetCartQuery } from '@/generated/graphql';

const Cart = ({ isOpen }: CartDrawerProps) => {
  const [details, setDetails] = React.useState<GetCartQuery>();
  const cart = localStorage.get('cart');

  React.useEffect(() => {
    if (isOpen) {
      gqlClient.request<GetCartQuery>(GET_CART, { id: cart }).then((data) => {
        setDetails(data);
      });
    }
  }, [isOpen]);

  // const handleCheckout = () => {
  //   checkout().then((data) => {
  //     const { orderId, ...restData } = data;

  //     closeDrawer!();
  //     setTimeout(() => {
  //       const url = serializateUrl('/checkout/' + orderId, restData);

  //       router.push(url);
  //     }, 300);
  //   });
  // };

  return (
    <div className="flex flex-col h-full">
      {/* <div className="py-3 bg-surface-light border-t border-t-neutral-light border-b border-b-neutral-light">
        <p className="text-center uppercase text-sm font-semibold text-amber">
          new season sale
        </p>
        <p className="text-center uppercase text-sm font-bold">
          Buy 1 & Get Any 2nd Free
        </p>
      </div> */}
      <div className="flex-1 py-2 px-8">
        {details?.cart?.lines.edges.map(({ node }) => (
          <ProductItem
            key={node.id}
            cartId={cart}
            data={node}
            skuId={node.id}
          />
        ))}
      </div>
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
  );
};

export default Cart;
