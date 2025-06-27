import { produce } from 'immer';
import { create } from 'zustand';

export interface DrawerState {
  visible: boolean;
  // data?: AnyObject;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleStatus: (value: boolean) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  visible: false,
  toggleStatus: (payload) =>
    set(
      produce((state) => {
        state.visible = payload;
      }),
    ),
  openDrawer: () =>
    set(
      produce((state) => {
        state.visible = true;
      }),
    ),
  closeDrawer: () =>
    set(
      produce((state) => {
        state.visible = false;
      }),
    ),
}));
