import { ApiUser, User } from "@/lib/auth";
import axios from "@/lib/axios";
import Credentials from "@auth/core/providers/credentials";
import { AxiosError } from "axios";
import NextAuth from "next-auth";

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
          console.log(loginResponse.status);

          const cookies = loginResponse.headers["set-cookie"];
          console.log(cookies);

          const userResponse = await axios.get<ApiUser>("/auth/user", {
            headers: {
              Cookie: cookies?.join("; "),
            },
          });
          console.log(userResponse.status);
          const apiUser = userResponse.data;
          console.log(apiUser);

          return {
            id: apiUser.UserID.toString(),
            firstName: apiUser.UserFirstName,
            lastName: apiUser.UserLastName,
            email: apiUser.email,
            dateHired: new Date(apiUser.DateHired),
            roleId: apiUser.UserRoleID,
          };
        } catch (error) {
          console.log(error);
          if (
            !(error instanceof AxiosError) /*|| error.response?.status !== 422*/
          )
            throw error;

          if (error.response?.status === 401) {
            console.log(error.request);
          }

          return error.response.data.errors;
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
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
});
