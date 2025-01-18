import { User as UserType } from "@/types/user";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface Props {
  user: UserType;
}

export function User({ user }: Readonly<Props>) {
  return (
    <div className={"flex items-center gap-2"}>
      <span>
        {user.firstName} {user.lastName}
      </span>
      <Link href={`/admin/employees/${user.id}`}>
        <span className={""}>
          <div
            className={
              "flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100"
            }
          >
            <Pencil className={"h-4"} />
          </div>
        </span>
      </Link>
    </div>
  );
}
