"use client";

import { Chart } from "@/components/Dashboard/Chart";
import { LeaveRequest as LeaveRequestType } from "@/types/leaveRequest";

interface Props {
  leaveRequests: LeaveRequestType[];
}

export default function LeavePerCategoryChart({
  leaveRequests,
}: Readonly<Props>) {
  const data = [
    { name: "Ziekte (2 dagen, betaald)", value: 2, color: "#8884d8" },
    { name: "Ouderverlof (3 dagen, onbetaald)", value: 3, color: "#82ca9d" },
  ];
  // Tailwind won't generate classes with dynamic colors.
  const tailWindPossibleClasses = ["bg-[#8884d8]", "bg-[#82ca9d]"];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return <Chart items={data} totalLabel={"Verlofuren"} />;
}
