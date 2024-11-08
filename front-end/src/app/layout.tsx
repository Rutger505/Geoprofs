import { Header } from "@/components/Header";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geoprofs Verlofsysteem",
  description: "Geoprofs verlofsysteem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "min-h-screen grid grid-cols-[auto_*]",
          inter.className,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
