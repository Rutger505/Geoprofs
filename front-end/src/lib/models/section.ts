"use server";

import axios from "@/lib/axios";
import { LeaveRequest } from "@/lib/models/leaveRequest";
import { mapLeaveRequestDates } from "@/lib/util";
import { User } from "@/types/user";
import { AxiosError } from "axios";

export interface Section {
  id: number;
  name: string;
}

export async function getSections() {
  const sectionsResponse = await axios.get<Section[]>("/sections");
  return sectionsResponse.data;
}

export async function getUsersInSection(sectionId: string | number) {
  const usersResponse = await axios.get<User[]>(`/sections/users/${sectionId}`);
  return usersResponse.data;
}

export async function createSection(name: string) {
  try {
    await axios.post("/sections", {
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

type SectionWithUsersWithLeaves = Section & {
  user: (User & { leave: LeaveRequest[] })[];
};

export async function getSectionsLeaves(): Promise<
  SectionWithUsersWithLeaves[]
> {
  const projectsResponse =
    await axios.get<SectionWithUsersWithLeaves[]>("/ceo/section");

  const transformedData = projectsResponse.data.map((project) => ({
    ...project,
    user: project.user.map((user) => ({
      ...user,
      leave: user.leave.map((leave) => mapLeaveRequestDates(leave)),
    })),
  }));

  return transformedData;
}
