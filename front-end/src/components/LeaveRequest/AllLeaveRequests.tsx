import LeaveRequest from "@/components/LeaveRequest/LeaveRequest";
import { auth } from "@/lib/auth";
import { getUsersLeaveRequests } from "@/lib/models/leaveRequest";
import { redirect } from "next/navigation";

export async function AllLeaveRequests() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const leaveRequests = await getUsersLeaveRequests(session.user.id);

  return (
    <section className={"grid w-96 gap-3"}>
      {leaveRequests.length ? (
        leaveRequests.map((request) => (
          <LeaveRequest key={request.id} request={request} />
        ))
      ) : (
        <div className={"text-gray-400"}>Geen verlofverzoeken</div>
      )}
    </section>
  );
}
