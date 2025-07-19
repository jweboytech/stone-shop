import ContactEmail from '@/components/contact';

const ShippingPolicyPage = () => {
  return (
    <div className="py-10 px-4 text-18">
      <h1 className="uppercase font-bold text-28">
        <strong>Shipping Policy</strong>
      </h1>
      <p>
        Thank you for choosing <b>Perper Stone</b>. Below are the terms and
        details of our shipping policy.
      </p>
      <h3 className="font-medium text-22 mt-15 mb-6 uppercase">
        <strong>Domestic & International Shipping</strong>
      </h3>
      <p className="mb-6">
        All orders are custom made to order and typically take{' '}
        <b>14-20 business days</b> to process and ship. Please note that we do
        not ship on weekends or public holidays.
      </p>
      <p>
        During periods of high demand, processing times may be extended. We
        kindly ask you to allow extra time for delivery. Should there be any
        significant delay, we will notify you promptly via email or phone.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Shipping Rates & Delivery Estimates</strong>
      </p>
      <p className="mb-6">We offer free standard shipping on all orders.</p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Shipment Confirmation & Tracking</strong>
      </p>
      <p className="mb-6">
        Once your order has shipped, you will receive a confirmation email with
        your tracking number. Tracking information usually becomes active within{' '}
        <b>24-48 hours</b> after shipment, allowing you to monitor your package
        in real time.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Customs, Duties & Taxes</strong>
      </p>
      <p className="mb-6">
        Perper Stone is not responsible for any customs fees, duties, or taxes
        incurred. Any such charges are the responsibility of the customer.
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Damages in Transit</strong>
      </p>
      <p className="mb-6">
        All shipments are insured. If your order arrives damaged, please contact
        us promptly at:
        <ContactEmail />
      </p>
      <p className="font-bold text-base mt-15 mb-6">
        <strong>Returns Policy</strong>
      </p>
      <p>
        For detailed information on returns and refunds, please refer to our
        Return & Refund Policy.
      </p>
    </div>
  );
};

export default ShippingPolicyPage;
