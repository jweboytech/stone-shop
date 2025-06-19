'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { ModalProvider } from '@/components/modal';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return children;
}
