'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import { ShoppingBag, User2, UserRound } from 'lucide-react';
import useSWR from 'swr';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import useSWRMutation from 'swr/mutation';

import { Logo } from '../icons';
import Cart from '../cart';

import UserMenu from './User';

import { useDrawerStore, useUserStore } from '@/store';
import { getFetcher } from '@/utils/request/fetcher';

export const Navbar = () => {
  // const { data, mutate } = useSWR<'ONLINE'>(
  //   '/auth/verify/login/status',
  //   getFetcher,
  // );
  const { trigger: postLogout } = useSWRMutation<User>(
    '/auth/logout',
    getFetcher,
  );
  const loginStatus = useUserStore((state) => state.loginStatus);
  const logout = useUserStore((state) => state.logout);

  const { openDrawer } = useDrawerStore();
  const pathname = usePathname();
  const router = useRouter();

  const openCart = () => {
    if (pathname === '/cart') {
      router.push(pathname);
    } else {
      openDrawer({ title: 'cart', children: <Cart /> });
    }
  };

  const handleUserLogout = () => {
    postLogout().then(() => {
      logout();
      router.push('/');
    });
  };

  // React.useEffect(() => {
  //   mutate();
  // }, [loginStatus]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Perperpet</p>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>
      <ShoppingBag
        className="text-default-500 cursor-pointer"
        onClick={openCart}
      />
      {/* {data != null && (
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end">
          <NavbarItem className="hidden sm:flex gap-4 items-center">
            {data === 'ONLINE' ? (
              <React.Fragment>
                <UserMenu logout={handleUserLogout} />
                <Link href="/">
                  <Button color="primary">Go to store</Button>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link href="/account/login">
                  <UserRound className="text-default-500 cursor-pointer" />
                </Link>
                <ShoppingBag
                  className="text-default-500 cursor-pointer"
                  onClick={openCart}
                />
              </React.Fragment>
            )}
          </NavbarItem>
        </NavbarContent>
      )} */}
    </NextUINavbar>
  );
};
