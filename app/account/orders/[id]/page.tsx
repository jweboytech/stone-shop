'use client';

import CommodityMetadata from '@/components/commodity/metadata';
import OrderDetails from '@/components/order/details';
import { formatTime, serializateUrl } from '@/utils';
import { getFetcher } from '@/utils/request/fetcher';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';
import { ArrowLeft, CircleCheck, MoveLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const OrderDetailsPage = () => {
  const params = useParams();
  const { data: order, isLoading } = useSWR<Order>(
    params.id ? serializateUrl('/order/detail', { id: params.id }) : null,
    getFetcher,
  );

  return (
    <div className="py-6 px-7">
      <div className="flex justify-between mb-6">
        <div className="inline-flex items-start gap-2">
          <ArrowLeft className="mt-1 cursor-pointer" size={20} />
          <div>
            <h1 className="text-xl font-semibold">Order #{order?.id}</h1>
            <p className="text-sm text-foreground-600">
              Confirmed {formatTime(order?.updateAt, 'MMM D')}
            </p>
          </div>
        </div>
        <Link href="/cart">
          <Button color="primary" variant="bordered">
            Buy again
          </Button>
        </Link>
      </div>
      {!isLoading ? (
        <div className="flex gap-6">
          <div className="flex flex-col gap-6 flex-1">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-start">
                    <CircleCheck className="text-success" size={32} />
                    <div className="flex flex-col justify-center">
                      <span className="text-base font-semibold text-foreground-600">
                        Confirmed
                      </span>
                      <span className="text-sm text-foreground-500">
                        Updated {formatTime(order?.updateAt, 'MMM D YYYY')}
                      </span>
                      <span className="text-sm text-foreground-500 mt-4">
                        We&apos;ve received your order.
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <OrderDetails data={order!} />
          </div>
          <CommodityMetadata data={order!} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default OrderDetailsPage;
