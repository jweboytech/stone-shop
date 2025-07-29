import React from 'react';
import Link from 'next/link';

import MediaChannels from '../medias';

import CountrySelector from './components/countrySelector';

const BasicBar = async () => {
  const { data } = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + '/api/countries',
  ).then((res) => res.json());
  const result = data as PageList<Country>;

  return (
    <div className="hidden lg:flex justify-between items-center px-15 shadow-xs h-11 bg-white">
      <div>
        {/* <Link className="py-1 px-2 w-fit text-sm font-medium" href="/help">
          Need Help?
        </Link> */}
        <Link
          className="py-1 px-2 w-fit text-sm font-medium"
          href="/track/order">
          Track Order
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <MediaChannels />
        <CountrySelector data={result.items} />
      </div>
    </div>
  );
};

export default BasicBar;
