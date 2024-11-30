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
    <div>
      <div className="text-2xl">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-500">{label}</div>
      <div className={`${changeColor} mt-2`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
      </div>
    </div>
  );
}
