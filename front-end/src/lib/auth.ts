import axios from "@/lib/axios";
import Credentials from "@auth/core/providers/credentials";
import { AxiosError } from "axios";
import NextAuth from "next-auth";

export interface ApiUser {
  UserID: number;
  UserFirstName: string;
  UserLastName: string;
  email: string;
  DateHired: Date;
  UserRoleID: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
}

export interface LoginErrors {
  email?: string;
  password?: string;
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
          const loginResponse = await axios.post<ApiUser>(
            "/auth/login",
            credentials,
          );

          const cookies = loginResponse.headers["set-cookie"];
          console.log(cookies);

          const userResponse = await axios.get<ApiUser>("/auth/user", {
            headers: {
              Cookie: cookies?.join("; "),
            },
          });
          const apiUser = userResponse.data;

          return {
            id: apiUser.UserID.toString(),
            firstName: apiUser.UserFirstName,
            lastName: apiUser.UserLastName,
            email: apiUser.email,
            dateHired: new Date(apiUser.DateHired),
            roleId: apiUser.UserRoleID,
          };
        } catch (error) {
          if (!(error instanceof AxiosError) || error.response?.status !== 422)
            throw error;

          return null;
        }
      },
    }),
  ],
  events: {
    async signOut() {
      // console.log("hi");
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
});
