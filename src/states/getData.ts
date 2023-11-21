import { request } from "@/server/request";
import UniversalData from "@/types/universalData";
import { create } from "zustand";

interface initialState {
  latestProducts: UniversalData[];
  categories: UniversalData[];
  loading: boolean;
  getLatestProducts: () => void;
  getAllCategories: () => void;
}

const useGetData = create<initialState>()((set, get) => {
  return {
    latestProducts: [],
    categories: [],
    loading: false,
    getLatestProducts: async () => {
      try {
        const { latestProducts } = get();
        if (latestProducts.length < 1) {
          set({ loading: true });
          const { data } = await request.get<UniversalData[]>("last-products");
          set({ latestProducts: data });
        }
      } finally {
        set({ loading: false });
      }
    },
    getAllCategories: async () => {
      try {
        const { categories } = get();
        if (categories.length < 1) {
          set({ loading: true });
          const { data } = await request.get<UniversalData[]>("category");
          set({ categories: data });
        }
      } finally {
        set({ loading: false });
      }
    },
  };
});

export default useGetData;
