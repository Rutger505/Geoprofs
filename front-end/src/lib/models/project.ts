import axios from "@/lib/axios";
import { AxiosError } from "axios";

export interface Project {
  id: number;
  name: string;
}

export async function getProjects() {
  const projectsResponse = await axios.get<Project[]>("/projects");
  return projectsResponse.data;
}

export async function createProject(name: string) {
  try {
    await axios.post("/projects", {
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
