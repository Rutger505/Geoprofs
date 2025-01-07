import { User as GoodUser } from "@/types/user";
import "next-auth";

export interface Preferences {
  useAsEmployee: boolean;
}

declare module "next-auth" {
  interface Session {
    user: GoodUser;
    preferences: Preferences;
  }

  type User = GoodUser;
}

declare module "next-auth/jwt" {
  interface JWT {
    user: GoodUser;
    preferences: Preferences;
  }
}
