import { produce } from 'immer';
import { create } from 'zustand';

export interface UserState {
  merchandiseId?: string
  onMerchandiseIdChange: (merchandiseId: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  merchandiseId: '',
  onMerchandiseIdChange: (merchandiseId: string) =>
    set(
      produce((state) => {
        state.merchandiseId = merchandiseId;
      }),
    ),
}));
