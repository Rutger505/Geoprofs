import { auth } from "@/lib/auth";
import { getRoleNameTranslation } from "@/lib/role";
import clsx from "clsx";

export async function SwitchMode() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const role = session.user.roleName;

  if (role === "Employee") {
    return null;
  }

  const useAsEmployee = true;

  const roles = [
    getRoleNameTranslation("Employee"),
    getRoleNameTranslation(session.user.roleName),
  ];

  return (
    <button className={"flex items-center gap-2"}>
      <div className={"-space-y-1"}>
        {roles.map((role, index) => {
          const isActive = useAsEmployee ? index === 0 : index === 1;

          return (
            <span
              key={role}
              className={clsx(
                !isActive ? "text-xs opacity-50" : "",
                "block text-center",
              )}
            >
              {role}
            </span>
          );
        })}
      </div>

      <div className="relative flex items-center">
        <div className="block h-4 w-7 rounded-full border-[1px] border-black"></div>
        <div
          className={clsx(
            !useAsEmployee && "translate-x-full",
            "absolute left-[2px] top-[2px] h-3 w-3 rounded-full bg-black transition-all duration-300",
          )}
        ></div>
      </div>
    </button>
  );
}
