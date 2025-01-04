import { env } from "@/env";
import Axios from "axios";

if (typeof window !== "undefined") {
  throw new Error(
    "This axios config is made for Laravel which is accessable from server side only.",
  );
}

const axios = Axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axios;
