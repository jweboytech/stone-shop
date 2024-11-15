'use client';

import useSWR from 'swr';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import useSWRMutation from 'swr/mutation';
import React from 'react';

import { getFetcher, postFetcher } from '@/utils/request/fetcher';
import ProductRecommendations from '@/components/commodity-recommendations';
import { generateFingerprint, getFingerprint } from '@/utils';
import localStorage from '@/utils/storage';

function Home() {
  const { data: commodity } = useSWR<List<Commodity>>(
    ['/commodity/list', { tag: 'HOTLIST' }],
    postFetcher,
  );

  const { trigger } = useSWRMutation<any, any, any, any>(
    '/user/metadata',
    postFetcher,
  );

  const updateUserToken = (fingerprint: string) => {
    trigger({ uuid: fingerprint }).then((token) => {
      localStorage.set('userToken', token);
    });
  };

  React.useEffect(() => {
    getFingerprint()
      .then(async (res) => updateUserToken(res.visitorId))
      .catch(async () => {
        console.log('手动生成设备指纹');
        const fingerprint = await generateFingerprint();

        updateUserToken(fingerprint);
      });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="lg:px-10 px-6">
        <div className="py-9 flex flex-col gap-8">
          <h1 className="lg:text-[40px] text-3xl text-center">
            You May Also Like
          </h1>
          <div className="lg:grid lg:grid-cols-4 flex flex-col gap-6">
            {commodity?.items.map((item) => (
              <ProductRecommendations key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
