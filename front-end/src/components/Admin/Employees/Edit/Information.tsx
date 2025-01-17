import { rerender } from "@/actions/rerender";
import { updateUserInformation } from "@/lib/models/user";
import { User } from "@/types/user";

export function Information({ user }: Readonly<{ user: User }>) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-medium">Informatie</h2>
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
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm">
              Voornaam
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={user.firstName}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm">
              Achternaam
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={user.lastName}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
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
