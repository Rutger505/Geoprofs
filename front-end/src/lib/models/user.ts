import axios from "@/lib/axios";
import { Project } from "@/lib/models/project";
import { Section } from "@/lib/models/section";
import { User } from "@/types/user";

export interface UpdateUserInformationInput
  extends Pick<User, "firstName" | "lastName" | "email" | "id"> {}

export async function updateUserInformation({
  id,
  ...data
}: UpdateUserInformationInput) {
  console.log(data);

  await axios.put(`/users/${id}`, data);
}

export async function updateUserSection({
  userId,
  sectionId,
}: {
  userId: string;
  sectionId: string;
}) {
  await axios.post(`/sections/users`, {
    userId: +userId,
    sectionId: +sectionId,
  });
}

export async function getUserSection(userId: string) {
  const res = await axios.get<Section>(`/users/${userId}/section`);
  return res.data;
}

export async function getUserProject(userId: string) {
  const res = await axios.get<Project>(`/users/${userId}/project`);
  return res.data;
}

export async function updateUserProject({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  await axios.post(`/projects/users`, {
    userId: +userId,
    projectId: +projectId,
  });
}
