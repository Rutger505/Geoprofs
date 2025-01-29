import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { User } from "@/types/user";

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

export async function getUsersInProject(projectId: string | number) {
  const usersResponse = await axios.get<User[]>(`/projects/users/${projectId}`);
  return usersResponse.data;
}
