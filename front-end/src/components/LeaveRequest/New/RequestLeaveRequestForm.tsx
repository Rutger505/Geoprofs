"use client";

import { createLeaveRequest } from "@/lib/models/leaveRequest";
import { Button, Field, Input, Label, Select } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  userId: string;
  categories: Category[];
}


export function LeaveRequestForm({ userId, categories }: Readonly<Props>) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [reason, setReason] = useState("");
  const [categoryId, setCategoryId] = useState<number>();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async () => {
      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Voer een geldige datum in");
      }

      if (end < start) {
        throw new Error("Einddatum moet na startdatum zijn");
      }

      if (!categoryId) {
        throw new Error("Selecteer een categorie");
      }

      if (reason.length > 255) {
        throw new Error("Reden mag maximaal 255 karakters bevatten");
      }

      await createLeaveRequest(userId, start, end, reason, categoryId);
    },
  });

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
          <Label className="block">Startdatum</Label>
          <Input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </Field>

        <Field>
          <Label className="block">Einddatum</Label>
          <Input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />
        </Field>
      </div>

      <Field>
        <Label className="block">Categorie</Label>
        <Select
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setCategoryId(+event.target.value)}
          defaultValue={""}
          required
        >
          <option disabled value="">
            Selecteer een categorie
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label className="block">Reden</Label>
        <Input
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          as="textarea"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          maxLength={255}
          required
        />
        <span className="mt-1 text-sm text-gray-500">
          {255 - reason.length} karakters over
        </span>
      </Field>

      <Button
        type="submit"
        className={clsx(
          "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isPending && "cursor-not-allowed opacity-50",
        )}
      >
        Verlof aanvragen{isPending && "..."}
      </Button>

      {isSuccess && (
        <p className="mt-1 text-sm text-green-600">Verlofaanvraag ingediend!</p>
      )}

      {error && !isRedirectError(error) && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </form>
  );
}
