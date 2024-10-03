import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import useSWRMutation from 'swr/mutation';
import React from 'react';

import CommodityItem from './CommodityItem';

import { toUpperCase } from '@/utils';
import { getFetcher } from '@/utils/request/fetcher';
import { DrawerState } from '@/store/drawer';

const Cart = ({ visible }: Partial<DrawerState>) => {
  const { data, trigger } = useSWRMutation<Cart>('/cart', getFetcher);

  React.useEffect(() => {
    if (visible) {
      trigger();
    }
  }, [visible]);

  return (
    <div className="grid grid-cols-1">
      <div className="h-[calc(100vh-240px)] overflow-y-auto">
        {data?.items.map((item) => (
          <React.Fragment key={item.id}>
            <CommodityItem
              data={item.commodity}
              quantity={item.quantity}
              onRefresh={trigger}
            />
            <Divider />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <span className="text-base">Subtotal</span>
        <span className="text-lg">${data?.totalAmount} USD</span>
      </div>
      <div className="text-xs mb-4 text-foreground-500">
        Taxes and shipping calculated at checkout
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/checkout">
          <Button fullWidth color="primary">
            {toUpperCase('check out')}
          </Button>
        </Link>
        <Link href="/cart">
          <Button fullWidth color="primary" variant="bordered">
            {toUpperCase('view cart')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
