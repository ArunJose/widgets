export function StatWidget({
  value,
  label,
  change,
  icon = "",
}: {
  value: number;
  label: string;
  change: number;
  icon: string;
}) {
  const changeColor = change >= 0 ? "text-green-500" : "text-red-500";
  return (
    <div className="min-h-[160px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl">{icon}</div>
        <div className={`${changeColor} text-sm font-medium`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </div>
    </div>
  );
}
