import { request } from "@/server/request";
import CategoryType from "@/types/category";
import { create } from "zustand";

interface StateType {
  loading: boolean;
  data: CategoryType[];
  getData: () => void;
}

const useCategories = create<StateType>()((set, get) => ({
  loading: false,
  data: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: CategoryType[] } = await request.get(
        "category"
      );
      set({ data: data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategories;
