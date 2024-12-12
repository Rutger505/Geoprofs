import axios from "@/lib/axios";
import { JWT } from "@auth/core/jwt";
import Credentials from "@auth/core/providers/credentials";
import { AxiosError } from "axios";
import NextAuth, { Session } from "next-auth";
import { cookies } from "next/headers";

interface ApiLoginResponse {
  user: ApiUser;
}

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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateHired: Date;
  roleId: number;
  roleName: string;
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
          const loginResponse = await axios.post<ApiLoginResponse>(
            "/auth/login",
            credentials,
          );

          const responseCookies = loginResponse.headers["set-cookie"];
          if (!responseCookies) {
            throw new Error("No session cookies in response");
          }

          // Parse and set each cookie in the browser to allow future requests
          for (const cookie of responseCookies) {
            axios.defaults.headers.common["Cookie"] =
              responseCookies.join("; ");

            const [cookieName, ...rest] = cookie.split("=");
            const cookieValue = rest.join("=").split(";")[0];

            (await cookies()).set(cookieName, cookieValue, {
              sameSite: "lax",
            });
          }

          const apiUser = loginResponse.data.user;

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
          if (!(error instanceof AxiosError) || error.response?.status !== 422)
            throw error;

          return new Error("Shut yo bitch ass up");
        }
      },
    }),
  ],
  events: {
    async signOut() {
      await axios.post("/auth/logout");
    },
  },
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
