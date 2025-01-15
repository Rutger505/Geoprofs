import LeavePerCategoryChart from "@/components/Dashboard/LeavePerCategoryChart";
import VacationDaysCharts from "@/components/Dashboard/VacationDaysCharts";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default function LeaveHoursCharts({ leaveRequests }: Readonly<Props>) {
  return (
    <section className={"flex gap-14"}>
      <VacationDaysCharts leaveRequests={leaveRequests} />
      <LeavePerCategoryChart leaveRequests={leaveRequests} />
    </section>
  );
}
