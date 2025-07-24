'use client';

import React from 'react';
import { Loader2Icon, ShoppingBag } from 'lucide-react';

import { Button } from '../ui/button';
import Drawer from '../drawer';
import Cart from '../cart';

import localStorage from '@/utils/storage';
import GET_CART_COUNT from '@/graphql/query/cartCount.gql';
import gqlClient from '@/lib/graphqlClient';
import { GetCartQuery } from '@/generated/graphql';
import { usePageVisible } from '@/hooks/usePageVisible';
import { useDrawerStore } from '@/store';
import { usePrevious } from '@/hooks/usePrevious';
import { useCartMutation } from '@/hooks/useCartMutation';

const ProductBuyButton = ({
  variant = 'button',
  buttonType = 'default',
  triggerLoading,
}: {
  variant?: 'icon' | 'button';
  buttonType?: 'submit' | 'default';
  triggerLoading?: boolean;
}) => {
  const { pageVisible } = usePageVisible();
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const drawerVisible = useDrawerStore((state) => state.visible);
  const prevDrawerVisible = usePrevious(drawerVisible);
  const [isEmptyCart, setIsEmptyCart] = React.useState<boolean>();
  const { trigger, isLoading } = useCartMutation();
  const isButtonLoading = triggerLoading || isLoading;
  const [cartNotes, setCartNotes] = React.useState<AnyObject>({});

  React.useEffect(() => {
    const cart = localStorage.get('cart');

    if (cart != null) {
      // 页面切换显示 || 打开购物车抽屉之后关闭
      if (pageVisible || (prevDrawerVisible && !drawerVisible)) {
        gqlClient
          .request<GetCartQuery>(GET_CART_COUNT, { id: cart })
          .then((data) => {
            const notes = data.cart?.note?.split(',').reduce((obj, item) => {
              const [label, value] = item.split(':');

              obj[label] = value;

              return obj;
            }, {});

            setCartNotes(notes);
            setIsEmptyCart(!data.cart?.lines.edges.length);
          });
      }
    }
  }, [pageVisible, drawerVisible]);

  return (
    <React.Fragment>
      <Drawer title="Your Cart">
        <Cart cartNotes={cartNotes} />
      </Drawer>
      {variant === 'button' && (
        <React.Fragment>
          {buttonType === 'default' && (
            <Button
              className="h-15 text-base font-bold tracking-wider uppercase w-full"
              disabled={isButtonLoading}
              onClick={trigger}>
              {isButtonLoading && <Loader2Icon className="animate-spin" />}
              Add To Cart
            </Button>
          )}
          {buttonType === 'submit' && (
            <Button
              className="h-15 text-base font-bold tracking-wider uppercase w-full"
              disabled={isButtonLoading}
              type="submit">
              {isButtonLoading && <Loader2Icon className="animate-spin" />}
              Add To Cart
            </Button>
          )}
        </React.Fragment>
      )}
      {variant === 'icon' && (
        <div className="relative">
          <ShoppingBag
            className="cursor-pointer"
            size={28}
            onClick={openDrawer}
          />
          {isEmptyCart != null && !isEmptyCart && (
            <div className="w-2.5 h-2.5 bg-brown rounded-full absolute right-0 bottom-0" />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductBuyButton;
