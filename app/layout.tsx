import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store"; // Upewnij się, że ścieżka do Twojego pliku store jest poprawna

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Św. Michał - Burger Lunch Club",
  description: "System lojalnościowy dla Św. Michał",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
