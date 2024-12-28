"use client";

import { logout } from "@/lib/authActions";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Headless sign-out button. always renders.
 */
export function SignOutButton({
  children,
  onClick,
  ...props
}: Readonly<Props>) {
  return (
    <button
      {...props}
      onClick={async (e) => {
        if (onClick) {
          onClick(e);
        }
        await logout();
      }}
    >
      {children}
    </button>
  );
}
