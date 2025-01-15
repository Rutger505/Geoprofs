"use client";

import { updateUserPreferences } from "@/actions/updateUserPreferences";
import { getRoleNameTranslation } from "@/lib/role";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function SwitchMode() {
  const [useAsEmployee, setUseAsEmployee] = useState(true);
  const { data } = useSession();
  const { mutate } = useMutation({
    mutationFn: async () => {
      setUseAsEmployee((prev) => !prev);

      console.log("useAsEmployee", useAsEmployee);
      const response = await updateUserPreferences({
        useAsEmployee: !useAsEmployee,
      });
      console.log("response", response);
      if (response?.error) {
        throw new Error(response.error);
      }

      console.log("router", router);

      location.reload();
    },
  });

  if (!data?.user.roleName) {
    return null;
  }

  const role = data.user.roleName;
  if (role === "Employee") {
    return null;
  }

  const roles = [
    getRoleNameTranslation("Employee"),
    getRoleNameTranslation(data.user.roleName),
  ];

  return (
    <button
      onClick={() => mutate()}
      className={
        "flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-100"
      }
    >
      <div>
        {roles.map((role, index) => {
          const isActive = useAsEmployee ? index === 0 : index === 1;

          return (
            <span
              key={role}
              className={clsx(
                !isActive ? "!text-xs !leading-3 opacity-50" : "",
                "block text-center text-base leading-4 transition-all duration-100",
              )}
            >
              {role}
            </span>
          );
        })}

        {roles.map((role, index) => (
          <span
            key={index}
            className={"invisible block h-0"}
            aria-hidden={true}
          >
            {role}
          </span>
        ))}
      </div>
    </button>
  );
}
