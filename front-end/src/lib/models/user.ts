import axios from "@/lib/axios";
import { Section } from "@/lib/models/section";
import { User } from "@/types/user";
import { AxiosError } from "axios";

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
  try {
    const res = await axios.post(`/sections/users`, {
      userId: +userId,
      sectionId: +sectionId,
    });
    console.log("datta", res.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response.data);
    }
  }
}

export async function getUserSection(userId: string) {
  const res = await axios.get<Section>(`/users/${userId}/section`);
  return res.data;
}
