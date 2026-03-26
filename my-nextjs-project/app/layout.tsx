import "./globals.css";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

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
            <AuthProvider>
              {children}

              {/* ✅ Global toaster for notifications */}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
