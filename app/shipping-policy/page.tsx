import Link from 'next/link';
import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="py-10 px-4 text-18">
      <h1 className="uppercase font-bold text-28">
        <strong>Shipping Policy</strong>
      </h1>
      <p>
        Thank you for visiting and shopping at Celeste Adore Following are the
        terms and conditions that constitute our Shipping Policy.
      </p>
      <h3 className="font-medium text-22 mt-15 mb-6 uppercase">
        <strong>Domestic & International Shipping Policy</strong>
      </h3>
      <p className="mb-6">
        All orders are custom made on demand. Due to this, orders are processed
        within 5-10 business days. Orders are not shipped or delivered on
        weekends or holidays.
      </p>
      <p>
        If we are experiencing a high volume of orders, shipments may be delayed
        by a few days. Please allow additional days in transit for delivery. If
        there will be a significant delay in shipment of your order, we will
        contact you via email or telephone.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Shipping rates & delivery estimates</strong>
      </p>
      <p className="mb-6">All orders are offered free shipping.</p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Shipment confirmation & Order tracking</strong>
      </p>
      <p className="mb-6">
        You will receive a Shipment Confirmation email once your order has
        shipped containing your tracking number(s). The tracking number will be
        active within 24 hours.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Customs, Duties and Taxes</strong>
      </p>
      <p className="mb-6">
        Celeste Adore is not responsible for any customs and taxes applied to
        your order. All fees imposed during or after shipping are the
        responsibility of the customer (tariffs, taxes, etc.).
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Damages</strong>
      </p>
      <p className="mb-6">
        Celeste Adore insures all shipping orders. If you received your order
        damaged, please contact us at{' '}
        <span className="underline">hello@celesteadoresupport.com</span>.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Returns Policy</strong>
      </p>
      <p>
        Our{' '}
        <Link className="underline" href="/refund-policy">
          Return & Refund Policy
        </Link>{' '}
        provides detailed information about options and procedures for returning
        your order.
      </p>
    </div>
  );
};

export default ShippingPolicyPage;
