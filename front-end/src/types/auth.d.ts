import { User as GoodUser } from "@/lib/auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: GoodUser;
  }

  type User = GoodUser;
}

declare module "next-auth/jwt" {
  interface JWT {
    user: GoodUser;
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: GoodUser;
  }

  interface JWT {
    user: GoodUser;
  }
}
