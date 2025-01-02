"use client";

import { login } from "@/lib/authActions";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const result = await login(email, password);

      if (result?.error) {
        throw new Error(result.error);
      }
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutate();
  }

  return (
    <div className="w-full max-w-md space-y-10 p-8">
      <h1 className="text-center text-4xl font-bold text-gray-900">Inloggen</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Field>
          <Label className={"block"}>Email</Label>
          <Input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />
        </Field>

        <Field>
          <Label className="block">Wachtwoord</Label>
          <Input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setPassword(event.target.value)}
            required
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
    </div>
  );
}
