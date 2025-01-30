"use client";

import { createContract } from "@/lib/models/contract";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

export default function Contracts() {
  const [contractName, setContractName] = useState("");
  const [contractLeaveHours, setContractLeaveHours] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await createContract(contractName, contractLeaveHours);
    },
    onSuccess: () => {
      setContractName("");
      setContractLeaveHours(0);
    },
    onError: (error) => {
      alert(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutate();
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex max-w-sm flex-col gap-5">
          <Field>
            <Label className="block">Contract naam</Label>
            <Input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contractName}
              onChange={(event) => setContractName(event.target.value)}
              required
            />
          </Field>

          <Field>
            <Label className="block">Contract total leave hours</Label>
            <Input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setContractLeaveHours(event.target.value)}
              value={contractLeaveHours}
              required
            />
          </Field>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isPending}
              className={clsx(
                "w-full rounded-md px-4 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                isPending
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
              )}
            >
              {isPending ? "Bezig met registreren..." : "Registreer"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
