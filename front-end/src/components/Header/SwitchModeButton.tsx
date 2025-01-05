"use client";

import { updateUserPreferences } from "@/actions/updateUserPreferences";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  defaultUseAsEmployee: boolean;
  roles: string[];
}

export function SwitchModeButton({
  defaultUseAsEmployee,
  roles,
}: Readonly<Props>) {
  const [useAsEmployee, setUseAsEmployee] = useState(defaultUseAsEmployee);
  const { mutate } = useMutation({
    mutationFn: async () => {
      setUseAsEmployee((prev) => !prev);

      const response = await updateUserPreferences({
        useAsEmployee: !useAsEmployee,
      });
      if (response?.error) {
        throw new Error(response.error);
      }
    },
  });

  return (
    <button onClick={() => mutate()} className={"flex items-center gap-2"}>
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

      <div className="relative flex items-center">
        <div className="block h-4 w-7 rounded-full border-[1px] border-black"></div>
        <div
          className={clsx(
            !useAsEmployee && "translate-x-full",
            "absolute left-[2px] top-[2px] h-3 w-3 rounded-full bg-black transition-all duration-100",
          )}
        ></div>
      </div>
    </button>
  );
}
