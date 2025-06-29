import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCTS_BY_COLLECTION from '@/graphql/query/productByCollection.gql';
import ProductItem from '@/components/product/item';

const BestSellers = async () => {
  const data = await gqlClient.request<Collection>(GET_PRODUCTS_BY_COLLECTION, {
    title: `title:best-sellers`,
  });
  const products = data?.collections.edges[0].node.products.edges;

  return (
    <div className="py-18">
      <h2 className="uppercase font-medium text-3xl text-center">
        Best Sellers
      </h2>
      <div className="flex flex-col gap-8 items-center px-15">
        <Link href="/collections/best-sellers">
          <Button
            className="mt-4 capitalize font-semibold tracking-widest hover:border-black hover:bg-transparent"
            variant="outline">
            view all
          </Button>
        </Link>
        <div className="grid grid-cols-5 gap-1">
          {products.map(({ node }) => (
            <ProductItem key={node.id} collection="best-sellers" data={node} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <Link href="/collections/clover-collection">
            <div className="p-4 h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Clover_Set_2.jpg?v=1741965959&width=832)] bg-cover">
              <div className="relative border-2 border-white w-full h-full">
                <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                  <h2 className="uppercase font-medium text-2xl">
                    Clover Collection
                  </h2>
                  <p className="text-base">
                    Choose any letter with our best selling clover pieces.
                  </p>
                  <div className="border-2 border-white py-2 px-5 rounded w-fit uppercase">
                    <span className="text-white text-sm font-bold tracking-[4px]">
                      shop now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/collections/birthstone-jewellery">
            <div className="p-4 h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Orla_Birthstone_Necklace_2.jpg?v=1744086397&width=832)] bg-cover">
              <div className="relative border-2 border-white w-full h-full">
                <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                  <h2 className="uppercase font-medium text-2xl">
                    Birthstone collection
                  </h2>
                  <p className="text-base">
                    Find the perfect gift with our hand made birthstone pieces.
                  </p>
                  <div className="border-2 border-white py-2 px-5 rounded w-fit uppercase">
                    <span className="text-white text-sm font-bold tracking-[4px]">
                      shop now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
