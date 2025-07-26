export const runtime = 'edge';

import { NextResponse } from 'next/server';

const COUNTRY_LIST: Country[] = [
  {
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: '$',
    flagUrl: '/australia.png',
  },
  {
    countryName: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    flagUrl: '/united_kingdom.webp',
  },
];

export const GET = () => {
  return NextResponse.json({
    data: { items: COUNTRY_LIST },
    message: 'Fetch data success',
    code: 0,
  });
};
