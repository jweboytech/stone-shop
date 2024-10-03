'use client';

import { ShoppingCart, Zap } from 'lucide-react';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Spinner } from '@nextui-org/spinner';

import SocialMedia from '@/components/social-media';
import Reviews from '@/components/reviews';
import StarRating from '@/components/star-rating';
import ProductRecommendations from '@/components/commodity-recommendations';
import { useDrawerStore } from '@/store';
import Cart from '@/components/cart';
import { getFetcher, postFetcher, putFetcher } from '@/utils/request/fetcher';
import { formatPrice, serializateUrl } from '@/utils';
import Photograph from '@/components/commodity/photograph';

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
    <div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 flex flex-col gap-4 mb-6 px-10 ">
        <Photograph data={data} />
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold tracking-tight">{data?.name}</h1>
          <div className="flex justify-between ">
            <p className="text-xl font-medium">
              {formatPrice(data?.sellingPrice)}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <StarRating />
              </div>
              <p className="text-small text-default-400">669 reviews</p>
            </div>
          </div>
          <p className="line-clamp-3 text-default-500 font-medium">
            The Nike Air Max 270 delivers an even more adaptive fit than before.
            Stretch material in the upper moves with your foot, while the
            tri-star outsole pattern adjusts to your every step for a ride that
            delivers support and flexibility where you need it.
          </p>
          <div className="mt-4">
            <h1>Color</h1>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-md border-2 border-primary w-16 h-16 px-1 py-1 inline-flex items-center justify-center cursor-pointer">
                <Image
                  alt="Nike Air Max 270"
                  radius="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg"
                />
              </div>
              <div className="rounded-md border border-foreground-200 w-16 h-16 px-1 py-1 inline-flex items-center justify-center cursor-pointer">
                <Image
                  alt="Nike Air Max 270"
                  radius="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg"
                />
              </div>
            </div>
          </div>
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
      <div
        className="w-full h-[550px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://impulse-theme-fashion.myshopify.com/cdn/shop/files/cheyenne-knowles-359823-unsplash.jpg?v=1613705083&width=1920)',
        }}
      />
      <div className="py-9 flex flex-col gap-8 lg:px-80">
        <h1 className="lg:text-[40px] text-3xl text-center">
          What Clients Are Saying
        </h1>
        <div>
          <Reviews />
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
      {/* <div className="px-6 mt-5">
        <Reviews />
      </div> */}
    </div>
  );
};

export default CommodityDetailPage;
