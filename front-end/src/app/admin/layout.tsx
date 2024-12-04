import { Header } from "@/components/Header";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "grid min-h-screen grid-rows-[auto_1fr]",
          inter.className,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
