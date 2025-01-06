import { SignOutButton as HeadlessSignOutButton } from "@/components/Auth/internal/SignOutButton";
import { auth } from "@/lib/auth";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Headless sign-out button. Doesn't render if the user is not signed in.
 */
export async function SignOutButton(props: Readonly<Props>) {
  const session = await auth();

  if (!session) {
    return null;
  }

  return <HeadlessSignOutButton {...props} />;
}
