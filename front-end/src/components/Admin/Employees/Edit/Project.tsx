import { getProjects } from "@/lib/models/project";
import { getUserProject, updateUserProject } from "@/lib/models/user";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function Project({ user }: Readonly<{ user: User }>) {
  const projects = await getProjects();
  const userProject = await getUserProject(user.id);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium">Project</h2>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";

          const projectId = formData.get("project") as string;

          await updateUserProject({
            userId: user.id,
            projectId,
          });

          redirect(`/admin/employees/${user.id}`);
        }}
      >
        <div className="space-y-2">
          <label htmlFor="project" className="block text-sm">
            Project
          </label>
          <select
            id="project"
            name="project"
            defaultValue={"id" in userProject ? userProject.id : ""}
            className="w-full rounded-md border border-gray-300 bg-white p-2"
          >
            <option value="" disabled>
              Selecteer een sectie
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Opslaan
        </button>
      </form>
    </section>
  );
}
