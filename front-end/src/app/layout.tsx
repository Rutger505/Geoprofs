import { Header } from "@/components/Header";
import { TanstackQueryProvider } from "@/components/Providers/TanstackQueryProvider";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geoprofs Verlofsysteem",
  description: "Geoprofs verlofsysteem",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQueryProvider>
          <SessionProvider basePath={"/auth"}>
            <div className={"grid min-h-screen grid-rows-[auto_1fr]"}>
              <Header />
              {children}
            </div>
          </SessionProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
