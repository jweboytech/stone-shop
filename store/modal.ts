import { ModalProps } from '@nextui-org/modal';
import { produce } from 'immer';
import { ObjectSchema } from 'yup';
import { create } from 'zustand';

export type ModalKey =
  | 'category'
  | 'mallOrder'
  | 'stock'
  | 'freightFee'
  | 'default'
  | 'refund'
  | 'pledge';

export type ModalOptions = Omit<ModalProps, 'children'> & {
  children?: string | React.ReactElement;
  form?: { schema: ObjectSchema<any>; items: any[]; defaultValues?: AnyObject };
  onConfirm?: <T>() => void | (<T>(param?: T) => Promise<T>);
  payload?: Record<string, any>;
  props?: Omit<ModalProps, 'children'>;
};

export interface ModalState {
  activeKey: ModalKey;
  openModals: Record<ModalKey, ModalOptions>;
  openModal: (id: ModalKey, payload?: ModalOptions) => void;
  closeModal: (id: ModalKey) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeKey: 'default',
  openModals: {
    props: {},
    default: {},
    category: {
      isOpen: false,
      onConfirm: () => {},
    },
  },
  openModal: (key, payload) =>
    set(
      produce((state) => {
        state.openModals[key] = { isOpen: true, ...payload };
        state.activeKey = key;
      }),
    ),
  closeModal: (key) =>
    set(
      produce((state) => {
        state.openModals[key] = { isOpen: false };
      }),
    ),
}));
