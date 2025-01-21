import { LeaveRequestForm } from "@/components/LeaveRequest/New/RequestLeaveRequestForm";
import { auth } from "@/lib/auth";
import axios from "@/lib/axios";
import { redirect } from "next/navigation";

export default async function RequestLeaveRequest() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const categories = await axios.get("/leave/category/");

  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Verlofverzoek aanvragen</h1>

      <LeaveRequestForm userId={session.user.id} categories={categories.data} />
    </main>
  );
}
