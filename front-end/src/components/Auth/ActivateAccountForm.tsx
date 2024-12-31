"use client";

import { activateAccount } from "@/lib/authActions";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect";
import { FormEvent, useState } from "react";

interface Props {
  token: string;
  email: string;
}

export function ActivateAccountForm({ token, email }: Readonly<Props>) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => activateAccount(password, repeatPassword, token, email),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={"w-full space-y-4 px-5 sm:mx-auto sm:w-96"}
    >
      <Field>
        <Label className="block">Wachtwoord</Label>
        <Input
          type="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>

      <Field>
        <Label className="block">Herhaal wachtwoord</Label>
        <Input
          type="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
      </Field>

      <div className="space-y-4">
        <Button
          type="submit"
          className={clsx(
            "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isPending && "cursor-not-allowed opacity-50",
          )}
        >
          Activeer Account{isPending && "..."}
        </Button>
      </div>

      {error && !isRedirectError(error) && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </form>
  );
}
