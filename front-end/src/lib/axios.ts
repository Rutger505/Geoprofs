import { env } from "@/lib/env";
import Axios from "axios";

import { setupServer } from "@/lib/axiosServerInterceptor";

const isServer = typeof window === "undefined";

const axios = Axios.create({
  baseURL: isServer ? env.BACKEND_URL : env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

if (isServer) {
  setupServer();
}

export default axios;
