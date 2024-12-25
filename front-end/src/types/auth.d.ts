import { User as GoodUser } from "@/types/user";
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
