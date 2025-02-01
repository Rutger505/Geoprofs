import axios from "@/lib/axios";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import { LeaveRequest } from "@/lib/models/leaveRequest";
import { mapLeaveRequestDates } from "@/lib/util";

export interface Project {
  id: number;
  name: string;
}

export async function getProjects() {
  const projectsResponse = await axios.get<Project[]>("/projects");
  return projectsResponse.data;
}

export type ProjectWithUsersWithLeaves = Project & {
  user: User & { leave: LeaveRequest[] }[];
};

export async function getProjectsLeaves() {
  const projectsResponse =
    await axios.get<ProjectWithUsersWithLeaves[]>("/ceo/section");

  const transformedData = projectsResponse.data.map((project) => ({
    ...project,
    user: project.user.map((user) => ({
      ...user,
      leave: user.leave.map((leave) => mapLeaveRequestDates(leave)),
    })),
  }));

  console.log(transformedData[0].user[0].leave[0]);

  return transformedData;
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
