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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {visibleWidgets
        .map((id) => widgetData.find((widget) => widget.id === id))
        .filter((widget): widget is Widget => widget !== undefined)
        .map((widget) => (
          <div
            key={widget.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
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
