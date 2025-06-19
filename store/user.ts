import { produce } from 'immer';
import { create } from 'zustand';

export interface UserState {
  loginStatus?: 'ONLINE' | 'OFFLINE';
  logout: VoidFunction;
  login: VoidFunction;
}

export const useUserStore = create<UserState>((set) => ({
  loginStatus: 'OFFLINE',
  logout: () =>
    set(
      produce((state) => {
        state.loginStatus = 'OFFLINE';
      }),
    ),
  login: () =>
    set(
      produce((state) => {
        state.loginStatus = 'ONLINE';
      }),
    ),
}));
