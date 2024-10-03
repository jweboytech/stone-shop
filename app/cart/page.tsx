'use client';

import React from 'react';
import useSWR from 'swr';

import { getFetcher } from '@/utils/request/fetcher';
import CommodityItem from '@/components/cart/CommodityItem';

const Cart = () => {
  const { data, mutate } = useSWR<Cart>('/cart', getFetcher);

  return (
    <div>
      {data?.items.map((item) => (
        <CommodityItem
          key={item.id}
          data={item.commodity}
          quantity={item.quantity}
          onRefresh={mutate}
        />
      ))}
    </div>
  );
};

export default Cart;
