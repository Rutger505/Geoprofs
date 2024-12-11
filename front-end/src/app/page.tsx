import { LoginForm } from "@/components/Auth/LoginForm";

export default async function Home() {
  return (
    <main className="flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
