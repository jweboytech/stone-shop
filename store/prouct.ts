import { produce } from 'immer';
import { create } from 'zustand';

export interface ProductState { 
    merchandiseId?: string;
    onMerchandiseIdChange: (merchandiseId: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    merchandiseId: '',
    onMerchandiseIdChange: (payload: string) =>
      set(
        produce((state) => {
            console.log('first', payload);
          state.merchandiseId = payload;
        }),
      ),
}));
