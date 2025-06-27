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
import { usePageVisible } from '@/hooks/usePageVisible';
import { useDrawerStore } from '@/store';
import { usePrevious } from '@/hooks/usePrevious';

const ProductBuyButton = ({
  variant = 'button',
}: {
  variant?: 'icon' | 'button';
}) => {
  const { visible } = usePageVisible();
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const drawerVisible = useDrawerStore((state) => state.visible);
  const merchandiseId = useProductStore((state) => state.merchandiseId);
  const prevDrawerVisible = usePrevious(drawerVisible);
  const [isEmptyCart, setIsEmptyCart] = React.useState<boolean>();
  const { request: postUpdateCart, isLoading } = useRequest();
  const { request: postCreateCart, isLoading: isLoading1 } = useRequest<{
    cartCreate: CartCreate;
  }>();

  const handleClick = async () => {
    const cart = localStorage.get('cart');

    // 初次创建购物车
    if (cart == null) {
      postCreateCart(CREATE_CART, {
        input: { lines: [{ merchandiseId, quantity: 1 }] },
      }).then(({ cartCreate }) => {
        localStorage.set('cart', cartCreate.cart.id);
        openDrawer();
      });
    } else if (merchandiseId) {
      // 后续更新购物车
      postUpdateCart(CART_LINES_ADD, {
        lines: [{ merchandiseId, quantity: 1 }],
        cartId: cart,
      }).then(() => {
        openDrawer();
      });
    }
  };

  React.useEffect(() => {
    const cart = localStorage.get('cart');

    if (cart != null) {
      // 页面切换显示 || 打开购物车抽屉之后关闭
      if (visible || (prevDrawerVisible && !drawerVisible)) {
        gqlClient
          .request<GetCartQuery>(GET_CART_COUNT, { id: cart })
          .then((data) => {
            setIsEmptyCart(data.cart?.lines.edges.length === 0);
          });
      }
    }
  }, [visible, drawerVisible]);

  return (
    <React.Fragment>
      <Drawer title="Your Cart">
        <Cart />
      </Drawer>
      {variant === 'button' && (
        <Button
          className="h-15 text-base font-bold tracking-wider uppercase w-full"
          disabled={isLoading || isLoading1}
          onClick={handleClick}>
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
