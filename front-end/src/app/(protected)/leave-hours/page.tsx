import LeaveHoursCharts from "@/components/Dashboard/LeaveHoursCharts";
import { auth } from "@/lib/auth";
import { getUsersLeaveRequests } from "@/lib/models/leaveRequest";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const leaveRequests = await getUsersLeaveRequests(session.user.id);

  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Verlof dagen</h1>

      <LeaveHoursCharts leaveRequests={leaveRequests} />
    </main>
  );
}
