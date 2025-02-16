import { ProjectManagerCalendar } from "@/components/ProjectManager/Calendar/ProjectManagerCalendar";

export default async function LeaveRequests() {
  return (
    <main className="flex flex-col items-center gap-14 px-3 py-20 md:px-10">
      <h1 className={"text-3xl font-semibold"}>Project kalender</h1>

      <ProjectManagerCalendar />
    </main>
  );
}
