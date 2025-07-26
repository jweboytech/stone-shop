import React from 'react';
import { Infinity, Sparkle, Star, Truck } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AccordionTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="uppercase font-medium text-base underline-none tracking-wide">
        {title}
      </span>
    </div>
  );
};

function Description({ description }: { description: string }) {
  return (
    <Accordion className="w-full" type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-3 cursor-pointer">
          <AccordionTitle icon={<Star size={16} />} title="description" />
        </AccordionTrigger>
        <AccordionContent>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-base"
          />
        </AccordionContent>
      </AccordionItem>
      {/*  <AccordionItem value="item-2">
        <AccordionTrigger>
          <AccordionTitle icon={<Sparkle size={16} />} title="materials" />
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6">
          <p className="text-base">
            <b>Genuine 18k Gold:</b>
            <br />
            Our pieces are lovingly dipped in real 18k gold, guaranteed to never
            lose that radiant glow and shine.
          </p>
          <p className="text-base">
            <b>316L Stainless Steel:</b>
            <br />
            Crafted from the toughest material, 316L stainless steel, our pieces
            are guaranteed to stay strong and won&apos;t lose their sparkle.
          </p>
          <p className="text-base">
            <b>AAA-Grade Cubic Zirconia:</b>
            <br />
            Indistinguishable to real diamonds from the eye, just as dazzling
            and ready to shine from every angle.
          </p>
          <p className="text-base">
            <b>Rhodium:</b>
            <br />
            Adding a touch of charm, our indestructible rhodium coating ensures
            your piece stays scratch-free and tarnish-proof.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <AccordionTitle
            icon={<Infinity size={16} />}
            title="Lifetime Warranty"
          />
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-base">
            At Celeste Adore, we stand behind the quality of every piece. Our
            jewellery comes with a <strong> Lifetime Guarantee</strong>, so if
            your item doesn&apos;t meet our high standards, we&apos;ll repair or
            replace it, no questions asked.
          </p>
        </AccordionContent>
      </AccordionItem> */}
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <AccordionTitle
            icon={<Truck size={16} />}
            title="Delivery & Returns"
          />
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <p className="text-base">
            <b>Shipping Times</b>
            <br />
            All orders come with free tracked shipping. This piece is hand made
            by order and will be shipped within 2-6 business days. Please see
            here for more information on delivery.
          </p>
          <p className="text-base">
            <b>Gift-Ready Packaging</b>
            <br />
            Every order comes packaged in our elegant signature gift box,
            perfect for gifting. No receipts or prices included inside. A
            digital receipt is emailed to the purchaser.
          </p>
          <p className="text-base">
            <b>Returns</b>
            <br />
            We want you to love your new pieces. We offer 90 day returns on all
            non-personalised items. As each personalised piece is made just for
            you, these are non-refundable, but if anything isn&apos;t quite
            right, we&apos;re here to help. Simply reach out to
            hello@celesteadoresupport.com and we&apos;ll make it right.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Description;
