import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Wondering = () => {
  return (
    <div className="py-16 mx-62 px-10">
      <h2 className="text-center font-medium text-28 uppercase mb-8">
        You may be wondering
      </h2>
      <Accordion className="w-full flex flex-col gap-1" type="multiple">
        <AccordionItem className="border-none" value="lifetime">
          <AccordionTrigger className="bg-surface-light text-base px-4 cursor-pointer border border-gray-medium">
            What does your lifetime warranty include?
          </AccordionTrigger>
          <AccordionContent className="px-10 py-5">
            <p>
              <strong>Our jewellery is made different.</strong>
              <br />
              <br />
              We use high quality materials to make sure that your jewellery
              won&apos;t tarnish or lose colour over time. If you find that your
              jewellery lose its shine or colour, just reach out to us, and{' '}
              <strong>we&apos;ll send you a brand new one.</strong>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none" value="proof">
          <AccordionTrigger className="bg-surface-light text-base px-4 cursor-pointer border border-gray-medium">
            Is it really waterproof and sweat proof?
          </AccordionTrigger>
          <AccordionContent className="px-10 py-5">
            <p className="mb-6">
              Yes! At Celeste Adore, we&apos;re dedicated to making high-quality
              personalised jewellery without the high cost.
            </p>
            <p>
              Every Celeste Adore piece is waterproof, sweat proof,
              hypoallergenic, tarnish-free, and cosmetic-friendly. Designed for
              everyday wear, you&apos;ll never have to take your jewellery off.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none" value="country">
          <AccordionTrigger className="bg-surface-light text-base px-4 cursor-pointer border border-gray-medium">
            What countries do you ship to?
          </AccordionTrigger>
          <AccordionContent className="px-10 py-5">
            <p>We offer free shipping to anywhere in the world 📦</p>
            <br />
            <p>
              All our orders come in eco-friendly packaging, including a Celeste
              Adore gift box and card, ready to treat yourself or be wrapped for
              your favourite person.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none" value="fadeProof">
          <AccordionTrigger className="bg-surface-light text-base px-4 cursor-pointer border border-gray-medium">
            How do you make your jewellery fade proof?
          </AccordionTrigger>
          <AccordionContent className="px-10 py-5">
            <p>
              All our jewellery is made with a strong 316L stainless steel base
              and then covered with real 18k gold. This allows our jewellery to
              tough & durable.
            </p>
            <br />
            <p>
              We also add a layer of rhodium coating to make sure it never loses
              its colour and stays tarnish-free.
            </p>
            <br />
            <p>
              Our jewellery is made with high quality materials so it&apos;s
              built to last forever.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Wondering;
