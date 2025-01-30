import { getProjects, Project } from "@/lib/models/project";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

export default async function Projects() {
  let projects: Project[] = await getProjects();

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <section>
        <Link
          key="create project"
          href="projects/create"
          className={"rounded-sm p-3 hover:opacity-90"}
        >
          <Button
            type="submit"
            className={clsx(
              "w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            Create project
          </Button>
        </Link>
      </section>

      <section className="space-y-5">
        {projects.map((project: Project) => (
          <p className="flex items-center gap-2" key={project.id}>
            {project.name}
          </p>
        ))}
      </section>
    </main>
  );
}
