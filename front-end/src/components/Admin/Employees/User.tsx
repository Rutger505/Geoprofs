import { User as UserType } from "@/types/user";
import Link from "next/link";

interface Props {
  user: UserType;
}

export function User({ user }: Readonly<Props>) {
  return (
    <div className={"flex gap-2"}>
      <span>
        {user.firstName} {user.lastName}
      </span>
      <Link href={`/admin/employees/${user.id}`}>Bewerk</Link>
    </div>
  );
}
