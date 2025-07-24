'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import ProductBuyButton from '@/components/product/buyButton';
import ProductVariants from '@/components/product/vatiant';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/store/product';
import { useCartMutation } from '@/hooks/useCartMutation';
import Line from '@/components/line';

const schema = z.object({
  letter: z.string({ message: 'Please enter letter' }),
});

const Buy = ({
  product,
  productByHandle,
  needLetter,
  isSelectVariant,
  letterLength = 1,
}: {
  needLetter?: boolean;
  isSelectVariant?: boolean;
  letterLength: string | number;
}) => {
  const onLetterChange = useProductStore((state) => state.onLetterChange);
  const variantData = useProductStore((state) => state.variantData);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { trigger, isLoading } = useCartMutation();
  const letter = form.watch('letter');

  React.useEffect(() => {
    if (variantData.variantName) {
      onLetterChange({
        label: variantData.variantName!,
        value: letter,
      });
    }
  }, [variantData.variantName, letter]);

  if (needLetter) {
    return (
      <React.Fragment>
        <ProductVariants
          isSelectVariant={isSelectVariant}
          options={productByHandle?.options}
          variants={productByHandle?.variants.edges}
        />
        <h3 className="text-base mb-3">Choose Your Letter</h3>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(trigger)}>
            <FormField
              control={form.control}
              name="letter"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12"
                        maxLength={Number(letterLength)}
                        placeholder="Please enter letter"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <ProductBuyButton buttonType="submit" triggerLoading={isLoading} />
          </form>
        </Form>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ProductVariants
        isSelectVariant={isSelectVariant}
        control={form.control}
        handle={product}
        options={productByHandle?.options || []}
        variants={productByHandle?.variants.edges || []}
      />
      <Line />
      <ProductBuyButton />
    </React.Fragment>
  );
};

export default Buy;
