import '@/styles/global.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontNunitoSans } from '@/config/fonts';
import Footer from '@/layout/footer';

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
          'min-h-screen antialiased overflow-hidden',
          fontNunitoSans.variable,
        )}>
        <Providers>
          <div className="relative flex flex-col h-screen">
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
