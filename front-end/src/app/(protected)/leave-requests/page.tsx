import { AllLeaveRequests } from "@/components/LeaveRequest/AllLeaveRequests";
import Link from "next/link";

export default async function LeaveRequests() {
  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Verlofverzoeken</h1>

      <Link
        href={"/leave-requests/new"}
        className={"rounded bg-blue-500 px-3 py-2 text-white hover:opacity-90"}
      >
        Nieuw verlofverzoek
      </Link>

      <AllLeaveRequests />
    </main>
  );
}
