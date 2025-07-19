import React from 'react';
import Link from 'next/link';

import MediaChannels from '../medias';

import CountrySelector from './components/countrySelector';

console.log(process.env.NEXT_PUBLIC_SITE_URL);

const BasicBar = async () => {
  let result: PageList<Country> | null = null;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + '/api/countries',
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Fetch error: ${res.status} - ${text}`);
      // 你可以选择抛错，或者赋予默认值避免崩溃
      result = { items: [] };
    } else {
      const json = await res.json();
      result = json.data as PageList<Country>;
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    result = { items: [] }; // 兜底默认空数据
  }

  console.log('render', result);

  return (
    <div className="flex justify-between items-center px-15 shadow-xs">
      <div>
        <Link className="py-1 px-2 w-fit text-sm font-medium" href="/help">
          Need Help?
        </Link>
        <Link className="py-1 px-2 w-fit text-sm font-medium" href="/order">
          Track Order
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <MediaChannels />
        {/* <CountrySelector data={result.items} /> */}
      </div>
    </div>
  );
};

export default BasicBar;
