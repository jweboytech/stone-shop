import { GET_COLLECTIONS } from '@/graphql/collection';
import gqlClient from '@/lib/graphqlClient';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const data = await gqlClient.request<Collection>(GET_COLLECTIONS);

  return (
    <div className="px-15 flex justify-center">
      <ul className="h-full uppercase flex">
        {data?.collections.edges.map(({node}) => (
          <li className="px-4 py-3 font-medium" key={node.id}>
            <Link href="/">{node.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
