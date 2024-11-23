import InputField from '@/components/form/input';
import { fontLilitaOne } from '@/config/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

const schema = object().shape({
  email: string().required('Please enter your email'),
});

const Subscribe = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <div className="bg-[#EFF8FA] px-12 py-9">
      <div className="flex flex-col items-center">
        <h2
          className={clsx(
            'text-4xl font-semibold font-lilita-one uppercase text-danger',
            fontLilitaOne.variable,
          )}>
          Stay in touch
        </h2>
        <div className="w-1/3 py-12">
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
                <p className="text-xs">
                  Apply for our free membership to receive exclusive deals,
                  news, and events.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
