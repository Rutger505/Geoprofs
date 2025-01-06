"use client";

import { SignOutButton as HeadlessSignOutButton } from "@/components/Auth/internal/SignOutButton";
import { useSession } from "next-auth/react";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Headless sign-out button. Doesn't render if the user is not signed in.
 */
export function SignOutButton(props: Readonly<Props>) {
  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return <HeadlessSignOutButton {...props} />;
}
