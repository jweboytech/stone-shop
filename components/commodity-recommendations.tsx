import { Image } from '@nextui-org/image';
import { Search } from 'lucide-react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { Spinner } from '@nextui-org/spinner';

import StarRating from './star-rating';
import Cart from './cart';

import { useDrawerStore } from '@/store';
import { postFetcher } from '@/utils/request/fetcher';

const CommodityRecommendations = ({ data }: { data: Commodity }) => {
  const router = useRouter();
  const { openDrawer } = useDrawerStore();
  const { trigger, isMutating } = useSWRMutation<any, any, any, any>(
    '/cart/update',
    postFetcher,
  );

  const handleAddCart: React.ChangeEventHandler<HTMLDivElement> = (evt) => {
    evt.stopPropagation();

    trigger({ quantity: +1, commodityId: data.id }).then(() => {
      openDrawer({ title: 'cart', children: <Cart /> });
    });
  };

  const handleNavigate = () => {
    router.push(`/commodity/${data.id}`);
  };

  return (
    <div className="group cursor-pointer relative" onClick={handleNavigate}>
      <div className="absolute z-20 top-4 right-4 hover:animate-tada w-10 h-10 rounded-full bg-white flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-400">
        <Search size={20} />
      </div>
      <div className="relative">
        <Image
          alt={data.mainPics[1]}
          as={NextImage}
          width={400}
          height={400}
          className="group-hover:animate-zoom-fade-small absolute z-10 left-0 top-0 h-full"
          src={data.mainPics[1]}
        />
        <Image
          alt={data.mainPics[1]}
          className="-z-10 visible group-hover:invisible transition-all duration-300"
          width={400}
          height={400}
          src={data.mainPics[0]}
        />
        <div
          className="absolute z-50 px-4 w-full overflow-hidden"
          style={{ transform: 'translateY(-3.5rem)' }}>
          <div
            onClick={handleAddCart}
            className="opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 bg-primary h-10 rounded-lg flex items-center justify-center text-white transition-all duration-400">
            {isMutating ? <Spinner size="sm" /> : 'Add to cart'}
          </div>
        </div>
      </div>
      <p className="mt-4 text-base">{data.name}</p>
      <p className="mt-1">
        <span className="text-xs">$</span>
        <span className="text-lg">{data.sellingPrice}</span>
      </p>
      <StarRating />
    </div>
  );
};

export default CommodityRecommendations;
