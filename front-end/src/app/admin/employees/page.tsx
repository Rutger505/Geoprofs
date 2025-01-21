import { User } from "@/components/Admin/Employees/User";
import axios from "@/lib/axios";
import { User as UserType } from "@/types/user";
import Link from "next/link";

export default async function ManageUsers() {
  const usersResponse = await axios.get<UserType[]>("/users");
  const users = usersResponse.data;

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <h1 className={"text-center text-3xl font-semibold"}>Medewerkers</h1>
      <Link
        href={"/admin/employees/register"}
        className={"rounded bg-blue-500 px-3 py-2 text-white hover:opacity-90"}
      >
        Registreer nieuwe medewerker
      </Link>

      <div className={"space-y-5"}>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </main>
  );
}
