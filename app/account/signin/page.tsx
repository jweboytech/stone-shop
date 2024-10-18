'use client';

import { useForm } from 'react-hook-form';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import React from 'react';

import InputField from '@/components/form/input';
import { postFetcher } from '@/utils/request/fetcher';
import { Link } from '@nextui-org/link';
import { toUpperCase } from '@/utils';

const schema = object().shape({
  email: string().required('Email cannot be blank'),
  password: string().required('Make sure you enter a password'),
});

const SigninPage = () => {
  const [errMsg, setErrMsg] = React.useState('');
  const router = useRouter();

  const { trigger, data } = useSWRMutation('/auth/signin', postFetcher);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (values) => {
    trigger(values)
      .then(() => {
        // setErrMsg('');
        router.push('/account/profile');
      })
      .catch(setErrMsg);
  };

  return (
    <div className="w-[600px]">
      <h1 className="mb-4 text-4xl font-semibold text-center text-primary">
        Login
      </h1>
      {/* {errMsg && (
        <div className="border-2 border-danger rounded-lg mb-4 px-2 py-2">
          {errMsg}
        </div>
      )} */}
      <Card>
        <CardBody className="py-4">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-1 gap-6">
              <InputField
                control={control}
                label="Email"
                name="email"
                placeholder="Please input email"
              />
              <InputField
                control={control}
                label="Password"
                name="password"
                placeholder="Please input password"
                type="password"
              />
              <Button color="primary" size="lg" type="submit">
                {toUpperCase('continue')}
              </Button>
            </div>
          </form>
          <div className="py-4 text-center">
            <Link href="/account/signup">Sign up</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SigninPage;
