"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ziekte (2 dagen, betaald)", value: 2, color: "#8884d8" },
  { name: "Ouderverlof (3 dagen, onbetaald)", value: 3, color: "#82ca9d" },
];

// Tailwind wont generate classes with dynamic colors.
const tailWindPossibleClasses = ["bg-[#8884d8]", "bg-[#82ca9d]"];

export default function LeaveHoursCharts() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="">
      <h2 className="text-2xl font-medium">Vakantiedagen</h2>

      <div className={"grid h-64 grid-cols-2"}>
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute left-1/2 top-1/2 max-w-[100px] -translate-x-1/2 -translate-y-1/2 transform text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm">Vakantiedagen totaal</div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {data.map((item) => (
            <div key={item.name} className={`flex items-center gap-4`}>
              <div className={`h-3 w-3 rounded-full bg-[${item.color}]`}></div>
              <div className="text-sm">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
