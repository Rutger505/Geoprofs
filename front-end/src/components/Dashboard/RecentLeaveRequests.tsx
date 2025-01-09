import LeaveRequest from "@/components/LeaveRequest/LeaveRequest";
import { auth } from "@/lib/auth";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export async function RecentLeaveRequests({ leaveRequests }: Readonly<Props>) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

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
        {leaveRequests.length ? (
          leaveRequests
            .slice(0, 4)
            .map((request) => (
              <LeaveRequest key={request.id} request={request} />
            ))
        ) : (
          <div className={"text-gray-400"}>Geen recente verlofverzoeken</div>
        )}
      </div>
    </div>
  );
}
