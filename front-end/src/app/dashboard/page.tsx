import LeaveRequest from "@/components/LeaveRequest";
import { auth } from "@/lib/auth";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const leaveRequests: LeaveRequestType[] = [
    {
      id: 1,
      status: "accepted",
      reason: "Vacation",
      startDate: new Date("2024-11-01 09:00:00"),
      endDate: new Date("2024-11-05 17:00:00"),
      category: {
        id: 1,
        name: "Vacation",
      },
      updatedAt: new Date("2024-11-15"),
    },
    {
      id: 2,
      status: "denied",
      reason: "Sick",
      startDate: new Date("2021-10-10 09:00:00"),
      endDate: new Date("2021-10-10 17:00:00"),
      category: {
        id: 2,
        name: "Sick",
      },
      updatedAt: new Date("2021-10-15"),
    },
    {
      id: 3,
      status: "pending",
      reason: "Personal",
      startDate: new Date("2021-10-01 09:00:00"),
      endDate: new Date("2021-10-01 11:00:00"),
      category: {
        id: 3,
        name: "Personal",
      },
      updatedAt: null,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center gap-20">
      <h1 className={"text-3xl font-semibold"}>
        Welcome {session.user.firstName} {session.user.lastName}!
      </h1>

      <div className={"space-y-5"}>
        {leaveRequests.map((request) => (
          <LeaveRequest key={request.id} request={request} />
        ))}
      </div>
    </main>
  );
}
