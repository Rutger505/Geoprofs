import axios from "@/lib/axios";
import { LeaveRequest } from "@/lib/models/leaveRequest";
import { User } from "@/types/user";

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

export async function getUsersInSection(sectionId: string | number) {
  const usersResponse = await axios.get<User[]>(`/sections/users/${sectionId}`);
  return usersResponse.data;
}

type SectionWithUsersWithLeaves = Section & {
  user: User & { leave: LeaveRequest[] }[];
};

export async function getSectionsLeaves() {
  const projectsResponse =
    await axios.get<SectionWithUsersWithLeaves[]>("/ceo/section");
  return projectsResponse.data;
}
