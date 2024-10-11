import { Badge } from '@nextui-org/badge';
import { Divider } from '@nextui-org/divider';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import React from 'react';

import { formatPrice } from '@/utils';

const CommodityMetadata = ({ items, totalAmount = 0 }: Partial<Cart>) => {
  return (
    <div className="px-2 py-2">
      <ul>
        {items?.map(({ commodity, quantity }) => (
          <li
            key={commodity.id}
            className="flex items-center gap-4 border-b-small py-4">
            <Badge color="danger" content={quantity}>
              <Image
                alt="commodity image"
                className="border"
                height={80}
                src={commodity.mainPics[0]}
                width={80}
              />
            </Badge>
            <div className="flex flex-col flex-1 gap-2">
              <Link isExternal href={`/commodity/${commodity.id}`}>
                <h4 className="text-small hover:underline text-default-900 line-clamp-2">
                  {commodity.name}
                </h4>
              </Link>
              <span className="text-small font-semibold text-default-700">
                {formatPrice(commodity.sellingPrice)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <dl className="flex flex-col gap-3 py-6">
        <div className="flex justify-between text-small text-default-900">
          <dt>Subtotal</dt>
          <dd>${totalAmount}</dd>
        </div>
        <div className="flex justify-between text-small text-default-900">
          <dt>Delivery</dt>
          <dd>$0.00</dd>
        </div>
        <div className="flex justify-between text-small text-default-900">
          <dt>Tax</dt>
          <dd>$0.00</dd>
        </div>
        <div className="flex justify-between mt-2 text-xl text-default-900 font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(totalAmount)}</dd>
        </div>
      </dl>
    </div>
  );
};

export default CommodityMetadata;
