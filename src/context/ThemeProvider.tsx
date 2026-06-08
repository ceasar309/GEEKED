"use client";

import { useEffect } from "react";
import { useTheme } from "@/store/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
}
