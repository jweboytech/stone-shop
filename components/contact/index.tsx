import Link from 'next/link';
import React from 'react';

const ContactEmail = () => {
  return (
    <Link href="mailto:hello@perperstone.com">
      📧 <strong className="underline">hello@perperstone.com</strong>
    </Link>
  );
};

export default ContactEmail;
