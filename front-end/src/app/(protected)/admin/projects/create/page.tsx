"use client";

import { createProject } from "@/lib/models/project";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

export default function Projects() {
  const [projectName, setProjectName] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      return await createProject(projectName);
    },
    onSuccess: () => {
      setProjectName("");
    },
    onError: (error) => {
      alert(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!projectName.trim()) {
      alert("Project name cannot be empty");
      return;
    }
    mutate();
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex max-w-sm flex-col gap-5">
          <Field>
            <Label className="block">Project naam</Label>
            <Input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setProjectName(event.target.value)}
              required
            />
          </Field>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "w-full rounded-md px-4 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                isLoading
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
              )}
            >
              {isLoading ? "Bezig met registreren..." : "Registreer"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
