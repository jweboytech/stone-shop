import React from 'react';
import { Loader2Icon } from 'lucide-react';

import { DrawerProps } from '../drawer';
import { Button } from '../ui/button';
import Line from '../line';

import ProductItem from './productItem';
import Payments from './payments';

import { formatPrice } from '@/utils/price';
import gqlClient from '@/lib/graphqlClient';
import localStorage from '@/utils/storage';
import GET_CART_DETAILS from '@/graphql/query/cartDetails.gql';
import GET_CHECKOUT_URL from '@/graphql/query/checkoutUrl.gql';
import { GetCartQuery, GetCartQueryResult } from '@/generated/graphql';
import { useRequest } from '@/hooks/useRequest';

const Cart = ({
  visible,
  cartNotes,
}: DrawerProps & { cartNotes: AnyObject }) => {
  const [details, setDetails] = React.useState<GetCartQuery>();
  const { request, isLoading } = useRequest<GetCartQueryResult>();
  const cart = localStorage.get('cart');
  const products = details?.cart?.lines.edges || [];

  const handleGetDetails = () => {
    gqlClient
      .request<GetCartQuery>(GET_CART_DETAILS, { id: cart })
      .then((data) => {
        setDetails(data);
      });
  };

  React.useEffect(() => {
    if (visible) {
      handleGetDetails();
    }
  }, [visible]);

  const handleCheckout = () => {
    request(GET_CHECKOUT_URL, { id: cart }).then((data) => {
      const { checkoutUrl } = data.cart;

      window.location.href = checkoutUrl;
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* <div className="py-3 bg-surface-light border-t border-t-neutral-light border-b border-b-neutral-light">
        <p className="text-center uppercase text-sm font-semibold text-amber">
          new season sale
        </p>
        <p className="text-center uppercase text-sm font-bold">
          Buy 1 & Get Any 2nd Free
        </p>
      </div> */}
      <div className="flex-1 py-5 px-5 lg:pt-2 lg:pb-4 lg:px-8">
        {products.map(({ node }, index) => (
          <React.Fragment key={node.id}>
            <ProductItem
              cartId={cart}
              data={node}
              skuId={node.id}
              onRefresh={handleGetDetails}
              cartNotes={cartNotes}
            />
            {index < products.length! - 1 && <Line />}
          </React.Fragment>
        ))}
      </div>
      <div className="px-5 lg:px-8 pb-4 lg:pb-2 bg-surface-light">
        <div className="flex items-center justify-between py-2">
          <span className="uppercase font-bold text-14 tracking-wider">
            subtotal
          </span>
          <span className="font-bold text-14">
            {formatPrice(details?.cart?.cost.subtotalAmount.amount)}
          </span>
        </div>
        <Line className="my-0" />
        <div className="flex items-center justify-between py-2">
          <span className="uppercase font-bold text-14 tracking-wider">
            shipping
          </span>
          <span className="uppercase font-bold text-14 tracking-wider">
            free
          </span>
        </div>
        <Button
          className="w-full h-15 font-bold text-base uppercase mt-1 tracking-widest"
          disabled={isLoading || products.length === 0}
          onClick={handleCheckout}>
          {isLoading && <Loader2Icon className="animate-spin" />}
          Safe Checkout
        </Button>
        <Payments />
      </div>
    </div>
  );
};

export default Cart;
