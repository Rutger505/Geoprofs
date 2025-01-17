import { rerender } from "@/actions/rerender";
import axios from "@/lib/axios";
import { updateUserInformation } from "@/lib/models/user";
import { User as UserType } from "@/types/user";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ManageUser({ params }: Readonly<PageParams>) {
  const { id } = await params;
  const userResponse = await axios.get<UserType>(`/users/${id}`);
  const user = userResponse.data;

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mb-8 text-center text-4xl font-semibold">
        {user.firstName} {user.lastName} bijwerken
      </h1>

      <div className="w-full max-w-xl space-y-8">
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

        {/* Section Selection */}
        {/*<section className="space-y-6">*/}
        {/*  <h2 className="text-xl font-medium">Sectie</h2>*/}
        {/*  <form className="space-y-4">*/}
        {/*    <div className="space-y-2">*/}
        {/*      <label htmlFor="section" className="block text-sm">*/}
        {/*        Sectie*/}
        {/*      </label>*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        id="section"*/}
        {/*        className="w-full rounded-md border border-gray-300 p-2"*/}
        {/*      />*/}
        {/*    </div>*/}

        {/*    <button*/}
        {/*      type="submit"*/}
        {/*      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"*/}
        {/*    >*/}
        {/*      Updaten*/}
        {/*    </button>*/}
        {/*  </form>*/}
        {/*</section>*/}
      </div>
    </main>
  );
}
