import Image from 'next/image';
import React from 'react';

import gqlClient from '@/lib/graphqlClient';
import { GET_PRODUCTS_BY_COLLECTION } from '@/graphql/collection';
import ProductItem from '@/components/product/item';

const CollectionPage = async ({ params }: { params: { handle: string } }) => {
  const { handle } = await params;
  const data = await gqlClient.request<Collection>(GET_PRODUCTS_BY_COLLECTION, {
    title: `title:${handle}`,
  });
  const products = data?.collections.edges[0].node.products.edges;

  return (
    <div className="">
      <div className="mx-4 px-10">
        <div className="grid grid-cols-4 gap-4">
          {products.map(({ node }) => (
            <ProductItem key={node.id} data={node} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
