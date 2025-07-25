import React from 'react';
import Link from 'next/link';

import SubscribeInput from './components/subscribeInput';

import GET_COLLECTIONS_BY_TITLE from '@/graphql/query/collectionsByTitle.gql';
import gqlClient from '@/lib/graphqlClient';
import Payments from '@/components/cart/payments';
import MediaChannels from '@/components/medias';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// const HELP_OPTIONS: Option[] = [
//   { label: 'Order Tracking', value: 'order-tracking' },
//   { label: 'About Us', value: 'about-us' },
//   { label: 'FAQs', value: 'faqs' },
//   { label: 'Lifetime Warranty', value: 'lifttime-tracking' },
//   { label: 'Delivery Guide', value: 'delivery-guide' },
//   { label: 'Contact Us', value: 'contact-us' },
// ];

const POLICIES_OPTIONS: Option[] = [
  { label: 'Terms & Conditions', value: 'teams-conditions' },
  { label: 'Shipping Policy', value: 'shipping-policy' },
  { label: 'Privacy Policy', value: 'privacy-policy' },
  { label: 'Return & Refund Policy', value: 'refund-policy' },
];

const Footer = async () => {
  const year = new Date().getUTCFullYear();
  const data = await gqlClient.request<Collection>(GET_COLLECTIONS_BY_TITLE, {
    query:
      'title:"necklaces" OR title:"bracelets" OR title:"earrings" OR title:"rings"',
  });

  return (
    <div className="lg:p-15 px-4 lg:px-10 border-t border-t-surface-muted">
      <div className="flex flex-col">
        <Accordion type="multiple">
          <AccordionItem value="ourRange">
            <AccordionTrigger>
              <div className="font-medium text-center w-full">
                Shop Our Range
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {data.collections.edges.map(({ node }) => (
                <Link
                  key={node.id}
                  className="py-1 text-center block"
                  href={`/collections/${node.title}`}>
                  <span className="text-sm capitalize">{node.title}</span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="policies">
            <AccordionTrigger>
              <div className="font-medium text-center w-full">
                Terms & Policies
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {POLICIES_OPTIONS.map((item) => (
                <Link
                  key={item.value}
                  className="py-1 text-center block"
                  href={`/${item.value}`}>
                  <span className="text-sm capitalize">{item.label}</span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="signup">
            <AccordionTrigger>
              <div className="font-medium text-center w-full">
                Sign up and save
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p className="text-sm text-center">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <div className="px-4">
                <SubscribeInput />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <MediaChannels size={24} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="hidden lg:flex justify-evenly gap-5">
          <ul className="flex flex-col gap-2">
            <li className="mb-3 text-sm font-semibold">Shop Our Range</li>
            {data.collections.edges.map(({ node }) => (
              <Link key={node.id} href={`/collections/${node.title}`}>
                <span className="text-sm capitalize">{node.title}</span>
              </Link>
            ))}
          </ul>
          {/* <ul className="flex flex-col gap-2">
            <li className="mb-3 text-sm font-semibold">Need help?</li>
            {HELP_OPTIONS.map((item) => (
              <Link key={item.value} href={`/collections/${item.value}`}>
                <span className="text-sm capitalize">{item.label}</span>
              </Link>
            ))}
          </ul> */}
          <ul className="flex flex-col gap-2">
            <li className="mb-3 text-sm font-semibold">Need help?</li>
            {POLICIES_OPTIONS.map((item) => (
              <Link key={item.value} href={`/${item.value}`}>
                <span className="text-sm capitalize">{item.label}</span>
              </Link>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <h5 className="mb-3 text-sm font-semibold">Sign up and save</h5>
            <p className="tetx-sm">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <SubscribeInput />
            <div className="mt-4">
              <MediaChannels size={24} />
            </div>
          </div>
        </div>
        <Payments />
        <p className="pb-1 lg:pb-0 mt-4 text-xs text-center">
          © {year} Perper Stone
        </p>
      </div>
    </div>
  );
};

export default Footer;
