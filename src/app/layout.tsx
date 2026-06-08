import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/context/SessionProvider";
import ThemeProvider from "@/context/ThemeProvider";
import ToastProvider from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GEEKED | Premium Fashion",
  description: "Discover premium fashion at GEEKED. Luxury streetwear, modern essentials, and exclusive collections.",
  keywords: "fashion, streetwear, luxury, clothing, style",
  openGraph: {
    title: "GEEKED | Premium Fashion",
    description: "Discover premium fashion at GEEKED.",
    type: "website",
    locale: "en_US",
    siteName: "GEEKED",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <ToastProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
