'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const CountryList = dynamic(() => import('./list'), {
  ssr: false,
});

const CountrySelector = ({ data }: { data: Country[] }) => {
  return <CountryList data={data} />;
};

export default CountrySelector;
