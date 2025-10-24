import "./globals.css";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/organisms/Navbar";

export const metadata = {
  title: "Nozah",
  description: "Tattoo artistry, bookings, and creative design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light">
            {children}

            {/* ✅ Global toaster for notifications */}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
