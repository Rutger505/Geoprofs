"use server";

import { env } from "@/env";
import Axios from "axios";

const axios = Axios.create({
  baseURL: env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axios;
