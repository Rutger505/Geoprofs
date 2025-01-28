import { SectionManagerCalendar } from "@/components/SectionManager/Calendar/SectionManagerCalendar";

export default async function LeaveRequests() {
  return (
    <main className="flex flex-col items-center gap-14 px-3 py-20 md:px-10">
      <h1 className={"text-3xl font-semibold"}>Verlofverzoeken</h1>

      <SectionManagerCalendar />
    </main>
  );
}
