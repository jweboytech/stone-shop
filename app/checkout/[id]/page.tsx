'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
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
import { useParams } from 'next/navigation';

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

const CheckoutForm = () => {
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  const submitForm = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:4200/checkout/result',
        },
      })
      .then((data) => {
        console.log(data);
      });

    setIsLoading(false);
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
          options={{ defaultValues: { email: 'jweboy0630@gmail.com' } }}
        />
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries,
            blockPoBox: true,
            fields: {
              phone: 'always',
            },
            validation: {
              phone: {
                required: 'never',
              },
            },
            defaultValues: {
              name: 'Jane Doe',
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
  const params = useParams();
  const { data, mutate } = useSWR<{ cart: Cart; payment: Payment }>(
    params.id ? serializateUrl('/payment/intent/detail', params) : null,
    getFetcher,
  );
  const { trigger: updatePayment, isMutating } = useSWRMutation<
    any,
    any,
    any,
    any
  >('/payment/intent/update', putFetcher);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: {
        country: 'AU',
        city: 'COOKE PLAINS',
        state: 'South Australia',
        postalCode: '5261',
        line1: '38 Hereford Avenue',
      },
      email: 'jweboy0630@gmail.com',
      firstName: 'Lei',
      lastName: 'Biubiu',
      phone: '(08)82405304',
    },
  });
  const options: StripeElementsOptions = {
    clientSecret: data?.payment.clientSecret,
    appearance: { theme: 'stripe' },
    // 额外支付方式 https://docs.stripe.com/payments/external-payment-methods?handle-redirect=replace-action
    externalPaymentMethodTypes: ['external_paypal'],
    loader: 'auto',
    locale: 'en',
  };

  const submitForm = (values: AnyObject) => {
    console.log(values);
    updatePayment(values).then(() => {
      mutate();
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.payment?.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
          <div className="bg-white  rounded-lg px-4 py-4">
            <h2 className="font-medium text-default-500 border-b-small pb-4">
              Your Order
            </h2>
            <ul>
              {data?.cart?.items.map(({ commodity, quantity }) => (
                <li
                  key={commodity.id}
                  className="flex items-center gap-4 border-b-small py-4">
                  <Badge color="danger" content={quantity}>
                    <Image
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
            {data?.cart && (
              <dl className="flex flex-col gap-4 py-6">
                <div className="flex justify-between">
                  <dt className="text-small text-default-500">Subtotal</dt>
                  <dd className="text-small font-semibold text-default-700">
                    ${data?.cart.totalAmount}
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
                    {formatPrice(data.cart.totalAmount)}
                  </dd>
                </div>
              </dl>
            )}
          </div>
          {/* <React.Fragment>
            <div className="bg-white rounded-lg px-4 py-8 col-span-2">
              <form onSubmit={handleSubmit(submitForm)}>
                <CheckoutForm />
                <div className="flex flex-col gap-4">
                  <span className="text-foreground-500">
                    Shipping Information
                  </span>
                  <div className="flex gap-4">
                    <SelectField
                      key="country"
                      isRequired
                      control={control}
                      label="Country"
                      name="address.country"
                      options={allowedCountries}
                      placeholder="Select country"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Email address"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <div className="flex gap-4">
                    <InputField
                      isRequired
                      control={control}
                      label="First name"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="Last name"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Address"
                    name="address.line1"
                    placeholder="Lane 1,Street 1"
                  />
                  <InputField
                    control={control}
                    label="Apt, suite, etc."
                    name="address.line2"
                    placeholder="Apartment, studio, or floor"
                  />

                  <div className="flex gap-4">
                    <InputField
                      isRequired
                      control={control}
                      label="City"
                      name="address.city"
                      placeholder="City"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="State"
                      name="address.state"
                      placeholder="State"
                    />
                    <InputField
                      isRequired
                      control={control}
                      label="Postal code"
                      name="address.postalCode"
                      placeholder="Postal code"
                    />
                  </div>
                  <InputField
                    isRequired
                    control={control}
                    label="Phone number"
                    name="phone"
                    placeholder="+1 (555) 555-5555"
                  />
                  <span className="text-foreground-500">Payment Method</span>
                  {data?.payment?.clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm />
                    </Elements>
                  )}
                  <span className="text-foreground-500">Billing address</span>
                  <CheckboxField control={control} name="sameAs">
                    Same as shipping address
                  </CheckboxField>
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={isMutating}
                    size="lg"
                    type="submit">
                    {toUpperCase(
                      data?.payment.status === 'Inprogress'
                        ? 'confirm payment'
                        : 'pay now',
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <div className="bg-white  rounded-lg px-4 py-4">
              <h2 className="font-medium text-default-500 border-b-small pb-4">
                Your Order
              </h2>
              <ul>
                {data?.cart?.items.map(({ commodity, quantity }) => (
                  <li
                    key={commodity.id}
                    className="flex items-center gap-4 border-b-small py-4">
                    <Badge color="danger" content={quantity}>
                      <Image
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
              {data?.cart && (
                <dl className="flex flex-col gap-4 py-6">
                  <div className="flex justify-between">
                    <dt className="text-small text-default-500">Subtotal</dt>
                    <dd className="text-small font-semibold text-default-700">
                      ${data?.cart.totalAmount}
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
                      {formatPrice(data.cart.totalAmount)}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </React.Fragment> */}
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
