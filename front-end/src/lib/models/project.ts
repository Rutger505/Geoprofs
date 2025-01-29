import axios from "@/lib/axios";
import { User } from "@/types/user";

export interface Project {
  id: number;
  name: string;
}

export async function getProjects() {
  const projectsResponse = await axios.get<Project[]>("/projects");
  return projectsResponse.data;
}

export async function getUsersInProject(projectId: string | number) {
  const usersResponse = await axios.get<User[]>(`/projects/users/${projectId}`);
  return usersResponse.data;
}
