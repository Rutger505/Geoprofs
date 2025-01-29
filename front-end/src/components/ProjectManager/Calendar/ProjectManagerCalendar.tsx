import { auth } from "@/lib/auth";
import {
  acceptedLeaveRequest,
  getProjectManagerLeaveRequests,
  LeaveRequest,
} from "@/lib/models/leaveRequest";
import { getUsersInProject } from "@/lib/models/project";
import { getUserProject } from "@/lib/models/user";
import { redirect } from "next/navigation";

interface LeavesPerUser {
  [userId: string]: LeaveRequest[];
}

export async function ProjectManagerCalendar() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userProject = await getUserProject(session.user.id);

  if (!userProject) {
    return <div>U bent niet gekoppeld aan een project</div>;
  }

  const users = await getUsersInProject(userProject.id);

  const allLeaveRequests = await getProjectManagerLeaveRequests(
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
