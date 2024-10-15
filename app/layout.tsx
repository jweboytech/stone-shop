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
            {/* <Navbar /> */}
            <main className="w-full flex-grow bg-[#f5f5f5]">
              <CommonLayout>{children}</CommonLayout>
            </main>
            {/* <Footer /> */}
            {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer> */}
          </div>
          <Drawer />
          {/* <Popup /> */}
        </Providers>
      </body>
    </html>
  );
}
