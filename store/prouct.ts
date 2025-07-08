import { produce } from 'immer';
import { create } from 'zustand';

export interface ProductState {
  merchandiseId?: string;
  variantPreviewImage?: string;
  onMerchandiseIdChange: (merchandiseId: string) => void;
  onVariantPreviewImageChange: (merchandiseId: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  merchandiseId: '',
  variantPreviewImage: '',
  onMerchandiseIdChange: (payload: string) =>
    set(
      produce((state) => {
        state.merchandiseId = payload;
      }),
    ),
  onVariantPreviewImageChange: (payload: string) =>
    set(
      produce((state) => {
        state.variantPreviewImage = payload;
      }),
    ),
}));
