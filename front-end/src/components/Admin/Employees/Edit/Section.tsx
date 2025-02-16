import { getSections } from "@/lib/models/section";
import { getUserSection, updateUserSection } from "@/lib/models/user";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function Section({ user }: Readonly<{ user: User }>) {
  const sections = await getSections();
  const userSection = await getUserSection(user.id);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium">Sectie</h2>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";

          const sectionId = formData.get("section") as string;

          await updateUserSection({
            userId: user.id,
            sectionId,
          });

          redirect(`/admin/employees/${user.id}`);
        }}
      >
        <div className="space-y-2">
          <label htmlFor="section" className="block text-sm">
            Sectie
          </label>
          <select
            id="section"
            name="section"
            defaultValue={userSection ? userSection.id : ""}
            className="w-full rounded-md border border-gray-300 bg-white p-2"
          >
            <option value="" disabled>
              Selecteer een sectie
            </option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
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
