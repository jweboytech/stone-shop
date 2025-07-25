'use client';

import React from 'react';
import { X } from 'lucide-react';

import {
  Drawer as ShadnDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

import { useDrawerStore } from '@/store';

export interface DrawerProps extends BaseProps {
  trigger?: React.ReactElement;
  title?: string;
  visible?: boolean;
}

const Drawer = ({ children, trigger, title }: DrawerProps) => {
  const visible = useDrawerStore((state) => state.visible);
  const toggleStatus = useDrawerStore((state) => state.toggleStatus);

  return (
    <ShadnDrawer direction="right" open={visible} onOpenChange={toggleStatus}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between lg:px-4">
            <span className="font-medium text-22">{title}</span>
            <DrawerClose>
              <X className="cursor-pointer" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription />
        {React.Children.map(children, (child) =>
          React.cloneElement(child as any, { visible }),
        )}
      </DrawerContent>
    </ShadnDrawer>
  );
};

export default Drawer;
