import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { BaseCartLine } from '@/generated/graphql';
import UPDATE_CART from '@/graphql/mutation/cart.gql';
import gqlClient from '@/lib/graphqlClient';
import Link from 'next/link';
import clsx from 'clsx';

const ProductItem = ({
  data,
  cartId,
  skuId,
}: {
  data: BaseCartLine;
  cartId: string;
  skuId: string;
}) => {
  const [quantity, setQuantity] = React.useState<number>();
  const { merchandise } = data;
  const [isLoading, setIsLoading] = React.useState(false);
  const collection = merchandise.product.collections.edges[0]?.node.title;

  const postUpdateQuantity = (value: number) => {
    setIsLoading(true);
    gqlClient
      .request(UPDATE_CART, {
        lines: { id: skuId, quantity: value },
        cartId,
      })
      .then(() => {
        setQuantity(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDecreseCount = () => {
    if (Number(quantity) > 1) {
      const result = Number(quantity) - 1;

      postUpdateQuantity(result);
    }
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
    <div className="flex gap-5">
      <Image
        alt="Product Image"
        className="cursor-pointer w-25 h-25"
        height={100}
        src={merchandise.image?.url}
        width={100}
      />
      <div>
        <h3 className="text-18">
          <Link
            href={`/collections/${collection}/products/${merchandise.product.handle}`}
            target="_blank">
            {merchandise.product.title}
          </Link>
        </h3>
        <p className="text-base">
          <span className="font-bold">Choose Your Finish</span>: 18K Gold
        </p>
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
      </div>
    </div>
  );
};

export default ProductItem;
