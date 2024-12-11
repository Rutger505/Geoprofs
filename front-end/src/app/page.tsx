import { auth } from "@/auth";
import { LoginForm } from "@/components/Auth/LoginForm";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <main className="flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
