import { Card, CardBody, CardHeader } from '@nextui-org/card';

import Description from '../description';
import DescriptionItem from '../description/item';

import { formatPrice, getCardLast } from '@/utils';

const OrderDetails = ({ data }: { data?: Order }) => {
  return (
    <Card title="Order details">
      <CardHeader className="font-medium">Order details</CardHeader>
      <CardBody>
        <Description columns={2}>
          <DescriptionItem label="Contact information" value={data?.email} />
          <DescriptionItem
            label="Payment method"
            value={
              <div className="flex">
                <span>{data?.cardBrand}</span>
                <span>{getCardLast(data?.cardLast)}</span>
                <span>{formatPrice(data?.totalAmount)}</span>
              </div>
            }
          />
          <DescriptionItem
            label="Shipping address"
            value={
              <div className="flex flex-col">
                <span>{data?.shipping.name}</span>
                <div className="inline-flex items-center gap-2">
                  <span>{data?.shipping.address.line1}</span>
                  <span>{data?.shipping.address.state}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span>{data?.shipping.address.postalCode}</span>
                  <span>{data?.shipping.address.city}</span>
                </div>
                <span>{data?.shipping.address.country}</span>
              </div>
            }
          />
          <DescriptionItem
            label="Shipping method"
            value={data?.deliveryMethod}
          />
        </Description>
      </CardBody>
    </Card>
  );
};

export default OrderDetails;
