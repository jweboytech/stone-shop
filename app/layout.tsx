import '@/styles/globals.css';
// import '@/styles/animate.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontNunitoSans } from '@/config/fonts';
import { Navbar } from '@/components/_navbar';
import Footer from '@/layout/footer';
import Drawer from '@/components/drawer';
import Popup from '@/components/popup';
import CommonLayout from '@/components/layout';
import { Toaster } from 'react-hot-toast';
// import ConfirmModal from '@/components/modal/confirm';
import Script from 'next/script';

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
      {/* <Script
        async
        src="https://code.tidio.co/mrwtsim9x2wwbhk4enrywowlirpkqmvv.js"
      />
      <Script
        async
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8674629285850264"
      /> */}
      <body
        className={clsx(
          'min-h-screen antialiased overflow-hidden',
          fontNunitoSans.variable,
        )}>
        <Providers>
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> bg-[#f5f5f5] */}
            <main>{children}</main>
            <Footer />
          </div>
          <Drawer />
          <Toaster />
          {/* <ConfirmModal /> */}
        </Providers>
      </body>
    </html>
  );
}
