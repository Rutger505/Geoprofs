import { LeaveRequestForm } from "@/components/LeaveRequest/New/RequestLeaveRequestForm";

export default async function RequestLeaveRequest() {
  return (
    <main className="flex flex-col items-center gap-14 py-20">
      <h1 className={"text-3xl font-semibold"}>Verlofverzoek aanvragen</h1>

      <LeaveRequestForm />
    </main>
  );
}
