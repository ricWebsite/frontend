"use client"; 

import { Toaster } from "sonner";

import { Route, Switch } from "wouter";
import ErrorBoundary from "../components/ErrorBoundary";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
 
type Theme = "light" | "dark";
type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Minimal ThemeProvider used by the app when ./contexts/ThemeContext is missing.
 * - defaultTheme: initial theme ("light" | "dark")
 * - switchable: kept for API compatibility with existing usage
 */
export function ThemeProvider({
  defaultTheme = "light",
  switchable,
  children,
}: {
  defaultTheme?: Theme;
  switchable?: boolean;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // apply theme to document element for CSS variables (index.css can target [data-theme="dark"])
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      // ignore in non-browser environments
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

import Home from "./home/Home";
import Portfolio from "./portfolio/Portfolio";
import Bookings from "./bookings/Bookings";
import Shop from "./shop/Shop";
import Blog from "./blog/Blog";
import Reviews from "./reviews/Reviews";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/bookings"} component={Bookings} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/reviews"} component={Reviews} />
      {/* Final fallback route */}
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <>
          <Toaster />
          <Router />
        </>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
