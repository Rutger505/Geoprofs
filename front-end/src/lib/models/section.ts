import axios from "@/lib/axios";
import { User } from "@/types/user";

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
