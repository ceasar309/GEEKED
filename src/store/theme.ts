"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  mode: "light" | "dark";
  toggle: () => void;
  setMode: (mode: "light" | "dark") => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      toggle: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
      setMode: (mode) => set({ mode }),
    }),
    { name: "geeked-theme" }
  )
);
