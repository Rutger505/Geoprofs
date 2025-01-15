import LeavePerCategoryChart from "@/components/Dashboard/LeavePerCategoryChart";
import VacationDaysCharts from "@/components/Dashboard/VacationDaysCharts";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default function LeaveHoursCharts({ leaveRequests }: Readonly<Props>) {
  return (
    <section
      className={
        "flex flex-wrap items-center justify-center gap-14 min-[900px]:flex-nowrap"
      }
    >
      <VacationDaysCharts leaveRequests={leaveRequests} />
      <LeavePerCategoryChart leaveRequests={leaveRequests} />
    </section>
  );
}
