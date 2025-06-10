'use client';

import React from 'react';
import { X } from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

export interface CartDrawerProps extends BaseProps {
  trigger?: React.ReactElement;
  title?: string;
}

export interface CartDrawerRef {
  onToggle: VoidFunction;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

const CartDrawer = React.forwardRef<CartDrawerRef, CartDrawerProps>(
  ({ children, trigger, title }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // window.open(cartCreate.cart.checkoutUrl, '__blank');

    // const { productByHandle } = await gqlClient.request<{
    //   productByHandle: Product;
    // }>(GET_PRODUCT_DETAILS, {
    //   handle: product,
    // });

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
      <Drawer direction="right" open={isOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between px-7">
              <span className="font-medium text-22">{title}</span>
              <X className="cursor-pointer" onClick={handleClose} />
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription />
          {React.Children.map(children, (child) => child)}
        </DrawerContent>
      </Drawer>
    );
  },
);

CartDrawer.displayName = 'CartDrawer';

export default CartDrawer;
