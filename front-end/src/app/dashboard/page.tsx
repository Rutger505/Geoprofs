import LeaveHoursCharts from "@/components/Dashboard/LeaveHoursCharts";
import { RecentLeaveRequests } from "@/components/Dashboard/RecentLeaveRequests";
import { auth } from "@/lib/auth";
import axios from "@/lib/axios";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import { redirect } from "next/navigation";

interface LeaveRequestResponse {
  leaveRequests: LeaveRequestType[];
}
export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const leaveRequestsResposne = await axios.get<LeaveRequestType[]>(
    `/leave/leave-requests?userId=${session.user.id}`,
  );
  const leaveRequests = leaveRequestsResposne.data;

  return (
    <main className="flex flex-col items-center gap-20 pt-20">
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
