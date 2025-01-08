import LeaveRequest from "@/components/LeaveRequest/LeaveRequest";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import Link from "next/link";

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
    {
      id: 4,
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
    {
      id: 5,
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
    <div className={"space-y-5"}>
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-2xl font-semibold"}>Recente verlofverzoeken</h2>
        {leaveRequests.length > 4 && (
          <Link
            href={"/leave-requests"}
            className={"flex items-center gap-1 text-gray-400"}
          >
            Meer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z" />
            </svg>
          </Link>
        )}
      </div>
      <div className={"grid grid-cols-2 grid-rows-[auto_auto] gap-3"}>
        {leaveRequests.slice(0, 4).map((request) => (
          <LeaveRequest key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
