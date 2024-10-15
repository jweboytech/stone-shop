'use client';

import useSWR from 'swr';

import { getFetcher, postFetcher } from '@/utils/request/fetcher';
import localStorage from '@/utils/storage';
import ProductRecommendations from '@/components/commodity-recommendations';

function Home() {
  const { data: commodity } = useSWR<List<Commodity>>(
    ['/commodity/list', { tag: 'HOTLIST' }],
    postFetcher,
  );

  useSWR('/auth', getFetcher, {
    onSuccess(data) {
      localStorage.set('userToken', data);
    },
  });

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
