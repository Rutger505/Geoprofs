import LeavePerCategoryChart from "@/components/Dashboard/LeavePerCategoryChart";
import VacationDaysCharts from "@/components/Dashboard/VacationDaysCharts";

export default function LeaveHoursCharts() {
  return (
    <div className={"flex gap-14"}>
      <VacationDaysCharts />
      <LeavePerCategoryChart />
    </div>
  );
}
