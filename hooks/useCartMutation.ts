import toast from 'react-hot-toast';
import React from 'react';

import { useRequest } from './useRequest';

import CART_LINES_ADD from '@/graphql/mutation/cartLinesAdd.gql';
import CART_NOTE_UPDATE from '@/graphql/mutation/cartNoteUpdate.gql';
import CREATE_CART from '@/graphql/mutation/cartCreate.gql';
import { useProductStore } from '@/store/product';
import localStorage from '@/utils/storage';
import { useDrawerStore } from '@/store';

export const useCartMutation = () => {
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const letterMap = useProductStore((state) => state.letterMap);
  const variantData = useProductStore((state) => state.variantData);
  const { request: postUpdateCart } = useRequest();
  const { request: postCreateCart } = useRequest<{
    cartCreate: CartCreate;
  }>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { request: postUpdateCartNote } = useRequest<{
    cartNoteUpdate: any;
  }>();

  const handleClick = async () => {
    const cartId = localStorage.get('cart');
    const { merchandiseId } = variantData;
    const note = Object.entries(letterMap)
      .map(([key, value]) => `${key}:${value}`)
      .join(',');

    try {
      setIsLoading(true);

      if (note && cartId != null) {
        // 如果有订单备注就更新备注
        await postUpdateCartNote(CART_NOTE_UPDATE, { cartId, note });
      }

      // 初次创建购物车
      if (cartId == null) {
        // 开始创建购物车
        const { cartCreate } = await postCreateCart(CREATE_CART, {
          input: {
            lines: [{ merchandiseId: merchandiseId, quantity: 1 }],
          },
        });

        // 本地保存购物车 ID
        localStorage.set('cart', cartCreate.cart.id);
      } else {
        // 已存在就更新购物车
        await postUpdateCart(CART_LINES_ADD, {
          lines: [{ merchandiseId: merchandiseId, quantity: 1 }],
          cartId,
        });
      }

      setIsLoading(false);
      openDrawer();
    } catch (error) {
      toast.error('Cart addition failed. Please try again later');
      setIsLoading(false);
    }
  };

  return {
    trigger: handleClick,
    isLoading,
  };
};
