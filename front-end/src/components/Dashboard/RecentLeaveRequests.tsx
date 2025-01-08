import LeaveRequest from "@/components/LeaveRequest/LeaveRequest";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";

export function RecentLeaveRequests() {
  // 0-4 items
  const leaveRequests: LeaveRequestType[] = [
    {
      id: 1,
      status: "accepted",
      reason:
        "Ik hou van lange vakanties om te kijken hoe de text wrapt in de component.",
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
      reason: "Dit is een domme reden",
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
    <div className={"w-fit space-y-5"}>
      <h2 className={"text-2xl font-semibold"}>Recente verlofverzoeken</h2>
      <div className={"grid grid-cols-2 grid-rows-2 gap-3"}>
        {leaveRequests.map((request) => (
          <LeaveRequest key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
