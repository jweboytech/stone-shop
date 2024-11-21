'use client';

import { Checkbox } from '@nextui-org/checkbox';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { CircleCheck } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import { formatPrice, getCardLast, serializateUrl } from '@/utils';
import { getFetcher } from '@/utils/request/fetcher';
import Description from '@/components/description';
import DescriptionItem from '@/components/description/item';
import CommodityMetadata from '@/components/commodity/metadata';

function ResultPage() {
  const params = useParams();

  const { data: order } = useSWR<Order>(
    params.id ? serializateUrl('/order/detail', { id: params.id }) : null,
    getFetcher,
  );

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center mt-16">
        <div className="flex gap-4 items-center">
          <CircleCheck className="text-success" size={56} />
          <div className="flex flex-col justify-center">
            <span className="text-sm text-foreground-600">
              Confirmation #{order?.id}
            </span>
            <span className="text-xl font-bold">Thank you!</span>
          </div>
        </div>
        <Link href="/">
          <Button color="primary">Continue shopping</Button>
        </Link>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6 flex-1">
          <Card>
            <CardHeader className="text-base font-semibold">
              Your order is confirmed
            </CardHeader>
            <CardBody className="gap-4">
              <span className="text-foreground-500 text-sm">
                You&apos;ll receive a confirmation email with your order number
                shortly.
              </span>
              <Checkbox>
                <span className="text-sm">Email me with news and offers</span>
              </Checkbox>
            </CardBody>
          </Card>
          <Card className="h-40">
            <CardBody>Google Map</CardBody>
          </Card>
          <Card title="Order details">
            <CardHeader className="font-medium">Order details</CardHeader>
            <CardBody>
              <Description columns={2}>
                <DescriptionItem
                  label="Contact information"
                  value={order?.email}
                />
                <DescriptionItem
                  label="Payment method"
                  value={
                    <div className="flex">
                      <span>{order?.cardBrand}</span>
                      <span>{getCardLast(order?.cardLast)}</span>
                      <span>{formatPrice(order?.totalAmount)}</span>
                    </div>
                  }
                />
                <DescriptionItem
                  label="Shipping address"
                  value={
                    <div className="flex flex-col">
                      <span>{order?.shipping.name}</span>
                      <div className="inline-flex items-center gap-2">
                        <span>{order?.shipping.address.line1}</span>
                        <span>{order?.shipping.address.state}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <span>{order?.shipping.address.postalCode}</span>
                        <span>{order?.shipping.address.city}</span>
                      </div>
                      <span>{order?.shipping.address.country}</span>
                    </div>
                  }
                />
                <DescriptionItem
                  label="Shipping method"
                  value={order?.deliveryMethod}
                />
              </Description>
            </CardBody>
          </Card>
        </div>
        {order != null && <CommodityMetadata data={order} />}
      </div>
    </div>
  );
}

export default ResultPage;
