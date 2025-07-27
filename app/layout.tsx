import { Viewport } from 'next';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

import { HOME_JSON, META_DATA } from './metadata';

import { fontNunitoSans } from '@/config/fonts';
import Footer from '@/layout/footer';
import '@/styles/global.css';

export const metadata = META_DATA;

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: 'white' }],
};

function RootLayout({ children }: BaseProps) {
  return (
    <html suppressHydrationWarning className="bg-foreground-100" lang="en">
      <head>
        <link
          as="image"
          fetchPriority="high"
          href="https://celesteadore.com/cdn/shop/files/PERSONALISED_JEWELLERY_1800_x_1000_px_9_1.jpg"
          rel="preload"
        />
        <link href="https://celesteadore.com" rel="preconnect" />
        <link href="https://t0mixa-kq.myshopify.com" rel="preconnect" />
        <Script
          dangerouslySetInnerHTML={{ __html: HOME_JSON }}
          id="home-json"
          type="application/ld+json"
        />
      </head>
      <body
        className={clsx(
          'min-h-screen antialiased overflow-hidden',
          fontNunitoSans.variable,
        )}>
        <div className="relative flex flex-col h-screen">
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster richColors />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
