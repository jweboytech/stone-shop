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

export interface DrawerProps extends BaseProps {
  trigger?: React.ReactElement;
  title?: string;
  isOpen?: boolean;
}

export interface DrawerRef {
  onToggle: VoidFunction;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

const Drawer = React.forwardRef<DrawerRef, DrawerProps>(
  ({ children, trigger, title }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // window.open(cartCreate.cart.checkoutUrl, '__blank');

    // const { productByHandle } = await gqlClient.request<{
    //   productByHandle: Product;
    // }>(GET_PRODUCT_DETAILS, {
    //   handle: product,
    // });

    const hanldeOpenChange = (value: boolean) => {
      setIsOpen(value);
    };

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
      onToggle: handleToggle,
      onOpen: handleOpen,
      onClose: handleClose,
    }));

    return (
      <ShadnDrawer
        direction="right"
        open={isOpen}
        onOpenChange={hanldeOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between px-4">
              <span className="font-medium text-22">{title}</span>
              <DrawerClose>
                <X className="cursor-pointer" />
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription />
          {React.Children.map(children, (child) =>
            React.cloneElement(child as any, { isOpen }),
          )}
        </DrawerContent>
      </ShadnDrawer>
    );
  },
);

Drawer.displayName = 'Drawer';

export default Drawer;
