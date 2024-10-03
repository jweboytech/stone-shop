import { produce } from "immer";
import { create } from "zustand";

export interface DrawerState {
  visible: boolean;
  data?: AnyObject;
  openDrawer: (payload?: AnyObject) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  visible: false,
  openDrawer: (payload) =>
    set(
      produce((state) => {
        state.visible = true;
        state.data = payload;
      })
    ),
  closeDrawer: () =>
    set(
      produce((state) => {
        state.visible = false;
      })
    ),
}));
