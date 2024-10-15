'use client';

import useSWR from 'swr';

import { getFetcher } from '@/utils/request/fetcher';
import { formatPrice, formatTime, serializateUrl } from '@/utils';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { CircleCheck } from 'lucide-react';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

const AccountOrders = () => {
  const router = useRouter();

  const { data } = useSWR<Order[]>(
    serializateUrl('/order/list', { page: 1, size: 100 }),
    getFetcher,
  );

  const handleBuyAgain = () => {
    router.push('/cart');
  };

  const handleCardClick = (orderId: string) => {
    router.push(`/account/orders/${orderId}`);
  };

  return (
    <div className="px-10 py-10 grid grid-cols-1 gap-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {data?.map((item) => {
          const { items } = item.metadata;
          const commodity = items[0].commodity;

          return (
            <Link key={item.id}>
              <Card isPressable onPress={() => handleCardClick(item.orderId)}>
                <CardBody>
                  <div className="flex gap-4 items-center bg-[#f4f4f4] rounded-lg px-5 py-5">
                    <CircleCheck className="text-success" size={32} />
                    <div className="flex flex-col justify-center">
                      <span className="text-xs">Confirmed</span>
                      <span className="text-xs">
                        Last updated {formatTime(item.updateAt, 'MMM D')}
                      </span>
                    </div>
                  </div>
                  <Image alt={commodity.name} src={commodity.mainPics[0]} />
                  <div className="text-sm font-semibold">
                    {items.length}&nbsp;item{items.length > 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-foreground-500">
                    Order #{item.id}
                  </div>
                  <div className="text-sm font-semibold pt-3">
                    {formatPrice(item.totalAmount)}
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    className="mb-2"
                    color="primary"
                    size="lg"
                    variant="bordered"
                    onClick={handleBuyAgain}>
                    Buy again
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AccountOrders;
