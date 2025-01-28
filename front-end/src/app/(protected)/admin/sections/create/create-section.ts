"use server";

import axios from "@/lib/axios";
import { AxiosError } from "axios";

export async function createSection(name: string) {
  try {
    await axios.post("/sections", {
      name,
    });
  } catch (error) {
    if (!(error instanceof AxiosError) || error.response?.status !== 409) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        console.error(error.response?.data);
      }

      return { error: "Er is iets misgegaan" };
    }

    return { error: "Unexpected error" };
  }
}
