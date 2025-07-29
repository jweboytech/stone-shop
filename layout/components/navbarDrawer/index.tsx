'use client';

import React from 'react';
import { AlignJustify, X } from 'lucide-react';
import Link from 'next/link';

import {
  Drawer as ShadnDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import gqlClient from '@/lib/graphqlClient';
import GET_COLLECTIONS from '@/graphql/query/collections.gql';
import { toSlug } from '@/utils';

export interface DrawerProps extends BaseProps {
  trigger?: React.ReactElement;
  title?: string;
  visible?: boolean;
}

const NavbarDrawer = () => {
  const [collections, setCollections] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
  };

  React.useEffect(() => {
    gqlClient.request<{ collections: any }>(GET_COLLECTIONS).then((data) => {
      setCollections(data.collections.edges);
    });
  }, []);

  return (
    <ShadnDrawer direction="left" open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger>
        <AlignJustify size={24} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-end px-1">
            <DrawerClose>
              <X className="cursor-pointer" strokeWidth={1.5} />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription />
        <ul className="">
          {collections.map(({ node }) => (
            <li
              key={node.id}
              aria-hidden
              className="px-5 font-medium text-base tracking-wider uppercase"
              onClick={handleClick}>
              <Link
                className="py-4 border-b border-b-surface-muted block"
                href={'/collections/' + toSlug(node.title)}>
                {node.title.replace(/-/, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </ShadnDrawer>
  );
};

export default NavbarDrawer;
