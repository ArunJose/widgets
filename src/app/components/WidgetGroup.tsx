import { Widget } from "@/app/widgetData";
import { TextWidget } from "@/app/components/widgets/TextWidget";
import { StatWidget } from "@/app/components/widgets/StatWidget";

export function WidgetGroup({ widgetData }: { widgetData: Widget[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-4">
      {widgetData.map((widget) => (
        <div key={widget.id} className="bg-white p-4 rounded-lg shadow">
          {widget.widgetType === "text" && (
            <TextWidget
              key={widget.id}
              heading={widget.heading}
              content={widget.content}
            />
          )}
          {widget.widgetType === "stat" && (
            <StatWidget
              key={widget.id}
              value={widget.value}
              label={widget.label}
              change={widget.change}
              icon={widget.icon}
            />
          )}
        </div>
      ))}
    </div>
  );
}
