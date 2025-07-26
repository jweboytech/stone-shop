'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  orderNo: z.string({ message: 'Please enter order number' }),
});

const TrackOrderPage = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const submitForm = (values: z.infer<typeof schema>) => {
    router.replace(
      `https://shopify.com/76426019036/account/orders/${values.orderNo}`,
    );
  };

  return (
    <div className="py-7 flex flex-col gap-4 items-center justify-center">
      <h2 className="uppercase text-32 font-medium text-center">
        Track Your Order
      </h2>
      <Form {...form}>
        <form className="w-80" onSubmit={form.handleSubmit(submitForm)}>
          <FormField
            control={form.control}
            name="orderNo"
            render={({ field: { value, onChange } }) => (
              <FormItem className="w-full">
                <FormLabel className="text-18">Order Number</FormLabel>
                <FormControl>
                  <Input
                    className="outline-none shadow-none focus-visible:ring-0"
                    placeholder="Enter order number"
                    value={value || ''}
                    onChange={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 text-center">
            <Button
              className="font-medium uppercase tracking-widest"
              type="submit">
              Track
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TrackOrderPage;
