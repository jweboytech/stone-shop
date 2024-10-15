import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import React from 'react';

import CommodityItem from './CommodityItem';

import { serializateUrl, toUpperCase } from '@/utils';
import { getFetcher, postFetcher } from '@/utils/request/fetcher';
import { DrawerState } from '@/store/drawer';

const Cart = ({ visible, closeDrawer }: Partial<DrawerState>) => {
  const router = useRouter();
  const { data, trigger } = useSWRMutation<Cart>('/cart', getFetcher);
  const { trigger: checkout, isMutating } = useSWRMutation<Cart>(
    '/payment/checkout',
    postFetcher,
  );

  const handleCheckout = () => {
    checkout().then((data) => {
      const { orderId, ...restData } = data;

      closeDrawer!();
      setTimeout(() => {
        const url = serializateUrl('/checkout/' + orderId, restData);

        router.push(url);
      }, 300);
    });
  };

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
      <div className="grid grid-cols-2 gap-4">
        <Button
          fullWidth
          color="primary"
          isLoading={isMutating}
          onClick={handleCheckout}>
          {toUpperCase('check out')}
        </Button>
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
