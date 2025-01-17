"use client";
import { createSection } from "@/app/admin/sections/create/create-section";
import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

export default function Sections() {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!sectionName.trim()) {
      alert("Section name cannot be empty");
      return;
    }

    const response = await createSection(sectionName);
    if (response?.error) {
      alert(response.error);
    } else {
      setSectionName(""); // Clear input field
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate();
        }}
        className="space-y-6"
      >
        <div className="flex max-w-sm flex-col gap-5">
          <Field>
            <Label className={"block"}>Sectie naam</Label>
            <Input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setSectionName(event.target.value)}
              required
            />
          </Field>

          <div className="space-y-4">
            <Button
              type="submit"
              onSubmit={handleSubmit}
              className={clsx(
                "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              )}
            >
              Registreer
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
