'use client';

export const runtime = 'edge';

import React from 'react';

import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCTS_BY_COLLECTION from '@/graphql/query/productByCollection.gql';
import ProductItem from '@/components/product/item';
import Collections from '@/components/product/collections';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';
import { useRequest } from '@/hooks/useRequest';
import { Button } from '@/components/ui/button';

const OPTIONS: Option[] = [
  { label: 'Best selling', value: 'BEST_SELLING' },
  { label: 'Alphabetically, A - Z', value: 'TITLE,ASC' },
  { label: 'Alphabetically, Z - A', value: 'TITLE,DESC' },
  { label: 'Price, high to low', value: 'PRICE,DESC' },
  { label: 'Price, low to hight', value: 'PRICE,ASC' },
  { label: 'Date, old to new', value: 'CREATED,DESC' },
  { label: 'Date, new to old', value: 'CREATED,ASC' },
];

const CollectionPage = () => {
  const [orderKey, setOrderKey] = React.useState(OPTIONS[0].value);
  const { request, data } = useRequest<Collection>();
  const collection = data?.collections.edges[0].node;
  const products = collection?.products.edges;
  const params = useParams();

  const handleChange = (value: string) => {
    const [sortKey, orderKey] = value.split(',');

    request(GET_PRODUCTS_BY_COLLECTION, {
      title: `title:${params.collectionHandle}`,
      reverse: orderKey === 'DESC',
      sortKey,
    }).then(() => {
      setOrderKey(value);
    });
  };

  React.useEffect(() => {
    if (params.collectionHandle) {
      request(GET_PRODUCTS_BY_COLLECTION, {
        title: `title:${params.collectionHandle}`,
        sortKey: 'PRICE',
      });
    }
  }, []);

  return (
    <div className="py-4">
      <div className="mx-4 px-10">
        <div className="mb-4 flex justify-between">
          <Button>click</Button>
          <Select value={orderKey} onValueChange={handleChange}>
            <SelectTrigger className="w-64">
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
        <div className="grid grid-cols-4 gap-4">
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
      </div>
      {/* <Collections /> */}
    </div>
  );
};

export default CollectionPage;
