"use client";

import { logout } from "@/lib/authActions";

export default function Page() {
  return (
    <button
      className="flex items-center justify-center"
      onClick={() => logout()}
    >
      logout
    </button>
  );
}
