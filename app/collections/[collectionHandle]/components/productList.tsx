'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

import GET_PRODUCTS_BY_COLLECTION from '@/graphql/query/productByCollection.gql';
import ProductItem from '@/components/product/item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRequest } from '@/hooks/useRequest';

const OPTIONS: Option[] = [
  { label: 'Best selling', value: 'BEST_SELLING' },
  { label: 'Alphabetically, A - Z', value: 'TITLE,ASC' },
  { label: 'Alphabetically, Z - A', value: 'TITLE,DESC' },
  { label: 'Price, high to low', value: 'PRICE,DESC' },
  { label: 'Price, low to hight', value: 'PRICE,ASC' },
  { label: 'Date, old to new', value: 'CREATED,DESC' },
  { label: 'Date, new to old', value: 'CREATED,ASC' },
];

const ProductList = ({ collectionHandle }: { collectionHandle: string }) => {
  const [orderKey, setOrderKey] = React.useState(OPTIONS[0].value);
  const { request, data, isLoading } = useRequest<Collection>();
  const collection = data?.collections.edges[0]?.node;
  const products = collection?.products.edges;

  const handleChange = (value: string) => {
    const [sortKey, orderKey] = value.split(',');

    request(GET_PRODUCTS_BY_COLLECTION, {
      title: `title:${collectionHandle}`,
      reverse: orderKey === 'DESC',
      sortKey,
    }).then(() => {
      setOrderKey(value);
    });
  };

  React.useEffect(() => {
    if (collectionHandle) {
      request(GET_PRODUCTS_BY_COLLECTION, {
        title: `title:${collectionHandle}`,
        sortKey: 'PRICE',
      });
    }
  }, []);

  return (
    <div className="mx-4 px-10 py-8">
      <div className="mb-4 flex justify-end">
        <Select value={orderKey} onValueChange={handleChange}>
          <SelectTrigger className="w-64 border-black focus-visible:ring-0">
            <SelectValue placeholder="Please select" />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-4 gap-x-5 gap-y-8">
          {products != null &&
            collection != null &&
            products.map(({ node }) => (
              <ProductItem
                key={node.id}
                collection={collection.title}
                data={node}
              />
            ))}
        </div>
      ) : (
        <div className="flex justify-center py-8">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProductList;
