'use client';

import React from 'react';
import { AlignJustify, X } from 'lucide-react';

import {
  Drawer as ShadnDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export interface DrawerProps extends BaseProps {
  trigger?: React.ReactElement;
  title?: string;
  visible?: boolean;
}

const NavbarDrawer = ({ children, trigger, title }: DrawerProps) => {
  return (
    <ShadnDrawer>
      <DrawerTrigger>
        <AlignJustify className="block lg:hidden" size={24} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between px-4">
            <DrawerClose>
              <X className="cursor-pointer" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
        <div>sda</div>
      </DrawerContent>
    </ShadnDrawer>
  );
};

export default NavbarDrawer;
