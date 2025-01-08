import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface item {
  name: string;
  value: number;
  color: string;
}

interface Props {
  items: item[];
  totalLabel: string;
}

export function Chart({ items, totalLabel }: Readonly<Props>) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={"w-fit space-y-5"}>
      <h2 className="text-2xl font-medium">{totalLabel}</h2>

      <div className={"inline-flex"}>
        <div className="relative h-40 w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={items}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {items.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute left-1/2 top-1/2 max-w-[100px] -translate-x-1/2 -translate-y-1/2 transform text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm">{totalLabel}</div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {items.map((item) => (
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
