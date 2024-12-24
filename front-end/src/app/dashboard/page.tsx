import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center">
      <h1>Welcome, {session.user.firstName}</h1>
    </main>
  );
}
