import { produce } from 'immer';
import { create } from 'zustand';

interface VariantPayload {
  merchandiseId?: string;
  variantName?: string;
  remark?: string;
  category?: string;
}

export interface ProductState {
  merchandiseId?: string;
  variantPreviewImage?: string;
  variantData: VariantPayload;
  letterMap: Record<string, string>;
  selectedKeys: string[];
  onMerchandiseIdChange: (merchandiseId: string) => void;
  onVariantPreviewImageChange: (merchandiseId: string) => void;
  onVariantChange: (payload: VariantPayload) => void;
  onLetterChange: (payload: Option) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  merchandiseId: '',
  variantPreviewImage: '',
  variantData: {
    merchandiseId: '',
    variantName: '',
    remarkMap: {},
    remark: '',
    category: '',
  },
  selectedKeys: [],
  letterMap: {},
  onMerchandiseIdChange: (payload) =>
    set(
      produce((state) => {
        state.merchandiseId = payload;
      }),
    ),
  onVariantPreviewImageChange: (payload) =>
    set(
      produce((state) => {
        state.variantPreviewImage = payload;
      }),
    ),
  onLetterChange: (payload) =>
    set(
      produce((state) => {
        state.letterMap[payload.label] = payload.value;
      }),
    ),
  onVariantChange: (payload) =>
    set(
      produce((state) => {
        for (const key in payload) {
          const value = payload[key as keyof VariantPayload];

          if (key === 'remark' && payload.remark) {
            state.variantData.remarkMap[state.variantData.variantName] =
              payload.remark;

            state.variantData.remark = Object.entries(
              state.variantData.remarkMap,
            )
              .reduce<string[]>((arr, obj) => {
                const [key, value] = obj;

                arr.push(`${key}: ${value}`);

                return arr;
              }, [])
              .join(',');
          } else {
            state.variantData[key] = value;
          }
        }

        if (payload.merchandiseId) {
          if (payload.category) {
            state.selectedKeys[0] = payload.merchandiseId;
            state.selectedKeys[1] = undefined;
          } else {
            state.selectedKeys[1] = payload.merchandiseId;
          }
        }
      }),
    ),
}));
