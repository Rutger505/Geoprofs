import { authentication } from "@/lib/auth";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await authentication();

  console.log(user);

  return children;
}
