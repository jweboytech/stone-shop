import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { BaseCartLine } from '@/generated/graphql';
import UPDATE_CART from '@/graphql/mutation/cartLinesUpdate.gql';
import gqlClient from '@/lib/graphqlClient';
import { formatPrice } from '@/utils/price';

const ProductItem = ({
  data,
  cartId,
  skuId,
  cartNotes,
  onRefresh,
}: {
  data: BaseCartLine;
  cartId: string;
  skuId: string;
  cartNotes: AnyObject;
  onRefresh: VoidFunction;
}) => {
  const [quantity, setQuantity] = React.useState<number | string>('');
  const { merchandise } = data;
  const [isLoading, setIsLoading] = React.useState(false);
  const collection = merchandise.product.collections.edges[0]?.node.title;
  const { options, priceRange } = merchandise.product;
  const variants = merchandise.title.split('/');
  const amount = formatPrice(
    priceRange.maxVariantPrice.amount,
    priceRange.maxVariantPrice.currencyCode,
  );

  const postUpdateQuantity = (value: number) => {
    setIsLoading(true);
    gqlClient
      .request(UPDATE_CART, {
        lines: { id: skuId, quantity: value },
        cartId,
      })
      .then(() => {
        setQuantity(value);
        onRefresh();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDecreseCount = () => {
    const result = Number(quantity) - 1;

    postUpdateQuantity(result);
  };

  const handleIncreseCount = () => {
    const result = Number(quantity) + 1;

    postUpdateQuantity(result);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setQuantity(+value);
  };

  const handleBlur = () => {
    if (quantity) {
      postUpdateQuantity(quantity);
    }
  };

  React.useEffect(() => {
    if (data.quantity != null) {
      setQuantity(data.quantity);
    }
  }, [data.quantity]);

  return (
    <div className="flex pt-1 gap-2 lg:gap-5">
      <Image
        alt="Product Image"
        className="cursor-pointer w-25 h-25"
        height={100}
        src={merchandise.image?.url}
        width={100}
      />
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-medium lg:font-normal lg:text-18 leading-none">
          <Link
            href={`/collections/${collection}/products/${merchandise.product.handle}`}
            target="_blank">
            {merchandise.product.title}
          </Link>
        </h3>
        {options.map((item, index) => {
          const variantName = variants[index];
          const note = cartNotes[variantName];

          return (
            <React.Fragment key={item.id}>
              <p className="text-12 font-medium lg:font-normal lg:text-base">
                <span className="font-bold">Choose Your {item.name}</span>:{' '}
                {variants[index]}
              </p>
              {note && (
                <p className="text-12 lg:text-base">
                  <span className="font-bold">Letter</span>: {note}
                </p>
              )}
            </React.Fragment>
          );
        })}
        <div className="flex justify-between items-end mt-2">
          <div className="border w-20 h-8 grid grid-cols-3">
            <button
              className={clsx(
                'bg-transparent group hover:bg-black hover:text-white transition-colors duration-300 inline-flex items-center justify-center',
                isLoading ? 'cursor-pointer' : 'cursor-default',
              )}
              disabled={isLoading}
              onClick={handleDecreseCount}>
              <Minus className="group-hover:text-white" size={14} />
            </button>
            <input
              className="text-center text-xs px-1 outline-0"
              disabled={isLoading}
              value={quantity}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <button
              className={clsx(
                'cursor-pointer bg-transparent group hover:bg-black hover:text-white transition-colors duration-300 inline-flex items-center justify-center',
              )}
              disabled={isLoading}
              onClick={handleIncreseCount}>
              <Plus size={14} />
            </button>
          </div>
          <span className="text-base">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
