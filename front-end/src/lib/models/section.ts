import axios from "@/lib/axios";

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
