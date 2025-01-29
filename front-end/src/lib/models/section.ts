import axios from "@/lib/axios";
import { AxiosError } from "axios";

export interface Section {
  id: number;
  name: string;
}

export async function getSections() {
  const sectionsResponse = await axios.get<Section[]>("/sections");
  return sectionsResponse.data;
}

export async function getUserSection(userId: string) {
  const sectionResponse = await axios.get<Section>(`/users/${userId}/section`);
  return sectionResponse.data;
}

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
