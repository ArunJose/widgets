import { Widget } from "@/app/widgetData";
import { TextWidget } from "@/components/widgets/TextWidget";
import { StatWidget } from "@/components/widgets/StatWidget";

export function WidgetGroup({
  widgetData,
  visibleWidgets,
}: {
  widgetData: Widget[];
  visibleWidgets: number[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {widgetData
        .filter((widget) => visibleWidgets.includes(widget.id))
        .map((widget) => (
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
