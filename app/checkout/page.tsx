'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/dist/mutation';

import { postFetcher } from '@/utils/request/fetcher';
import useSWR from 'swr';

const schema = object().shape({
  email: string().required('Please enter your email'),
  firstName: string().required('Please enter your first name'),
  lastName: string().required('Please enter your last name'),
  address: string().required('Please enter address'),
  country: string().required('Please select country'),
  city: string().required('Please enter your city'),
  postalCode: string().required('Please enter your postalCode'),
  phone: string().required('Please enter your phone number'),
  cardNo: string().required('Please enter card number'),
  expiryDate: string().required('Please enter expiry date'),
  cvc: string().required('Please enter cvc'),
  cardholder: string().required('Please enter cardholder name'),
  apartment: string(),
});

const stripePromise = loadStripe(
  'pk_test_51OrCQvJdDKeF581Bh7d0yscRvmA5xxjEnBoihyZQ9YeKVxtNrf5G5ifrnVBHdT0wpqdcvhpKhZGaJvO2zU2GRd6u00qGom8U9l',
);

const CheckoutForm = () => {
  const { control, handleSubmit } = useForm({});
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  const submitForm = async (values: AnyObject) => {
    console.log(values);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/result',
      },
    });

    console.log(error);
    if (error.type === 'card_error' || error.type === 'validation_error') {
      toast.error(error.message!);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-4">
        <PaymentElement />
        <Button
          fullWidth
          color="primary"
          isLoading={isLoading}
          isDisabled={isLoading || !elements || !stripe}
          type="submit">
          Pay now
        </Button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { data } = useSWR<{ clientSecret: string }>(
    '/stripe/payment/intent',
    postFetcher,
    { revalidateOnFocus: false },
  );
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const options: StripeElementsOptions = {
    clientSecret: data?.clientSecret,
    appearance: { theme: 'stripe' },
  };

  const submitForm = (values: AnyObject) => {
    console.log(values);
  };

  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      {/* <div className="bg-white rounded-lg px-4 py-4 col-span-2">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-4">
            <span className="text-foreground-500">Shipping Information</span>
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
              name="address"
              placeholder="Lane 1,Street 1"
            />
            <InputField
              control={control}
              label="Apt, suite, etc."
              name="apartment"
              placeholder="Apartment, studio, or floor"
            />
            <div className="flex gap-4">
              <SelectField
                isRequired
                control={control}
                label="Country"
                name="country"
                placeholder="Select country"
              />
              <InputField
                isRequired
                control={control}
                label="City"
                name="city"
                placeholder="Enter your city"
              />
            </div>
            <div className="flex gap-4">
              <SelectField
                isRequired
                control={control}
                label="Postal code"
                name="postalCode"
                placeholder="662345"
              />
              <InputField
                isRequired
                control={control}
                label="Phone number"
                name="phone"
                placeholder="+1 (555) 555-5555"
              />
            </div>
            <span className="text-foreground-500">Payment Method</span>
            <RadioGroup>
              <div className="grid grid-cols-3 gap-4">
                <Card isPressable>
                  <CardBody>
                    <div className="flex justify-between">
                      <VisaIcon />
                      <Radio value="visa" />
                    </div>
                  </CardBody>
                </Card>
                <Card isPressable>
                  <CardBody>
                    <div className="flex justify-between">
                      <MasterIcon />
                      <Radio value="master" />
                    </div>
                  </CardBody>
                </Card>
                <Card isPressable>
                  <CardBody>
                    <div className="flex justify-between">
                      <PaypalIcon />
                      <Radio value="paypal" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </RadioGroup>
            <InputField
              isRequired
              control={control}
              label="Card number"
              name="cardNo"
              placeholder="Card number"
              startContent={<CreditCard size={16} />}
            />
            <div className="flex gap-4">
              <InputField
                isRequired
                control={control}
                label="Expiration date (MM / YY)"
                name="expiryDate"
                placeholder="Enter expiry date"
              />
              <InputField
                isRequired
                control={control}
                label="CVC"
                name="cvc"
                placeholder="Enter cvc"
              />
            </div>
            <InputField
              isRequired
              control={control}
              label="Cardholder name"
              name="cardholder"
              placeholder="Cardholder name"
            />
            <span className="text-foreground-500">Billing address</span>
            <CheckboxField control={control} name="sameAs">
              Same as shipping address
            </CheckboxField>
          </div>
        </form>
      </div>
      <div className="bg-white  rounded-lg px-4 py-4">
        <h2 className="font-medium text-default-500 border-b-small pb-4">
          Your Order
        </h2>
        <ul>
          <li className="flex items-center gap-4 border-b-small py-4">
            <Badge color="danger" content={2}>
              <Image
                className="border px-1"
                height={80}
                src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/1.png"
                width={80}
              />
            </Badge>
            <div className="flex flex-col flex-1 gap-2">
              <Link isExternal href="/sd">
                <h4 className="text-small hover:underline text-foreground-700 line-clamp-2">
                  Training shoesTraining shoesTraining shoesTraining shoes
                </h4>
              </Link>
              <span className="text-small font-semibold text-default-700">
                $199.99
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 border-b-small py-4">
            <Badge color="danger" content={2}>
              <Image
                className="border px-1"
                height={80}
                src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/1.png"
                width={80}
              />
            </Badge>
            <div className="flex flex-col flex-1 gap-2">
              <Link isExternal href="/sd">
                <h4 className="text-small hover:underline text-foreground-700 line-clamp-2">
                  Training shoesTraining shoesTraining shoesTraining shoes
                  Training shoesTraining shoesTraining shoesTraining shoes
                </h4>
              </Link>
              <span className="text-small font-semibold text-default-700">
                $199.99
              </span>
            </div>
          </li>
        </ul>
        <dl className="flex flex-col gap-4 py-6">
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Subtotal</dt>
            <dd className="text-small font-semibold text-default-700">
              $199.99
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Delivery</dt>
            <dd className="text-small font-semibold text-default-700">$9.99</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Tax</dt>
            <dd className="text-small font-semibold text-default-700">$2.5</dd>
          </div>
          <Divider />
          <div className="flex justify-between">
            <dt className="text-small font-semibold text-default-500">Total</dt>
            <dd className="text-small font-semibold text-default-700">
              $399.99
            </dd>
          </div>
        </dl>
        <Button fullWidth color="primary" size="lg" type="submit">
          {toUpperCase('pay now')}
        </Button>
      </div> */}
    </div>
  );
};

export default Checkout;
