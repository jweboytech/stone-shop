'use client';

import React from 'react';
import { Loader2Icon, ShoppingBag } from 'lucide-react';

import { Button } from '../ui/button';
import Drawer, { DrawerRef } from '../drawer';
import Cart from '../cart';

import { CREATE_CART } from '@/graphql/cart';
import GET_CART_COUNT from '@/graphql/query/cartCount.gql';
import localStorage from '@/utils/storage';
import CART_LINES_ADD from '@/graphql/mutation/cartLinesAdd.gql';
import { useProductStore } from '@/store/prouct';
import { useRequest } from '@/hooks/useRequest';
import gqlClient from '@/lib/graphqlClient';
import { GetCartQuery } from '@/generated/graphql';

const ProductBuyButton = ({
  variant = 'button',
}: {
  variant?: 'icon' | 'button';
}) => {
  const [isEmptyCart, setIsEmptyCart] = React.useState(false);
  const drawerRef = React.useRef<DrawerRef>(null);
  const merchandiseId = useProductStore((state) => state.merchandiseId);
  const { request: postUpdateCart, isLoading } = useRequest();
  const { request: postCreateCart, isLoading: isLoading1 } = useRequest<{
    cartCreate: CartCreate;
  }>();

  const handleClick = async () => {
    const cart = localStorage.get('cart');

    if (cart == null) {
      postCreateCart(CREATE_CART, {
        input: { lines: [{ merchandiseId, quantity: 1 }] },
      }).then(({ cartCreate }) => {
        localStorage.set('cart', cartCreate.cart.id);
        drawerRef.current?.onOpen();
      });
    } else if (merchandiseId) {
      postUpdateCart(CART_LINES_ADD, {
        lines: [{ merchandiseId, quantity: 1 }],
        cartId: cart,
      }).then(() => {
        drawerRef.current?.onOpen();
      });
    } else {
      drawerRef.current?.onOpen();
    }
  };

  React.useEffect(() => {
    const cart = localStorage.get('cart');

    if (cart != null) {
      gqlClient
        .request<GetCartQuery>(GET_CART_COUNT, {
          id: cart,
        })
        .then((data) => {
          setIsEmptyCart(data.cart?.lines.edges.length === 0);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Drawer ref={drawerRef} title="Your Cart">
        <Cart />
      </Drawer>
      {variant === 'button' && (
        <Button
          className="h-15 text-base font-bold tracking-wider uppercase w-full"
          onClick={handleClick}
          disabled={isLoading || isLoading1}>
          {(isLoading || isLoading1) && (
            <Loader2Icon className="animate-spin" />
          )}
          Add To Cart
        </Button>
      )}
      {variant === 'icon' && (
        <div className="relative">
          <ShoppingBag
            className="cursor-pointer"
            size={28}
            onClick={handleClick}
          />
          {!isEmptyCart && (
            <div className="w-2.5 h-2.5 bg-brown rounded-full absolute right-0 bottom-0" />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductBuyButton;
