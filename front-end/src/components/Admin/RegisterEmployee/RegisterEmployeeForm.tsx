"use client";

import { Button, Field, Input, Label, Select } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";

interface Role {
  name: string;
  id: number;
}

interface Props {
  roles: Role[];
  defaultRole: Role;
}

export function RegisterEmployeeForm({ roles, defaultRole }: Readonly<Props>) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      console.error("Not implemented");
      throw new Error("Not implemented");
    },
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [role, setRole] = useState<Role>(defaultRole);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutate();
      }}
      className="space-y-6"
    >
      <div className="flex max-w-sm gap-5">
        <Field>
          <Label className={"block"}>Voornaam</Label>
          <Input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </Field>

        <Field>
          <Label className={"block"}>Achternaam</Label>
          <Input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </Field>
      </div>

      <Field>
        <Label className={"block"}>Email</Label>
        <Input
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>

      <Field>
        <Label className={"block"}>Datum in dienst</Label>
        <Input
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setDateHired(event.target.value)}
          type="date"
          required
        />
      </Field>

      <Field>
        <Label className={"block"}>Rol</Label>
        <Select
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) =>
            setRole(roles.find((role) => role.id === +event.target.value)!)
          }
          aria-label="Rol"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </Select>
      </Field>

      <div className="space-y-4">
        <Button
          type="submit"
          className={clsx(
            "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isPending && "cursor-not-allowed opacity-50",
          )}
        >
          {isPending ? "Inloggen..." : "Inloggen"}
        </Button>
      </div>

      {error && !isRedirectError(error) ? (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      ) : (
        <p className="invisible mt-1 text-sm text-red-600" aria-hidden="true">
          spacer
        </p>
      )}
    </form>
  );
}
