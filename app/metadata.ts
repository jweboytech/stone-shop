import { Metadata } from 'next';

export const META_DATA: Metadata = {
  title: 'Perperstone Handmade Jewelry — Unique Artisan Accessories',
  description:
    'Discover handcrafted earrings, necklaces, and custom jewelry at Perperstone. Crafted with love for jewelry lovers worldwide.',
  openGraph: {
    title: 'Perperstone Handmade Jewelry — Unique Artisan Accessories',
    description:
      'Discover handcrafted earrings, necklaces, and custom jewelry at Perperstone. Crafted with love for jewelry lovers worldwide.',
    url: 'https://perperstone.com',
    siteName: 'Perperstone',
    images: [
      {
        url: 'https://perperstone.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Perperstone Handmade Jewelry',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://perperstone.com'),
};

export const HOME_JSON = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Perperstone Handmade Jewelry',
  url: 'https://perperstone.com',
  description:
    'Perperstone is a handcrafted jewelry brand offering unique, artistic pieces including earrings, necklaces, and custom designs. Designed with love and made for global jewelry lovers.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://perperstone.com/search?keyword={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Perperstone',
    url: 'https://perperstone.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://perperstone.com/logo.png',
      width: 512,
      height: 512,
    },
  },
  sameAs: [
    'https://www.facebook.com/perperstone',
    'https://www.instagram.com/perperstone',
    'https://www.pinterest.com/perperstone',
  ],
};
