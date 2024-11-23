'use client';

import { ShoppingCart, Zap } from 'lucide-react';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Spinner } from '@nextui-org/spinner';

import SocialMedia from '@/components/social-media';
import StarRating from '@/components/star-rating';
import ProductRecommendations from '@/components/commodity-recommendations';
import { useDrawerStore } from '@/store';
import Cart from '@/components/cart';
import { getFetcher, postFetcher, putFetcher } from '@/utils/request/fetcher';
import { formatPrice, serializateUrl } from '@/utils';
import Photograph from '@/components/commodity/photograph';
import WhyBeYours from '@/components/whyBeYours';
import React from 'react';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { fontLilitaOne } from '@/config/fonts';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import BuyButton from '@/components/button/buy';
import Reviews from '@/components/reviews';
import Subscribe from '@/components/subscribe';

const CommodityDetailPage = () => {
  const { openDrawer } = useDrawerStore();
  const router = useRouter();
  const params = useParams();

  const { data } = useSWR<Commodity>(
    serializateUrl('/commodity/detail', { id: params.id }),
    getFetcher,
  );
  const { trigger, isMutating } = useSWRMutation<any, any, any, any>(
    '/cart/update',
    putFetcher,
  );

  const { data: commodity } = useSWR<List<Commodity>>(
    ['/commodity/list', { tag: 'HOTLIST' }],
    postFetcher,
  );

  const handleAddCart = () => {
    trigger({ quantity: +1, commodityId: params.id }).then(() => {
      openDrawer({ title: 'cart', children: <Cart /> });
    });
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <React.Fragment>
      <div className="flex gap-4 bg-white w-4/5 mx-auto ">
        <Photograph items={data?.mainPics} />
        <div className="flex flex-col gap-2 flex-1">
          <h1
            className={clsx(
              'text-6xl font-semibold text-medium-dark font-lilita-one py-1',
              fontLilitaOne.variable,
            )}>
            {data?.name}
          </h1>
          <p
            className={clsx(
              'text-md text-medium-dark font-lilita-one py-1',
              fontLilitaOne.variable,
            )}>
            Built For Tough Chewers
          </p>
          <div>
            <span
              className={clsx(
                'text-2xl font-semibold text-medium-dark font-lilita-one py-1',
                fontLilitaOne.variable,
              )}>
              Color
            </span>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-full border-2 border-primary w-16 h-16 px-1 py-1 inline-flex items-center justify-center cursor-pointer">
                <Image
                  alt="Nike Air Max 270"
                  radius="full"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg"
                />
              </div>
              <div className="rounded-full border border-foreground-200 w-16 h-16 px-1 py-1 inline-flex items-center justify-center cursor-pointer">
                <Image
                  alt="Nike Air Max 270"
                  radius="full"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            {data != null && (
              <div className="inline-flex gap-3">
                {data.originalPrice && (
                  <p className="font-medium line-through text-2xl ">
                    {formatPrice(data!.originalPrice)}
                  </p>
                )}
                <p className="font-bold text-primary">
                  <span className="text-sm">$&nbsp;</span>
                  <span className="text-2xl ">
                    {formatPrice(data!.sellingPrice, 'decimal')}
                  </span>
                </p>
              </div>
            )}
            <div className="inline-flex items-center gap-1">
              <StarRating />
              <span className="text-sm text-foreground-500">622reviews</span>
            </div>
          </div>
          <div className="mt-5 text-center">
            <strong
              className={clsx(
                'text-2xl font-semibold font-lilita-one text-medium-dark',
                fontLilitaOne.variable,
              )}>
              BUILT FOR TOUGH CHEWERS
            </strong>
            <p className="text-foreground-500 text-base">
              With three solid lobes, Tux is our toughest treat toy - made to
              stand up to some fearsome fangs. Tux&apos;s treat-hiding hollow
              cavity makes it ideal for short-snouted breeds to get to the nut
              butters, biscuits, and meaty bits. Once treats are long gone, Tux
              floats, bounces, and hangs tough through serious chew sessions.
              Shop more from
              <Link href="/shop/play">
                <span className="text-primary ">&nbsp;Play</span>
              </Link>
            </p>
          </div>
          <Accordion selectionMode="multiple">
            <AccordionItem
              key="productDetails"
              aria-label="Product Details"
              title={
                <span
                  className={clsx(
                    'text-xl font-semibold text-medium-dark font-lilita-one uppercase',
                    fontLilitaOne.variable,
                  )}>
                  Product Details
                </span>
              }>
              <ul className="list-disc text-foreground-600">
                <li>
                  Ultra tough puzzle toy helps stimulate dogs’ brains to support
                  healthy growth
                </li>
                <li>
                  Tuck dry treats inside, or fill with wet treats and freeze for
                  a delicious Tuxicle
                </li>
                <li>Non Toxic & Dishwasher Safe </li>
                <li>
                  Made with zero-waste and recyclable Zogoflex material in
                  Bozeman, Montana
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              aria-label="Sizing"
              title={
                <span
                  className={clsx(
                    'text-xl font-semibold text-medium-dark font-lilita-one uppercase',
                    fontLilitaOne.variable,
                  )}>
                  Sizing
                </span>
              }>
              <ul className="list-disc text-foreground-600">
                <li>Small: 4&quot;/10 cm</li>
                <li>Large: 5&quot;/13 cm</li>
              </ul>
            </AccordionItem>
            <AccordionItem
              aria-label="Safety"
              title={
                <span
                  className={clsx(
                    'text-xl font-semibold text-medium-dark font-lilita-one uppercase',
                    fontLilitaOne.variable,
                  )}>
                  Safety
                </span>
              }>
              <ul className="list-disc text-foreground-600">
                <p className="uppercase">PLAY SAFE. PLAY SMART. </p>
                <p className="mt-4">
                  Please remember your dog’s safety is your responsibility. No
                  dog toy is indestructible. Choose only toys that are the
                  appropriate shape and size for your dog and always supervise
                  your dog’s use of this toy, find the right toy for your
                  dog&apos;s behavior here. If damage occurs, please discontinue
                  use of the toy immediately.
                </p>
                <p className="mt-4">
                  We guarantee the performance and quality of our products. This
                  collection is designed to be safe and durable. If you are
                  dissatisfied with your purchase, we&apos;ll make it right!
                  Please <Link href="#">contact us</Link> here.
                </p>
              </ul>
            </AccordionItem>
          </Accordion>
          <Button
            className="mt-6"
            color="primary"
            size="lg"
            startContent={!isMutating && <ShoppingCart />}
            variant="bordered"
            onClick={handleAddCart}>
            {isMutating ? (
              <div className="flex gap-2">
                <Spinner size="sm" />
                <span>loading</span>
              </div>
            ) : (
              'Add to cart'
            )}
          </Button>
          <Button
            className="mt-2"
            color="primary"
            size="lg"
            startContent={<Zap />}
            onClick={handleCheckout}>
            Buy it now
          </Button>
          <SocialMedia />
        </div>
      </div>
      <WhyBeYours />
      <div className="bg-[#ceeef9] py-24 ">
        <div className="w-2/5 flex flex-col gap-4 items-center mx-auto text-center">
          <h2
            className={clsx(
              'text-5xl font-semibold font-lilita-one text-medium-dark',
              fontLilitaOne.variable,
            )}>
            PUP WELLNESS TIP
          </h2>
          <p className="text-base text-medium-dark">
            Just like humans, dogs need mental stimulation–it keeps their brains
            sharp and their days interesting. Pair West Paw treats and treat
            toys for a challenge and a reward. (Best day ever.)
          </p>
          <Link href="/shop/play">
            <BuyButton text="shop toys" />
          </Link>
        </div>
      </div>
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
      <div className="py-9 flex flex-col gap-8 lg:px-12  w-4/5 mx-auto">
        <h1 className="lg:text-[40px] text-3xl text-center">
          What Clients Are Saying
        </h1>
        <Reviews />
      </div>
      <section className="px-12 py-9">
        <h1 className="text-40 text-center mb-5">Express yourself with</h1>
        <p className="text-center text-foreground-400 mb-9">#ImwithBeYours</p>
        <div className="grid grid-cols-5 gap-1">
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/ins-1.jpg?v=1666168600&width=1500" />
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/ins-3.jpg?v=1666168620&width=1500" />
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/ins-2.jpg?v=1666168610&width=1500" />
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/ins-4.jpg?v=1666168629&width=1500" />
          <Image src="https://beyours-theme-beauty.myshopify.com/cdn/shop/files/ins-5.jpg?v=1699506080&width=1500" />
        </div>
      </section>
      <Subscribe />
    </React.Fragment>
  );
};

export default CommodityDetailPage;
