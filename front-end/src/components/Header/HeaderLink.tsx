"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  href: string;
}

export function HeaderLink({ name, href }: Props) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(false);

  useEffect(() => {
    setCurrentPage(pathname === href);
  }, [pathname, href]);

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
