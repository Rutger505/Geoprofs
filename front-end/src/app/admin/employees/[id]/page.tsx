import { Information } from "@/components/Admin/Employees/Edit/Information";
import { Section } from "@/components/Admin/Employees/Edit/Section";
import axios from "@/lib/axios";
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
        <Information user={user} />

        <Section user={user} />
      </div>
    </main>
  );
}
