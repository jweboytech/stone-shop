'use client';

import useSWR from 'swr';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import useSWRMutation from 'swr/mutation';
import React from 'react';

import { getFetcher, postFetcher } from '@/utils/request/fetcher';
import ProductRecommendations from '@/components/commodity-recommendations';
import { generateFingerprint, getFingerprint } from '@/utils';
import localStorage from '@/utils/storage';
import { Image } from '@nextui-org/image';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Slider } from '@/components/slider';
import { Dog } from 'lucide-react';
import WhyBeYours from '@/components/whyBeYours';
import ShopNowButton from '@/components/button/shopNow';

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
    <section className="">
      <div className="relative w-full h-[650px] bg-banner bg-cover">
        <div className="text-white absolute left-20 bottom-20 flex flex-col gap-4">
          <h2 className="text-6xl font-gill font-medium">Cute Dog Toys</h2>
          <ShopNowButton />
        </div>
      </div>
      <div className="bg-white w-full">
        <div className="px-12 pt-14 pb-8 text-center w-2/3 m-auto">
          <h2 className="text-[40px] mb-2">
            Truly love the furry paws in your life
          </h2>
          <p className="text-xl mb-3">
            Truly love the furry paws in your life—they bring joy, warmth, and
            unconditional love, reminding us to cherish the happiness they add
            to our days.
          </p>
          <p className="text-xl">
            ✨ Every fur baby needs a lil&apos; love! ✨
          </p>
        </div>
      </div>
      <div
        className="h-[650px] w-full bg-banner1 bg-cover"
        style={{ backgroundColor: 'rgba(26, 27, 24, .16)' }}
      />
      <WhyBeYours />
      <div className="bg-white px-12 py-9">
        <div className="grid grid-cols-4 gap-6">
          {commodity?.items.map((item) => (
            <ProductRecommendations key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className="bg-banner2 bg-cover h-[748px]" />
      <div className="bg-white px-12 py-9">
        <div className="grid grid-cols-2 gap-28">
          <div className="py-12 flex flex-col justify-center">
            <h2 className="text-[40px]">Dr. Oreo Coke</h2>
            <p className="mt-5 text-base">
              Dr. Oreo Coke is a MilkyWay aesthetics doctor, world-renowned for
              her anti-inflammatory philosophy and non-surgical anti-aging
              approach to a healthy and youthful complexion, firmly rooted in
              every science-based formula from her eponymous skincare brand.
            </p>
            <ShopNowButton className="mt-8" />
          </div>
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/hero-12.jpg?v=1666613976&width=1500" />
        </div>
      </div>
      <div className="bg-white px-12 py-9">
        <div className="grid grid-cols-2 gap-28">
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/hero-13.jpg?v=1666613976&width=1500" />
          <div className="py-12 flex flex-col justify-center">
            <h2 className="text-[40px]">In Clean Beauty List</h2>
            <p className="mt-5 text-base">
              Discover our Bestseller Edit, the best products to restart and
              refresh your skincare and beauty routine.
            </p>
            <ShopNowButton className="mt-8" />
          </div>
        </div>
      </div>
      <div className="px-12 py-9 bg-white relative w-full">
        <h2 className="text-[40px] text-center mb-8">Before & After</h2>
        <Slider
          images={[
            'https://beyours-theme-beauty.myshopify.com/cdn/shop/files/before.jpg?v=1653539103&width=3000',
            'https://beyours-theme-beauty.myshopify.com/cdn/shop/files/after.jpg?v=1653539235&width=3000',
          ]}
        />
      </div>
    </section>
  );
}

export default Home;
