import { LoginForm } from "@/components/Auth/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
