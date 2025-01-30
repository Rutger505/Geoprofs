import { getSections, Section } from "@/lib/models/section";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

export default async function Sections() {
  let sections: Section[] = await getSections();

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <section>
        <Link
          key="create section"
          href="sections/create"
          className={"rounded-sm p-3 hover:opacity-90"}
        >
          <Button
            type="submit"
            className={clsx(
              "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            Create section
          </Button>
        </Link>
      </section>

      <section className="space-y-5">
        {sections.map((section: Section) => (
          <p className="flex items-center gap-2" key={section.id}>
            {section.name}{" "}
          </p>
        ))}
      </section>
    </main>
  );
}
