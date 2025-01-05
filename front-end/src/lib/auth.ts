import axios from "@/lib/axios";
import { User } from "@/types/user";
import { JWT } from "@auth/core/jwt";
import Credentials from "@auth/core/providers/credentials";
import { AxiosError } from "axios";
import NextAuth, { Session } from "next-auth";

export interface ApiUser
  extends Omit<User, "dateHired" | "createdAt" | "updatedAt"> {
  dateHired: string;
  created_at: string | null;
  updated_at: string | null;
}

export function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    ...apiUser,
    dateHired: new Date(apiUser.dateHired),
    createdAt: apiUser.created_at ? new Date(apiUser.created_at) : null,
    updatedAt: apiUser.updated_at ? new Date(apiUser.updated_at) : null,
  };
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
      authorize: async (credentials): Promise<User | null> => {
        try {
          const response = await axios.post<ApiUser>(
            "/auth/login",
            credentials,
          );
          const apiUser = response.data;

          return mapApiUserToUser(apiUser);
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
        token.user = user as User;

        token.preferences = {
          useAsEmployee: true,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      session.preferences = token.preferences;
      return session;
    },
  },
});
