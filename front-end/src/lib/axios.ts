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

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Axios Error with response:", error.response?.data.message);

      console.error("Axios Error Response:", {
        data: error.response.data,
      });
    } else {
      console.error("Axios Error without response:", error.message);
    }
  },
);

export default axios;
