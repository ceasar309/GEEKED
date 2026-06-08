import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleItem: (id: string) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) =>
        set((state) => ({
          items: state.items.includes(id) ? state.items : [...state.items, id],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i !== id),
        })),
      isWishlisted: (id) => get().items.includes(id),
      toggleItem: (id) => {
        const { items, addItem, removeItem } = get();
        if (items.includes(id)) removeItem(id);
        else addItem(id);
      },
    }),
    { name: "geeked-wishlist" }
  )
);
