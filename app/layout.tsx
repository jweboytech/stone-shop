import '@/styles/globals.css';
import '@/styles/animate.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer';
import Drawer from '@/components/drawer';
import Popup from '@/components/popup';
import CommonLayout from '@/components/layout';
import { Toaster } from 'react-hot-toast';
import ConfirmModal from '@/components/modal/confirm';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="bg-foreground-100" lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
        )}>
        <Providers>
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> bg-[#f5f5f5] */}
            <main className="w-full flex-grow bg-white">{children}</main>
            {/* <Footer /> */}
          </div>
          <Drawer />
          <Toaster />
          <ConfirmModal />
        </Providers>
      </body>
    </html>
  );
}
