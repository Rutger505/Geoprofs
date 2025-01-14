"use client";

import { Chart } from "@/components/Dashboard/Chart";
import { colors } from "@/lib/colors";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default function LeavePerCategoryChart({
  leaveRequests,
}: Readonly<Props>) {
  const categories = leaveRequests.reduce(
    (acc, leaveRequest) => {
      if (acc[leaveRequest.category.name]) {
        acc[leaveRequest.category.name] += leaveRequest.durationHours / 8;
      } else {
        acc[leaveRequest.category.name] = leaveRequest.durationHours / 8;
      }

      return acc;
    },
    {} as Record<string, number>,
  );
  const data = Object.entries(categories).map(([name, value], index) => ({
    name,
    value,
    color: colors[index],
  }));

  return <Chart items={data} totalLabel={"Verlofuren"} />;
}
