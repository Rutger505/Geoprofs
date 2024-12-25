import { auth } from "@/lib/auth";
import { logout } from "@/lib/authActions";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export async function SignOutButton({
  children,
  onClick,
  ...props
}: Readonly<Props>) {
  const session = await auth();

  if (!session) {
    return null;
  }

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
