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
  const data = [
    { name: "Ziekte (2 dagen, betaald)", value: 2, color: colors[0] },
    {
      name: "Ouderverlof (3 dagen, onbetaald)",
      value: 3,
      color: colors[1],
    },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return <Chart items={data} totalLabel={"Verlofuren"} />;
}
