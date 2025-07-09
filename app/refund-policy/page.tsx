import ContactEmail from '@/components/contact';
import Line from '@/components/line';
import React from 'react';

const PrivatePolicyPage = () => {
  return (
    <div className="flex flex-col gap-6 text-18">
      <h1 className="font-medium text-4xl uppercase">Return & Refund Policy</h1>
      <p>
        We hope you love your Celeste Adore purchase. However, if for any reason
        you would like to return your item, please read our full Return & Refund
        Policy below.
      </p>
      <h2 className="font-medium text-28 mt-9 uppercase">General Returns</h2>
      <p>
        We accept returns within <strong>90 days</strong> of your purchase date.
        To be eligible for a return, your item must meet the following
        conditions:
      </p>
      <ul className="list-disc pl-10">
        <li>
          It must be in <strong>the same condition</strong> that you received
          it: unworn, unused, and in its original packaging with all tags
          attached.
        </li>
        <li>
          You must provide a <strong>receipt or proof of purchase</strong>.
        </li>
      </ul>
      <p>
        <strong>Please note</strong>
      </p>
      <ul className="list-disc pl-10">
        <li>
          Return shipping costs are the responsibility of the customer. Celeste
          Adore does not cover return postage.
        </li>
        <li>
          Items sent back to us without first requesting a return will not be
          accepted.
        </li>
      </ul>
      <p>
        To start your return, please email us at <ContactEmail />.
        <br />
        Once your return is approved, we will provide you with full instructions
        on how and where to send your item.
      </p>
      <p>
        We recommend using a tracked shipping service for your return, as we
        cannot guarantee that we will receive your returned item without
        tracking.
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">
        Non-Returnable Items
      </h2>
      <p>We are unable to accept returns for the following:</p>
      <ul className="list-disc pl-10">
        <li>
          <strong>Personalised items</strong>, including any jewellery featuring
          initials, names, or custom engravings. This is because these pieces
          are custom-made specifically for you and cannot be resold.
        </li>
        <li>
          <strong>Sale items</strong> or products purchased during a promotional
          sale.
        </li>
        <li>
          <strong>Gift cards.</strong>
        </li>
      </ul>
      <p>
        <strong>Change of Mind:</strong>
        <br />
        <span>We do not accept returns for change of mind.</span>
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">
        Damages or Incorrect Items
      </h2>
      <p>
        Please inspect your order upon arrival. If your item is damaged,
        defective, or you received the wrong item, please contact us immediately
        at <ContactEmail />. <br />
        We will assess the issue promptly and offer a replacement or refund
        where appropriate.
      </p>
      <p>Please note:</p>
      <ul className="list-disc pl-10">
        <li>
          Damage caused by misuse, improper care, or normal wear and tear is not
          covered.
        </li>
        <li>
          In the event of damage, we may require photographs to assess the
          fault.
        </li>
      </ul>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">Exchanges</h2>
      <p>
        If you wish to exchange an item, the quickest way is to return your
        original item (if eligible) and place a new order. In some cases, we may
        be able to assist with a direct exchange; please contact our support
        team at <ContactEmail /> to discuss your options.
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">Refunds</h2>
      <p>
        Once your return is received and inspected, we will notify you whether
        the refund has been approved. If approved, your refund will be processed
        automatically to your original payment method within{' '}
        <strong>10 business days</strong>.
      </p>
      <p>Please note:</p>
      <ul className="list-disc pl-10">
        <li>
          It may take additional time for your bank or credit card provider to
          post the refund to your account.
        </li>
        <li>Shipping costs are non-refundable.</li>
        <li>
          We currently offer return addresses in Australia and the United
          Kingdom only. Customers located outside of these countries are still
          welcome to return their items; however, the return must be sent to one
          of these addresses at the customer&apos;s expense. When your return
          request is approved, we will confirm the appropriate return address
          based on your location.
        </li>
      </ul>
      <p>
        If more than <strong>15 business days</strong> have passed since we
        approved your return and you have not received your refund, please
        contact us at <ContactEmail />.
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">
        Order Cancellations & Modifications
      </h2>
      <p>
        At Celeste Adore, we begin processing orders promptly to ensure timely
        delivery and the careful crafting of personalised pieces.
      </p>
      <p>
        If you wish to <strong> cancel or modify your order</strong>, you must
        contact us within <strong>24 hours</strong> of placing it by emailing{' '}
        <ContactEmail />.
      </p>
      <p>
        After this 24-hour window, we are unable to guarantee changes or
        cancellations as:
      </p>
      <ul className="list-disc pl-10">
        <li>Your order may have already been sent into production.</li>
        <li>Personalised items may already be in the crafting process.</li>
      </ul>
      <p>
        Please note: <br />
        We reserve the right to{' '}
        <strong>decline a cancellation or modification request</strong> if the
        order has progressed beyond the point of alteration.
      </p>
      <p>
        For this reason, we recommend reviewing your order carefully before
        completing your purchase. If you have any questions or concerns, please
        don’t hesitate to reach out.
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">
        European Union 14-Day Cooling-Off Period
      </h2>
      <p>
        If your item was shipped to an address within the European Union, you
        have the right to cancel or return your order within{' '}
        <strong>14 days</strong> of receipt, for any reason and without
        justification. <br />
        As with all returns, the item must be unused, in its original condition
        with tags and packaging intact, and accompanied by proof of purchase.
      </p>
      <Line />
      <h2 className="font-medium text-28 mt-9 uppercase">Contact Us</h2>
      <p>
        For any questions regarding returns, refunds, or exchanges, please do
        not hesitate to contact our team at <ContactEmail />. We&apos;re always
        happy to help.
      </p>
    </div>
  );
};

export default PrivatePolicyPage;
