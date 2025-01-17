import axios from "@/lib/axios";
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
