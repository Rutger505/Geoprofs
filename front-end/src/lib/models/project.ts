import axios from "@/lib/axios";
import { User } from "@/types/user";
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
    if (error instanceof AxiosError) {
      console.error(error.message);
      console.error(error.response?.data);
    }

    return { error: "Er is iets misgegaan" };
  }
}

export async function getUsersInProject(projectId: string | number) {
  const usersResponse = await axios.get<User[]>(`/projects/users/${projectId}`);
  return usersResponse.data;
}
