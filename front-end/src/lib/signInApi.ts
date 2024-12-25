"use server";
import axios from "@/lib/axios";
import { ApiResponseError } from "@/lib/errors";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

interface AuthorizeCredentials {
  email: unknown;
  password: unknown;
}

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

export async function authorize(credentials: Partial<AuthorizeCredentials>) {
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
      axios.defaults.headers.common["Cookie"] = responseCookies.join("; ");

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
    if (!(error instanceof AxiosError) || error.response?.status !== 422) {
      return null; // Return null to display the default error message
    }

    // In this case the error contains user-friendly error messages
    throw new ApiResponseError(error.response.data.message);
  }
}
