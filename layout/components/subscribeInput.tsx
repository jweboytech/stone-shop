'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/client';

const schema = z.object({
  email: z.string({ message: 'Please enter email' }).email(),
});

const supabase = createClient();

const SubscribeInput = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const email = form.watch('email');

  const submitForm = async (values: z.infer<typeof schema>) => {
    try {
      const { data } = await supabase
        .from('subscribe_emails')
        .select()
        .eq('email', values.email)
        .single();

      if (!data) {
        await supabase
          .from('subscribe_emails')
          .upsert({ email: values.email })
          .then(() => {
            toast('Thanks for subscribing');
            form.reset();
          });
      } else {
        toast('Thanks for subscribing');
        form.reset();
      }
    } catch (error) {
      toast('Submission failed. Please try again later.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center gap-4 w-80 border-b-2 border-b-black">
                  <Input
                    className="flex-1 border-none outline-none shadow-none focus-visible:ring-0 px-0"
                    placeholder="Enter your email"
                    value={value || ''}
                    onChange={onChange}
                  />
                  <button className="cursor-pointer" type="submit">
                    {!email ? <Mail size={28} /> : <span>Subscribe</span>}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SubscribeInput;
