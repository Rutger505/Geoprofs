"use client";

import { login } from "@/lib/authActions";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setErrors("Invalid credentials");
    }
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
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Inloggen
          </Button>
        </div>
        {errors && <p className="mt-1 text-sm text-red-600">{errors}</p>}
      </form>
    </div>
  );
}
