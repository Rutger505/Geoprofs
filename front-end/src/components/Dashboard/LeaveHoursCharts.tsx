import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ziekte (2 dagen, betaald)", value: 2, color: "#8884d8" },
  { name: "Ouderverlof (3 dagen, onbetaald)", value: 3, color: "#82ca9d" },
];

export default function LeaveHoursCharts() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-medium">Verlofuren</h2>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-sm">Verlofdagen totaal</div>
        </div>
      </div>
    </div>
  );
}
