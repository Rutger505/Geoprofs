import axios from "@/lib/axios";
import { User } from "@/types/user";
import { JWT } from "@auth/core/jwt";
import Credentials from "@auth/core/providers/credentials";
import { AxiosError } from "axios";
import NextAuth, { Session } from "next-auth";

export interface ApiUser {
  UserID: number;
  UserFirstName: string;
  UserLastName: string;
  email: string;
  DateHired: Date;
  UserRoleID: number;
  RoleName: string;
  created_at: string | null;
  updated_at: string | null;
}

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
      authorize: async (credentials) => {
        try {
          const response = await axios.post<ApiUser>(
            "/auth/login",
            credentials,
          );
          const apiUser = response.data;

          return {
            id: apiUser.UserID.toString(),
            firstName: apiUser.UserFirstName,
            lastName: apiUser.UserLastName,
            email: apiUser.email,
            dateHired: new Date(apiUser.DateHired),
            roleId: apiUser.UserRoleID,
            roleName: apiUser.RoleName,
          };
        } catch (error) {
          if (
            !(error instanceof AxiosError) ||
            error.response?.status !== 401
          ) {
            console.error(error);
          }

          return null;
        }
      },
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
});
