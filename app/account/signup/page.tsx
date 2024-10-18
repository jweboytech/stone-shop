'use client';

import { useForm } from 'react-hook-form';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Link } from '@nextui-org/link';

import InputField from '@/components/form/input';
import { postFetcher } from '@/utils/request/fetcher';

const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string().required('Please input email'),
  password: string().required('Please input password'),
});

const SignupPage = () => {
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
        Create Account
      </h1>
      {errMsg && <div>{errMsg}</div>}
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-1 gap-6">
              <InputField
                control={control}
                label="Fist name"
                name="firstName"
                placeholder="Please input first name"
              />
              <InputField
                control={control}
                label="Last name"
                name="lastName"
                placeholder="Please input last name"
              />
              <InputField
                isRequired
                control={control}
                label="Email"
                name="email"
                placeholder="Please input email"
              />
              <InputField
                isRequired
                control={control}
                label="Password"
                name="password"
                placeholder="Please input password"
                type="password"
              />
              <Button color="primary" radius="full" type="submit">
                Sign up
              </Button>
            </div>
          </form>
          <div className="py-4 text-center">
            <Link href="/account/signin">Sign in</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupPage;
