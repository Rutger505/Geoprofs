import { User } from "@/lib/auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: User;
  }

  interface JWT {
    user: User;
  }
}
