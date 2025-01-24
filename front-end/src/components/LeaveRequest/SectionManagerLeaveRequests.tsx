import LeaveRequest from "@/components/LeaveRequest/LeaveRequest";
import { auth } from "@/lib/auth";
import { getSectionManagerLeaveRequests } from "@/lib/models/leaveRequest";
import { redirect } from "next/navigation";

export async function SectionManagerLeaveRequests() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const usersWithLeaveRequests = await getSectionManagerLeaveRequests(
    session.user.id,
  );

  return (
    <section className={"grid w-96 gap-3"}>
      {usersWithLeaveRequests.length ? (
        usersWithLeaveRequests.map((user) =>
          user.leave.map((request) => (
            <LeaveRequest
              key={request.id}
              request={request}
              expanded={true}
              showActions={true}
            />
          )),
        )
      ) : (
        <div className={"text-gray-400"}>Geen verlofverzoeken</div>
      )}
    </section>
  );
}
