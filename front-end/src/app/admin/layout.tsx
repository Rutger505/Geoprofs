import { auth } from "@/lib/auth";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  console.log(session);

  return children;
}
