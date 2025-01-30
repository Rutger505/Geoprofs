"use client";

import { Chart } from "@/components/Dashboard/Chart";
import { colors } from "@/lib/colors";
import { LeaveRequest as LeaveRequestType } from "@/lib/models/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
  label: string;
}

export default function GroupChart({ leaveRequests, label }: Readonly<Props>) {
  const categories = leaveRequests.reduce(
    (acc, leaveRequest) => {
      const categoryName = leaveRequest.category.name;
      acc[categoryName] = (acc[categoryName] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(categories).map(([name, value], index) => ({
    name,
    value,
    color: colors[index],
  }));

  return <Chart items={data} totalLabel={label} />;
}
