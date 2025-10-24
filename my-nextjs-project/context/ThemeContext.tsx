"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  defaultTheme = "light",
  children,
}: {
  defaultTheme?: Theme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Apply theme to <html> element
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      // safe in SSR
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
