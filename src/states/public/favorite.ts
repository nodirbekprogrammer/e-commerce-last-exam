import ProductData from "@/types/productData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: ProductData[];
  addToFavorites: (product: ProductData) => void;
  removeFromFavorites: (productId: string) => void;
  // isFavorite: (productId: string | undefined) => boolean;
}

const useFavorite = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: [],

      addToFavorites: (product) => {
        set((state) => ({
          favorites: [...state.favorites, product],
        }));
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (product) => product?.id !== productId
          ),
        }));
      },
      // isFavorite: (productId) => {
      //   const { favorites } = get();
      //   return favorites.find((product: Product) => product?.id === productId);
      // },
    }),
    { name: "favorite" }
  )
);

export default useFavorite;
