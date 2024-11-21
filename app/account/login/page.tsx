'use client';

import { useForm } from 'react-hook-form';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWRMutation from 'swr/mutation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

import InputField from '@/components/form/input';
import { postFetcher } from '@/utils/request/fetcher';
import { serializateUrl } from '@/utils';
import localStorage from '@/utils/storage';
import { useUserStore } from '@/store';
import toast from 'react-hot-toast';

const emailSchema = object().shape({
  email: string().required('Email cannot be blank'),
});

const captchaSchema = object().shape({
  digitCode: string()
    // .matches(/^[0-9]+$/, 'Captcha must be numeric')
    .required('Captcha cannot be blank'),
});

const LoginPage = () => {
  const [currStep, setCurrStep] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { trigger, isMutating } = useSWRMutation(
    '/auth/send/captcha',
    postFetcher,
  );

  const { trigger: postLogin, isMutating: isVerifings } = useSWRMutation(
    '/auth/login',
    postFetcher,
  );

  const {
    control: emailController,
    handleSubmit: handleEmailForm,
    setError: setEmailError,
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: 'jweboy0630@gmail.com' },
  });

  const {
    control: captchaControl,
    handleSubmit: handleCaptchaForm,
    setError: setCaptchaError,
  } = useForm({
    resolver: yupResolver(captchaSchema),
  });

  const submitEmailForm = (values) => {
    trigger(values)
      .then(() => {
        const url = serializateUrl(pathname, {
          email: values.email,
        });

        router.replace(url);
        setCurrStep(1);
      })
      .catch((err) => {
        setEmailError('email', {
          message: err,
        });
      });
  };

  const submitCaptchaForm = (values) => {
    postLogin({
      email: searchParams.get('email'),
      ...values,
    })
      .then((data) => {
        localStorage.set('userToken', data);
        setTimeout(() => {
          router.push('/account/profile');
        }, 0);
      })
      .catch((err) => {
        setCaptchaError('digitCode', { message: err });
      });
  };

  return (
    <Card className="py-6 w-[480px]">
      <CardHeader className="justify-center">
        <Image
          alt="logo"
          src="https://cdn.shopify.com/s/files/1/0582/8552/3124/files/LOGO_ALPHA_PAW-01_200x60@2x.png?v=1725732993.webp"
          width={220}
        />
      </CardHeader>
      <CardBody className="py-4">
        {currStep === 0 && (
          <form onSubmit={handleEmailForm(submitEmailForm)}>
            <div className="grid grid-cols-1 gap-6">
              <InputField
                isRequired
                control={emailController}
                label="Email"
                name="email"
                placeholder="Please input email"
              />
              <Button
                color="primary"
                size="lg"
                type="submit"
                isLoading={isMutating}>
                {/* {toUpperCase('continue')} */}
                Continue
              </Button>
            </div>
          </form>
        )}
        {currStep === 1 && (
          <div>
            <h1 className="text-2xl font-semibold mb-2">Enter code</h1>
            <p className="mb-5 text-sm text-foreground-500">
              Sent to {searchParams.get('email')}
            </p>
            <form onSubmit={handleCaptchaForm(submitCaptchaForm)}>
              <div className="grid grid-cols-1 gap-6">
                <InputField
                  allowEmptyValue
                  isRequired
                  control={captchaControl}
                  label="Captcha"
                  name="digitCode"
                  placeholder="6-digit code"
                />
                <Button
                  color="primary"
                  size="lg"
                  type="submit"
                  isLoading={isVerifings}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
        <div className="pt-8">
          <Link className="text-sm" href="/account/privacy">
            Privacy
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default LoginPage;
