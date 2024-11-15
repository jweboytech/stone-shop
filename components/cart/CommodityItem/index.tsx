import useSWRMutation from 'swr/mutation';
import { Link } from '@nextui-org/link';
import { Image } from '@nextui-org/image';
import { X } from 'lucide-react';

import {
  deleteFetcher,
  postFetcher,
  putFetcher,
} from '@/utils/request/fetcher';
import Price from '@/components/price';
import React from 'react';
import { Spinnaker } from 'next/font/google';
import { Spinner } from '@nextui-org/spinner';
import { usePrevious } from '@/hooks/usePrevious';
import { _delete } from '@/utils/request';

const CommodityItem = ({
  data,
  quantity,
  onRefresh,
}: {
  data: Commodity;
  quantity: number;
  onRefresh: VoidFunction;
}) => {
  const [count, setCount] = React.useState(0);
  const actionTypeRef = React.useRef<string>();
  const prevCount = usePrevious(count);
  const { trigger, isMutating } = useSWRMutation<any, any, any, any>(
    '/cart/update',
    postFetcher,
  );
  const { trigger: removeCommodity, isMutating: isDeleting } = useSWRMutation<
    any,
    any,
    any,
    any
  >('/cart/remove/commodity', deleteFetcher);

  const increseCount = () => {
    actionTypeRef.current = 'increse';

    trigger({
      quantity: +1,
      commodityId: data.id,
    }).then(onRefresh);
  };

  const decreseCount = () => {
    actionTypeRef.current = 'decrese';

    if (count > 1) {
      trigger({
        quantity: -1,
        commodityId: data.id,
      }).then(onRefresh);
    }
  };

  const changeCount = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setCount(+value);
  };

  const handleBlur = () => {
    if (!isMutating && count !== prevCount) {
      trigger({
        quantity: count - quantity,
        commodityId: data.id,
      }).then(onRefresh);
    }
  };

  const deleteCommodity = () => {
    removeCommodity(data.id).then(onRefresh);
  };

  React.useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  return (
    <div className="flex gap-4 py-4">
      <Link isExternal href="/sd">
        <div className="bg-foreground-400 w-20 h-24 flex items-center justify-center">
          <Image height={80} radius="none" src={data.mainPics[0]} width={80} />
        </div>
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <Link isExternal href="/sd">
            <p className="text-sm text-foreground-800 cursor-pointer">
              {data.name}
            </p>
          </Link>
          <div
            className="group hover:text-white hover:after:scale-100 after:transition-transform after:scale-0 after:content-[''] after:rounded-full after:-z-10 after:absolute after:bg-primary after:top-0 after:left-0 after:bottom-0 after:right-0 flex items-center justify-center z-10 relative w-5 h-5 rounded-full duration-300 cursor-pointer"
            onClick={deleteCommodity}>
            {isDeleting ? (
              <Spinner size="sm" />
            ) : (
              <X
                className="text-foreground-400 group-hover:text-white"
                size={14}
              />
            )}
          </div>
        </div>
        <div className="flex items-end justify-between flex-1 pb-2">
          <div className="border">
            <button className="w-6" onClick={decreseCount}>
              {isMutating && actionTypeRef.current === 'decrese' ? (
                <Spinner classNames={{ wrapper: 'w-3 h-3' }} size="sm" />
              ) : (
                '-'
              )}
            </button>
            <input
              className="text-center text-xs px-1 w-10 h-6"
              value={count}
              onBlur={handleBlur}
              onChange={changeCount}
            />
            <button className="w-6" onClick={increseCount}>
              {isMutating && actionTypeRef.current === 'increse' ? (
                <Spinner classNames={{ wrapper: 'w-3 h-3' }} size="sm" />
              ) : (
                '+'
              )}
            </button>
          </div>
          <Price value={data.sellingPrice} />
        </div>
      </div>
    </div>
  );
};

export default CommodityItem;
