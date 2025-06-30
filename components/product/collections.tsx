import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import GET_COLLECTIONS_BY_TITLE from '@/graphql/query/collectionsByTitle.gql';
import gqlClient from '@/lib/graphqlClient';

const Collections = async () => {
  const data = await gqlClient.request<Collection>(GET_COLLECTIONS_BY_TITLE, {
    query:
      'title:"necklaces" OR title:"bracelets" OR title:"earrings" OR title:"rings"',
  });

  return (
    <div className="px-15 pt-11 pb-10 flex flex-col gap-8">
      <h2 className="text-3xl font-medium text-center uppercase">
        view our collections
      </h2>
      <div className="grid grid-cols-4 gap-4 ">
        {data.collections.edges
          .filter(({ node }) => node.image != null)
          .map(({ node }) => (
            <Link key={node.id} href={`/collections/${node.title}`}>
              <div className="relative">
                <Image
                  alt="collection"
                  className="h-126 object-cover"
                  height={360}
                  src={node.image.url}
                  width={360}
                />
                <div className="uppercase absolute bottom-5 w-full text-center">
                  <span className="text-white font-medium text-2xl">
                    {node.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Collections;
