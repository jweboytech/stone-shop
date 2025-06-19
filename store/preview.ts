import { produce } from 'immer';
import { create } from 'zustand';

export interface PreviewState {
  visible: boolean;
  onOpen: (payload?: number) => void;
  onClose: () => void;
  index: number;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  visible: false,
  index: 0,
  onOpen: (payload) =>
    set(
      produce((state) => {
        state.visible = true;
        state.index = payload;
      }),
    ),
  onClose: () =>
    set(
      produce((state) => {
        state.visible = false;
      }),
    ),
}));
