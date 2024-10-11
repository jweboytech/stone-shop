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
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { Badge } from '@nextui-org/badge';
import { Image } from '@nextui-org/image';
import { useParams, useSearchParams } from 'next/navigation';

import { getFetcher, postFetcher, putFetcher } from '@/utils/request/fetcher';
import { formatPrice, serializateUrl, toUpperCase } from '@/utils';
import InputField from '@/components/form/input';
import SelectField from '@/components/form/select';
import CheckboxField from '@/components/form/checkbox';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Card, CardBody } from '@nextui-org/card';
import VisaIcon from '@/components/icons/visa';
import MasterIcon from '@/components/icons/master';
import PaypalIcon from '@/components/icons/paypal';
import { Spinner } from '@nextui-org/spinner';

const schema = object().shape({
  email: string().required('Please enter your email'),
  address: object().shape({
    country: string().required('Please select country'),
    city: string().required('Please enter city'),
    state: string().required('Please enter state'),
    postalCode: string().required('Please enter postal code'),
    line1: string().required('Please enter address'),
    line2: string(),
  }),
  firstName: string().required('Please enter your first name'),
  lastName: string().required('Please enter your last name'),
  phone: string().required('Please enter your phone number'),
  // cardNo: string().required('Please enter card number'),
  // expiryDate: string().required('Please enter expiry date'),
  // cvc: string().required('Please enter cvc'),
  // cardholder: string().required('Please enter cardholder name'),
});

const stripePromise = loadStripe(
  'pk_test_51OrCQvJdDKeF581Bh7d0yscRvmA5xxjEnBoihyZQ9YeKVxtNrf5G5ifrnVBHdT0wpqdcvhpKhZGaJvO2zU2GRd6u00qGom8U9l',
);

// 成功卡 4242424242424242
// 失效卡 4000000000000002

const allowedCountries: string[] = ['SG', 'HK', 'US'];

const CheckoutForm = ({ paymentId }: { paymentId: string }) => {
  const { handleSubmit, getValues, setValue } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const { trigger: updatePayment } = useSWRMutation<any, any, any, any>(
    paymentId ? serializateUrl('/payment/update', { id: paymentId }) : null,
    putFetcher,
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

  const submitForm = async (values: AnyObject) => {
    if (!stripe || !elements) {
      return;
    }

    console.log(values);
    setIsLoading(true);

    await updatePayment(values);
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:4200/checkout/result',
        },
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
        {/* <CardElement /> */}
        <LinkAuthenticationElement
          onChange={handleEmailChange}
          options={{ defaultValues: { email: 'jweboy0630@gmail.com' } }}
        />
        <AddressElement
          onChange={handleAddressChange}
          options={{
            mode: 'shipping',
            allowedCountries,
            blockPoBox: true,
            fields: { phone: 'always' },
            validation: { phone: { required: 'never' } },
            defaultValues: {
              name: 'Jane Biubiu',
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
        />
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
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
  const orderId = searchParam.get('orderId');
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
            <CheckoutForm paymentId={paymentId} />
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
                  ${order?.totalAmount}
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
