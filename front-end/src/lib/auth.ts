import { authorize } from "@/lib/signInApi";
import { User } from "@/types/user";
import { JWT } from "@auth/core/jwt";
import Credentials from "@auth/core/providers/credentials";
import NextAuth, { Session } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      authorize,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as User;
      return session;
    },
  },
  basePath: "/auth",
});
