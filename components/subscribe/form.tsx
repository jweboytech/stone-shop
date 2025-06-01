import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import { object, string } from 'yup';

import InputField from '../form/input';

import { fontLilitaOne } from '@/config/fonts';

const schema = object().shape({
  email: string().required('Please enter your email'),
});

const SubscribeForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid grid-cols-1 gap-6 mt-6">
        <InputField
          control={control}
          name="email"
          placeholder="Please enter email address"
        />
        <div>
          <Button
            fullWidth
            className={clsx(
              'uppercase font-lilita-one',
              fontLilitaOne.variable,
            )}
            color="primary"
            size="lg"
            type="submit">
            subscribe
          </Button>
          <p className="text-xs mt-5">
            Subscribe to our newsletter and be the first to hear about our new
            arrivals, special promotions and online exclusives.
          </p>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
