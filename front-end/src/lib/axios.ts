import { env } from "@/env";
import Axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }

  export interface AxiosResponse {
    metadata?: {
      startTime: Date;
    };
  }
}

if (typeof window !== "undefined") {
  throw new Error(
    "This axios config is made for Laravel which is accessible from server side only.",
  );
}

const axios = Axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const startTime = response.config?.metadata?.startTime;
    const endTime = new Date();

    const duration = startTime
      ? endTime.getTime() - startTime.getTime()
      : undefined;

    console.log(
      ` Laravel ${response.config.method?.toUpperCase()} ${response.config.url} ${
        response.status
      } in ${duration}ms`,
    );

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Axios Error with response:", error.response?.data.message);
      console.error("Axios Error Response:", {
        data: error.response.data,
      });
    } else {
      console.error("Axios Error without response:", error.message);
    }

    return Promise.reject(error as Error);
  },
);

export default axios;
