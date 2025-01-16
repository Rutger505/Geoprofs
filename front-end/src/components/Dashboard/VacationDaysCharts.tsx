import { Chart } from "@/components/Dashboard/Chart";
import { auth } from "@/lib/auth";
import axios from "@/lib/axios";
import { colors } from "@/lib/colors";
import { convertHoursToDays } from "@/lib/durations";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";
import { redirect } from "next/navigation";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default async function VacationDaysCharts({
  leaveRequests,
}: Readonly<Props>) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const paidLeaveLeaveHours = leaveRequests
    .filter((leaveRequest) => leaveRequest.category.isPaidLeave)
    .reduce((total, leaveRequest) => total + leaveRequest.durationHours, 0);
  const paidLeaveLeaveDays = convertHoursToDays(paidLeaveLeaveHours);

  const totalHoursResposne = await axios.get(`/user/${session.user.id}/hours`);
  const totalHours = totalHoursResposne.data.hours;
  const totalDays = convertHoursToDays(totalHours);

  const data = [
    {
      name: `Opgenomen (${paidLeaveLeaveDays} dagen)`,
      value: paidLeaveLeaveDays,
      color: colors[0],
    },
    {
      name: `Beschikbaar (${totalDays} dagen)`,
      value: totalDays,
      color: colors[1],
    },
  ];

  return <Chart items={data} totalLabel={"Vakantiedagen"} />;
}
