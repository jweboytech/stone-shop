'use client';

import { Loader2Icon, X } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import gqlClient from '@/lib/graphqlClient';
import GET_SEARCH from '@/graphql/query/search.gql';
import {
  SearchResultItemConnection,
  SearchResultItemEdge,
} from '@/generated/graphql';
import { Card, CardContent } from '@/components/ui/card';
import Line from '@/components/line';
import { toSlug } from '@/utils';

const SearchPage = () => {
  const [value, setValue] = React.useState<string>();
  const [products, setProducts] = React.useState<SearchResultItemEdge[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = () => {
    setIsLoading(true);

    gqlClient
      .request<{ products: SearchResultItemConnection }>(GET_SEARCH, {
        query: `title:*${value}*`,
      })
      .then((data) => {
        setProducts(data.products.edges);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setValue(evt.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex items-center gap-4">
        <Input
          className="h-12 bg-white outline-none shadow-none focus-visible:ring-0"
          placeholder="Search Product"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="h-10"
          disabled={isLoading || !value}
          onClick={handleSearch}>
          Search
        </Button>
        <Link href="/">
          <X className="cursor-pointer" />
        </Link>
      </div>
      {!isLoading ? (
        <Card>
          <CardContent>
            {products.length > 0 ? (
              <React.Fragment>
                <h3 className="text-sm font-medium uppercase tracking-widest">
                  Products
                </h3>
                <Line />
                <ul className="grid grid-cols-1 gap-4">
                  {products.map(({ node }) => {
                    const { images, priceRange, title, handle, collections } =
                      node as Product;
                    const collection = collections.edges[0]?.node?.title || '';

                    return (
                      <Link
                        key={node.id}
                        href={`/collections/${toSlug(collection)}/products/${handle}`}
                        target="_blank">
                        <li className="flex gap-4 py-2">
                          {images?.edges.length > 0 && (
                            <Image
                              alt="thumbnail"
                              height={80}
                              src={images?.edges[0].node.url}
                              width={80}
                            />
                          )}
                          <div className="flex flex-col gap-2 justify-center">
                            <p className="text-18 capitalize">{title}</p>
                            <p className="text-sm font-medium">
                              from {priceRange.minVariantPrice.currencyCode}
                              {priceRange.minVariantPrice.amount}
                            </p>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </React.Fragment>
            ) : (
              <p>No Result</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center py-8">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
