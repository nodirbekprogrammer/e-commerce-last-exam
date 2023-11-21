import { request } from "@/server/request";
import CartProduct from "@/types/cartProduct";
import ProductData from "@/types/productData";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartProduct[];
  loading: boolean;
  addToCart: (product: ProductData) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getTotalPrice: () => number;
  order: (comment: string) => void;
}

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
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
      order: async (comment) => {
        const { items } = get();

        const obj = {
          cart: items.map((pr) => ({
            product: pr.product?.id,
            quantity: pr.product?.quantity,
          })),
          comment,
        };

        console.log(obj);
        

        try {
          set({ loading: true }); 
          await request.post("payment", obj);
          // router.push("/orders");
          set({ items: [] });
          toast.success("Buyurtmangiz jo'natildi!");
        } finally {
          set({ loading: false });
        }
      },
    }),

    { name: "cart-product" }
  )
);

export default useCart;
