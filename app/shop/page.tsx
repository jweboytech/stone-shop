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
import BuyButton from '@/components/button/buy';
import clsx from 'clsx';
import {
  fontCherryBomb,
  fontDynaPuff,
  fontLilitaOne,
  fontMono,
} from '@/config/fonts';
import { Link } from '@nextui-org/link';
import Subscribe from '@/components/subscribe';

function ShopPage() {
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
      <div className="h-[calc(100vh-64px)] relative">
        <video
          controls
          loop
          muted
          className="w-full h-full object-cover"
          src="https://cdn.shopify.com/videos/c/o/v/4d5f404ad6ca413a8a67247225bdbd27.mp4">
          <track kind="captions" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full flex flex-col items-center">
          <h2
            className={clsx(
              'uppercase text-white font-semibold text-[80px] font-cherry-bomb',
              fontCherryBomb.variable,
            )}>
            durable play toys
          </h2>
          <Link href="/play">
            <BuyButton />
          </Link>
        </div>
      </div>
      {/* <div className="bg-white w-full">
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
      </div> */}
      <WhyBeYours />
      <div className="grid grid-cols-2">
        <div
          className="h-[650px] w-full bg-cover"
          style={{
            backgroundColor: 'rgba(26, 27, 24, .16)',
            backgroundImage:
              'url(https://www.westpaw.com/cdn/shop/files/Safe_and_non-toxic-min.jpg?v=1690231766&width=1500)',
          }}
        />
        <div className="bg-primary text-white relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 text-center">
            <div
              className={clsx(
                'text-base font-dynaPuff',
                fontDynaPuff.variable,
              )}>
              You&apos;ve heard of &quot;Man&apos;s Best Friend&quot;
            </div>
            <h2
              className={clsx(
                'font-dynaPuff mt-6 text-5xl',
                fontDynaPuff.variable,
              )}>
              We&apos;re Dog&apos;s Best Friend
            </h2>
            <p className="mt-6 text-lg">
              We do this by making things dogs love. You know, anything that
              goes along with tugging, fetching, chewing, cuddling, and eating.
            </p>
            <Link href="/about">
              <div className="bg-white rounded uppercase w-fit px-6 py-3 mt-6 mx-auto">
                <span
                  className={clsx(
                    'text-primary font-bold font-dynaPuff text-base',
                    fontDynaPuff.variable,
                  )}>
                  learn more
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white px-12 pt-9">
        <div className="grid grid-cols-2 gap-28">
          <div className="py-12 flex flex-col justify-center">
            <h2 className="text-[40px]">Jive</h2>
            <p className="mt-5 text-base">
              Jive&apos;s erratic bounce makes chase and fetch way more fun.
              Safer and tougher than a tennis ball, Jive is one of the most
              durable balls on the market. Even better, Small Jive fits in a
              standard ball thrower for long-lasting fetch sessions.
            </p>
            <BuyButton className="mt-8" text="buy now" />
          </div>
          <Image src="https://www.westpaw.com/cdn/shop/files/HowTo_DOW_Jive.jpg?v=1613769481&width=1500" />
        </div>
      </div>
      <div className="bg-white px-12">
        <div className="grid grid-cols-2 gap-28">
          <Image src="https://www.westpaw.com/cdn/shop/files/HowTo_DOW_Zwig.jpg?v=1613770902&width=1500" />
          <div className="py-12 flex flex-col justify-center">
            <h2 className="text-[40px]">Zwig</h2>
            <p className="mt-5 text-base">
              Zwig is safer than a twig and has a twist that makes it perfect
              for fetch and water play. It’s 13.75” length makes for a safe
              distance between hands and jaws for tug-o-war. Perfect dog toy for
              two-dog play.
            </p>
            <BuyButton className="mt-8" text="buy now" />
          </div>
        </div>
      </div>
      <div className="bg-white px-12 py-9">
        <div className="grid grid-cols-4 gap-6">
          {commodity?.items.map((item) => (
            <ProductRecommendations key={item.id} data={item} />
          ))}
        </div>
      </div>
      {/* <div className="bg-banner2 bg-cover h-[748px]" />
      <div className="px-12 py-9 bg-white relative w-full">
        <h2 className="text-[40px] text-center mb-8">Before & After</h2>
        <Slider
          images={[
            'https://beyours-theme-beauty.myshopify.com/cdn/shop/files/before.jpg?v=1653539103&width=3000',
            'https://beyours-theme-beauty.myshopify.com/cdn/shop/files/after.jpg?v=1653539235&width=3000',
          ]}
        />
      </div> */}
      <Subscribe />
    </section>
  );
}

export default ShopPage;
