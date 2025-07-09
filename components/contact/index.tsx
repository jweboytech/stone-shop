import Link from 'next/link';
import React from 'react';

const ContactEmail = () => {
  return (
    <Link href="mailto:hello@celesteadoresupport.com">
      <strong className="underline">hello@celesteadoresupport.com</strong>
    </Link>
  );
};

export default ContactEmail;
