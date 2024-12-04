import { logout } from "@/lib/auth";

export default async function Page() {
  await logout();
  return <main className="flex items-center justify-center"> logout</main>;
}
