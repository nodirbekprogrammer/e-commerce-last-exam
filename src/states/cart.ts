import CartProduct from "@/types/cartProduct";
import ProductData from "@/types/productData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartProduct[];
  addToCart: (product: ProductData) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getTotalPrice: () => number;
}

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
        
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === existingItem.product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product?.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product?.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    { name: "cart-product" }
  )
);

export default useCart;
