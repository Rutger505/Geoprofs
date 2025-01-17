import { rerender } from "@/actions/rerender";
import axios from "@/lib/axios";
import { Section as SectionType } from "@/lib/models/section";
import { updateUserInformation } from "@/lib/models/user";
import { User } from "@/types/user";

export async function Section({ user }: Readonly<{ user: User }>) {
  const sectionsResponse = await axios.get<SectionType[]>("/sections");
  const sections = sectionsResponse.data;

  return (
    <section className="space-y-6">
      {JSON.stringify(sections)}
      <h2 className="text-xl font-medium">Sectie</h2>
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";

          const email = formData.get("email") as string;
          const firstName = formData.get("firstName") as string;
          const lastName = formData.get("lastName") as string;

          await updateUserInformation({
            id: user.id,
            email,
            firstName,
            lastName,
          });
          await rerender();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="section" className="block text-sm">
            Sectie
          </label>
          <select
            id="section"
            name="section"
            defaultValue={1} // TODO set properly
            className="w-full rounded-md border border-gray-300 p-2"
          >
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
          Updaten
        </button>
      </form>
    </section>
  );
}
