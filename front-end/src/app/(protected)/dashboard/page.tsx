import LeaveHoursCharts from "@/components/Dashboard/LeaveHoursCharts";
import { RecentLeaveRequests } from "@/components/Dashboard/RecentLeaveRequests";
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
      <h1 className={"text-3xl font-semibold"}>
        Welcome {session.user.firstName}!
      </h1>

      <div className={"grid grid-rows-2 gap-10"}>
        <RecentLeaveRequests leaveRequests={leaveRequests} />
        <LeaveHoursCharts leaveRequests={leaveRequests} />
      </div>
    </main>
  );
}
