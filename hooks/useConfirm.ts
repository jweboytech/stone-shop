import { useConfirmStore } from '@/store';

export const useConfirmModal = () => {
  const { open } = useConfirmStore();

  return { openConfirm: open };
};
