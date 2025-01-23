import { SectionManagerLeaveRequests } from "@/components/LeaveRequest/SectionManagerLeaveRequests";

export default async function LeaveRequests() {
  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Verlofverzoeken</h1>

      <SectionManagerLeaveRequests />
    </main>
  );
}
