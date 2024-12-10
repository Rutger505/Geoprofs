import { env } from "@/lib/env";
import Axios from "axios";

const isServer = typeof window === "undefined";

const axios = Axios.create({
  baseURL: isServer ? env.BACKEND_URL : env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
