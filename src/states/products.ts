"use client";

import { create } from "zustand";
import { toast } from "react-toastify";

import { request } from "@/server/request";
import ApiData from "@/types/api";
import ProductType from "@/types/product";

interface ProductStates {
  search: string;
  category: string;
  total: number;
  page: number;
  loading: boolean;
  data: ProductType[];
  getData: (search: string, category: string, page: number) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setPage: (e: React.ChangeEvent<unknown>, page: number) => void;
  addProduct: (product: ProductType, selected: string | null) => void;
  editProduct: (product: ProductType, id: string) => void;
  deleteProduct: (id: string) => void;
}

const params =
  typeof window !== "undefined"
    ? new URLSearchParams(window?.location?.search)
    : false;

const category = params ? params.get("category") : "";
const search = params ? params.get("search") : "";

const useProducts = create<ProductStates>((set, get) => {
  return {
    loading: false,
    data: [],
    page: 1,
    total: 0,
    search: search || "",
    category: category || "",
    getData: async (search, category, page) => {
      try {
        set({ loading: true });
        const {
          data: { total, products },
        } = await request.get<ApiData>(
          `product?page=${page}&search=${search}`,
          {
            params: { category: category || undefined },
          }
        );
        set({ data: products });
        set({ total: total });
      } finally {
        set({ loading: false });
      }
    },
    addProduct: async (product, selected) => {
      try {
        set({ loading: true });
        if (selected === null) {
          await request.post("product", product);
        } else {
          await request.put(`product/${selected}`, product);
        }
        toast.success("Changed successfully");
        get().getData();
      } finally {
        set({ loading: false });
      }
    },
    editProduct: async (product, id) => {
      try {
        set({ loading: true });
        await request.put(`product/${id}`, product);
        toast.success("Information edited successfully");
      } finally {
        set({ loading: false });
      }
    },
    deleteProduct: async (id) => {
      try {
        set({ loading: true });
        await request.delete(`product/${id}`);
        await get().getData();
        toast.info("Product deleted");
      } finally {
        set({ loading: false });
      }
    },
    handleCategory: (e) => {
      const { category, page } = get();

      const value = e.target.value;
      set({ category: value, page: 1 });
      // if (value === "") {
      //   router.push(`products`);
      // } else {
      //   router.push(`products?category=${value}`);
      // }
    },
    handleSearch: (e) => {
      set({ search: e.target.value, page: 1 });
    },
    setPage: (e, page) => {
      set({ page: page });
    },
  };
});

export default useProducts;
