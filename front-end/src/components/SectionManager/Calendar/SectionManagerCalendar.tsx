import { auth } from "@/lib/auth";
import {
  acceptedLeaveRequest,
  getSectionManagerLeaveRequests,
  LeaveRequest,
} from "@/lib/models/leaveRequest";
import { getUsersInSection } from "@/lib/models/section";
import { getUserSection } from "@/lib/models/user";
import { redirect } from "next/navigation";

interface LeavesPerUser {
  [userId: string]: LeaveRequest[];
}

export async function SectionManagerCalendar() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userSection = await getUserSection(session.user.id);

  if (!userSection) {
    return <div>Je bent geen gecoppeld aan een sectie</div>;
  }

  const users = await getUsersInSection(userSection.id);

  const allLeaveRequests = await getSectionManagerLeaveRequests(
    session.user.id,
  );
  const acceptedLeaveRequests = allLeaveRequests.filter(acceptedLeaveRequest);

  const leavesPerUser: LeavesPerUser = {};
  acceptedLeaveRequests.forEach((leave) => {
    if (!leavesPerUser[leave.userId]) {
      leavesPerUser[leave.userId] = [];
    }
    leavesPerUser[leave.userId].push(leave);
  });

  return (
    <section className={"grid gap-5"}>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Naam</th>
            <th className="px-4 py-2">Verlof</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-center">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex flex-col gap-2">
                  {leavesPerUser[user.id]?.map((leave) => (
                    <div key={leave.id}>
                      {leave.startDate.toDateString()} -{" "}
                      {leave.endDate.toDateString()}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
