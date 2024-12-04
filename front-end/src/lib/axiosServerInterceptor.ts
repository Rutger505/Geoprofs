"use server";

import axios from "@/lib/axios";
import { cookies } from "next/headers";

export async function setupServer() {
  axios.interceptors.request.use(async (config) => {
    const cookiesList = await cookies();

    const sessionCookie = cookiesList.get("geoprofs_back_end_session");
    if (sessionCookie?.name && sessionCookie?.value) {
      config.headers.Cookie = `${sessionCookie.name}=${sessionCookie.value}`;
    }

    return config;
  });
}
