"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
  href: string;
}

export function HeaderLink({ name, href }: Props) {
  const pathname = usePathname();
  const currentPage = pathname === href;

  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        "rounded-sm p-3 hover:opacity-90",
        currentPage && "bg-cyan-100",
      )}
    >
      {name}
    </Link>
  );
}
