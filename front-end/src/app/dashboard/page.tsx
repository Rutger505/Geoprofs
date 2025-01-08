import LeaveHoursCharts from "@/components/Dashboard/LeaveHoursCharts";
import { RecentLeaveRequests } from "@/components/Dashboard/RecentLeaveRequests";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center gap-20">
      <h1 className={"text-3xl font-semibold"}>
        Welcome {session.user.firstName}!
      </h1>

      <RecentLeaveRequests />
      <LeaveHoursCharts />
    </main>
  );
}
