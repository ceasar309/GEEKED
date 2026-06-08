import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCoupon: (code: string | null, discount: number) => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),

      setCoupon: (code, discount) =>
        set({ couponCode: code, discount }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTax: () => get().getSubtotal() * 0.08,

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount;
        const tax = get().getTax();
        return subtotal - discount + tax;
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "geeked-cart" }
  )
);
