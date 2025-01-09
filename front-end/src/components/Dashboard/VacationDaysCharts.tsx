import { Chart } from "@/components/Dashboard/Chart";
import axios from "@/lib/axios";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default async function VacationDaysCharts({
  leaveRequests,
}: Readonly<Props>) {
  const paidLeaveRequests = leaveRequests.filter(
    (leaveRequest) => leaveRequest.category.isPaidLeave,
  );

  const paidLeaveLeaveHours = paidLeaveRequests.reduce(
    (acc, leaveRequest) => acc + leaveRequest.durationHours,
    0,
  );

  console.log(paidLeaveRequests);

  const totalHoursResposne = await axios.get("/leave/leave-hours");
  const totalHours = totalHoursResposne.data.hours;

  console.log(totalHours);

  const data = [
    { name: "Opgenomen (2 dagen)", value: 2, color: "#8884d8" },
    { name: "Beschikbaar (3 dagen)", value: 3, color: "#82ca9d" },
  ];

  // Tailwind won't generate classes with dynamic colors.
  const tailWindPossibleClasses = ["bg-[#8884d8]", "bg-[#82ca9d]"];

  return <Chart items={data} totalLabel={"Vakantiedagen"} />;
}
