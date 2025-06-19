import React from 'react';

import { ModalKey, ModalOptions, useModalStore } from '@/store/modal';

export const useModal = <T>(id: ModalKey) => {
  const { openModal, closeModal, openModals } = useModalStore();

  const isOpen = openModals[id]?.isOpen || false;

  const open = React.useCallback(
    (options?: ModalOptions) => openModal(id, options),
    [openModal, id],
  );
  const close = React.useCallback(() => closeModal(id), [closeModal, id]);

  return { isOpen, openModal: open, closeModal: close };
};
