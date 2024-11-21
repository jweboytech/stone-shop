'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loadStripe,
  StripeAddressElementChangeEvent,
  StripeElementsOptions,
  StripeLinkAuthenticationElementChangeEvent,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import {
  AddressElement,
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { Badge } from '@nextui-org/badge';
import { Image } from '@nextui-org/image';
import { useParams, useSearchParams } from 'next/navigation';
import { Spinner } from '@nextui-org/spinner';

import { getFetcher, postFetcher, putFetcher } from '@/utils/request/fetcher';
import { formatPrice, serializateUrl, toUpperCase } from '@/utils';
import { Checkbox } from '@nextui-org/checkbox';

const stripePromise = loadStripe(
  'pk_test_51OrCQvJdDKeF581Bh7d0yscRvmA5xxjEnBoihyZQ9YeKVxtNrf5G5ifrnVBHdT0wpqdcvhpKhZGaJvO2zU2GRd6u00qGom8U9l',
);

// 成功卡 4242424242424242
// 失效卡 4000000000000002

const allowedCountries: string[] = ['SG', 'HK', 'US'];

const CheckoutForm = ({
  paymentId,
  orderId,
}: {
  paymentId?: string;
  orderId?: string;
}) => {
  const { handleSubmit, setValue, getValues } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const { trigger: completePayment } = useSWRMutation<any, any, any, any>(
    paymentId ? '/payment/complete' : null,
    postFetcher,
  );

  const handleEmailChange = (
    linkAuth: StripeLinkAuthenticationElementChangeEvent,
  ) => {
    setValue('email', linkAuth.value.email);
  };

  const handleAddressChange = ({ value }: StripeAddressElementChangeEvent) => {
    setValue('address', value.address);
    setValue('phone', value.phone);
    setValue('name', value.name);
    setValue('shipping.name', value.name);
    setValue('shipping.address', value.address);
  };

  const submitForm = async () => {
    if (!stripe || !elements) {
      return;
    }

    const values = getValues();

    setIsLoading(true);
    completePayment(values)
      .then(() => {
        return stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: window.location.origin + '/checkout/result/' + orderId,
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-4">
        {/* <ExpressCheckoutElement
          onConfirm={(values) => {
            console.log(values);
          }}
          onReady={({ availablePaymentMethods }) => {
            console.log(availablePaymentMethods);
          }}
        /> */}
        <h3 className="text-xl font-bold">Contact</h3>
        <LinkAuthenticationElement
          options={{ defaultValues: { email: 'jweboy@outlook.com' } }}
          onChange={handleEmailChange}
        />
        <h3 className="text-xl font-bold">Delivery</h3>
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries,
            display: { name: 'split' },
            blockPoBox: false,
            fields: { phone: 'always' },
            validation: { phone: { required: 'never' } },
            defaultValues: {
              firstName: 'Jane',
              lastName: 'Biubiu',
              phone: '(888)555-0715',
              address: {
                line1: '354 Oyster Point Blvd',
                line2: '',
                city: 'South San Francisco',
                state: 'CA',
                postal_code: '94080',
                country: 'US',
              },
            },
          }}
          onChange={handleAddressChange}
        />
        <h3 className="text-xl font-bold">Payment</h3>
        <PaymentElement options={{ layout: 'tabs' }} />
        <Button
          fullWidth
          color="primary"
          isDisabled={isLoading || !elements || !stripe}
          isLoading={isLoading}
          size="lg"
          type="submit">
          {toUpperCase('pay now')}
        </Button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const searchParam = useSearchParams();
  const params = useParams();
  const orderId = params.id;
  const paymentId = searchParam.get('paymentId');
  const clientSecret = searchParam.get('clientSecret');

  const { data: order, isLoading } = useSWR<{ cart: Cart; payment: Payment }>(
    orderId ? serializateUrl('/order/detail', { id: orderId }) : null,
    getFetcher,
  );

  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance: { theme: 'stripe' },
    // 额外支付方式 https://docs.stripe.com/payments/external-payment-methods?handle-redirect=replace-action
    // externalPaymentMethodTypes: ['external_paypal'],
    loader: 'auto',
    locale: 'en',
  };

  return (
    <div>
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm paymentId={paymentId} orderId={orderId} />
          </Elements>
          <div className="bg-white  rounded-lg px-4 py-4">
            <h2 className="font-medium text-default-500 border-b-small pb-4">
              Your Order
            </h2>
            <ul>
              {order?.metadata?.items.map(({ commodity, quantity }) => (
                <li
                  key={commodity.id}
                  className="flex items-center gap-4 border-b-small py-4">
                  <Badge color="danger" content={quantity}>
                    <Image
                      alt="commodity image"
                      className="border px-1"
                      height={80}
                      src={commodity.mainPics[0]}
                      width={80}
                    />
                  </Badge>
                  <div className="flex flex-col flex-1 gap-2">
                    <Link isExternal href="/sd">
                      <h4 className="text-small hover:underline text-foreground-700 line-clamp-2">
                        {commodity.name}
                      </h4>
                    </Link>
                    <span className="text-small font-semibold text-default-700">
                      {formatPrice(commodity.sellingPrice)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="flex flex-col gap-4 py-6">
              <div className="flex justify-between">
                <dt className="text-small text-default-500">Subtotal</dt>
                <dd className="text-small font-semibold text-default-700">
                  {formatPrice(order?.totalAmount)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-small text-default-500">Delivery</dt>
                <dd className="text-small font-semibold text-default-700">
                  $0.00
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-small text-default-500">Tax</dt>
                <dd className="text-small font-semibold text-default-700">
                  $0.00
                </dd>
              </div>
              <Divider />
              <div className="flex justify-between">
                <dt className="text-small font-semibold text-default-500">
                  Total
                </dt>
                <dd className="text-small font-semibold text-default-700">
                  {formatPrice(order?.totalAmount)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <Spinner label="loading..." />
      )}
    </div>
  );
};

export default Checkout;
