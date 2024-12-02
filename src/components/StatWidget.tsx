interface StatWidgetProps {
  value: string;
  label: string;
  change: number;
  icon: string;
}

export function StatWidget({ value, label, change, icon }: StatWidgetProps) {
  return <div className="text-2xl font-bold">{value}</div>;
}
