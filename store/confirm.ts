import React from 'react';
import { create } from 'zustand';

interface ConfirmStore {
  isOpen: boolean;
  title: string;
  content: string | React.ReactElement;
  onConfirm: () => void | (() => Promise<void>);
  onCancel: () => void;
  open: (
    payload: Partial<Omit<ConfirmStore, 'open' | 'close' | 'isOpen'>>,
  ) => void;
  close: () => void;
  cancelText?: string;
  okText?: string;
}

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  title: 'Tips',
  content: '',
  cancelText: 'Cancel',
  okText: 'Confirm',
  onConfirm: () => {},
  onCancel: () => {},
  open: (payload) => set({ isOpen: true, ...payload }),
  close: () => set({ isOpen: false }),
}));
