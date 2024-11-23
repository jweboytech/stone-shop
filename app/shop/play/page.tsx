'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

import CommodityItem from '@/components/commodity/item';
import { fontLilitaOne } from '@/config/fonts';
import { postFetcher } from '@/utils/request/fetcher';
import Subscribe from '@/components/subscribe';

const PlayPage = () => {
  const { data: commodity } = useSWR<List<Commodity>>(
    ['/commodity/list'],
    postFetcher,
  );

  return (
    <div className="bg-white">
      <div className="w-4/5 mx-auto mb-12">
        <h1
          className={clsx(
            'uppercase text-primary text-6xl font-lilita-one py-8 px-8',
            fontLilitaOne.variable,
          )}>
          play
        </h1>
        <div className="grid grid-cols-3 gap-8">
          {commodity?.items.map((item) => (
            <CommodityItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default PlayPage;
