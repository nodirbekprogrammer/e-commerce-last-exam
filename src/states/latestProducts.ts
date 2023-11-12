import { create } from "zustand";

import { request } from "@/server/request";
import ProductType from "@/types/product";

interface LatestType {
  loading: boolean;
  data: ProductType[];
  getData: () => void;
}

const useLatestProducts = create<LatestType>()((set) => ({
  loading: false,
  data: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: ProductType[] } = await request.get(
        "last-products"
      );
      set({ data: data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLatestProducts;
