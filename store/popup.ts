import { produce } from 'immer';
import { create } from 'zustand';

export interface PopupState {
  visible: boolean;
  data?: AnyObject;
  openPopup: (payload?: AnyObject) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  visible: false,
  openPopup: () =>
    set(
      produce((state) => {
        state.visible = true;
      }),
    ),
  closePopup: () =>
    set(
      produce((state) => {
        state.visible = false;
      }),
    ),
}));
