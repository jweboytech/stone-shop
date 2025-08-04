import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import gqlClient from '@/lib/graphqlClient';
import GET_PRODUCTS_BY_COLLECTION from '@/graphql/query/productByCollection.gql';
import ProductItem from '@/components/product/item';
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductList from './productList';

const BestSellers = async () => {
  const data = await gqlClient.request<Collection>(GET_PRODUCTS_BY_COLLECTION, {
    title: `title:best-sellers`,
    sortKey: 'BEST_SELLING',
    first: 12,
  });
  const products = data?.collections.edges[0].node.products.edges.splice(0, 5);

  return (
    <div className="py-8 lg:pt-5 lg:pb-12">
      <h2 className="uppercase font-medium text-3xl text-center mb-6">
        Best Sellers
      </h2>
      <div className="flex flex-col gap-8 items-center px-4 lg:px-15">
        <ProductList products={products} />
        {/* <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {products.map(({ node }) => (
            <ProductItem key={node.id} collection="best-sellers" data={node} />
          ))}
        </div> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <Link href="/collections/clover-collection">
            <div className="p-4 h-110 lg:h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Clover_Set_2.jpg?v=1741965959&width=832)] bg-cover">
              <div className="relative border-2 border-white w-full h-full">
                <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                  <h2 className="uppercase font-medium text-20 lg:text-2xl">
                    Clover Collection
                  </h2>
                  <p className="text-14 lg:text-base text-center px-10">
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
            <div className="p-4 h-110 lg:h-185 bg-[url(https://celesteadore.com/cdn/shop/files/Celeste_Adore_Orla_Birthstone_Necklace_2.jpg?v=1744086397&width=832)] bg-cover">
              <div className="relative border-2 border-white w-full h-full">
                <div className="absolute bottom-26 flex flex-col items-center gap-4 text-white w-full">
                  <h2 className="uppercase font-medium text-20 lg:text-2xl">
                    Birthstone collection
                  </h2>
                  <p className="text-14 lg:text-base text-center px-10">
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
        </div> */}
      </div>
    </div>
  );
};

export default BestSellers;
