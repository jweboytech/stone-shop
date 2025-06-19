import React from 'react';

import VisaIcon from '../icons/visa';
import AmexIcon from '../icons/amex';
import ApplePayIcon from '../icons/applePay';
import PaypalIcon from '../icons/paypal';
import GooglePayIcon from '../icons/googlePay';
import MasterIcon from '../icons/master';

const Payments = () => {
  return (
    <div className="flex gap-2 items-center justify-center pt-4">
      <AmexIcon />
      <ApplePayIcon />
      <GooglePayIcon />
      <MasterIcon />
      <PaypalIcon />
      <VisaIcon />
    </div>
  );
};

export default Payments;
