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
    <div className="px-4 lg:px-15 pt-5 lg:pt-11 pb-10 flex flex-col gap-7 lg:gap-8 max-w-350 mx-auto">
      <h2 className="text-2xl lg:text-3xl font-medium text-center uppercase">
        view our collections
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.collections.edges
          .filter(({ node }) => node.image != null)
          .map(({ node }) => (
            <Link key={node.id} href={`/collections/${node.title}`}>
              <div className="relative">
                <Image
                  alt="collection"
                  className="w-full h-62 sm:h-120 lg:h-120 object-cover"
                  height={360}
                  src={node.image.url}
                  width={360}
                />
                <div className="uppercase absolute bottom-5 w-full text-center">
                  <span className="text-white font-medium text-xl lg:text-2xl">
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
