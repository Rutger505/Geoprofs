import { ApiUser, csrf } from "@/lib/auth";
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
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials.");
        }

        await csrf();

        try {
          const userResponse = await axios.get<ApiUser>("/auth/user");
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
          if (!(error instanceof AxiosError) || error.response?.status !== 401)
            throw error;

          return null;
        }
      },
    }),
  ],
});
