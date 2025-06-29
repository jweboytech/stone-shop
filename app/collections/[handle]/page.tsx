import React from 'react';

import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCTS_BY_COLLECTION from '@/graphql/query/collections.gql';
import ProductItem from '@/components/product/item';
import Collections from '@/components/product/collections';

const CollectionPage = async ({ params }: { params: { handle: string } }) => {
  const { handle } = await params;
  const data = await gqlClient.request<Collection>(GET_PRODUCTS_BY_COLLECTION, {
    title: `title:${handle}`,
  });
  console.log(data);
  const collection = data?.collections.edges[0].node;
  // const products = data?.collections.edges[0].node.products.edges;

  return (
    <div className="py-4">
      <div className="mx-4 px-10">
        <div className="mb-4">filters</div>
        <div className="grid grid-cols-4 gap-4">
          {/* {products.map(({ node }) => (
            <ProductItem
              key={node.id}
              collection={collection.title}
              data={node}
            />
          ))} */}
        </div>
      </div>
      <Collections />
    </div>
  );
};

export default CollectionPage;
