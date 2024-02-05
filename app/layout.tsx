import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MicroService ecommerce",
  description: "MicroService ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <DataProvider>
        <AppRouterCacheProvider>
          
            {children}
          
        </AppRouterCacheProvider>
        </DataProvider>
      </body>
    </html>
  );
}
