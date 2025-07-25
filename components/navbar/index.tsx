import Link from 'next/link';
import React from 'react';

import GET_COLLECTIONS from '@/graphql/query/collections.gql';
import gqlClient from '@/lib/graphqlClient';
import { toSlug } from '@/utils';

const Navbar = async () => {
  const data = await gqlClient.request<Collection>(GET_COLLECTIONS);

  return (
    <div className="px-15 flex justify-center shadow-xs">
      <ul className="h-full uppercase flex">
        {data?.collections.edges.map(({ node }) => (
          <li key={node.id} className="px-4 py-3 font-medium">
            <Link href={'/collections/' + toSlug(node.title)}>
              {node.title.replace(/-/, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
