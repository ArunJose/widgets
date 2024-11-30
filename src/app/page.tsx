import { WidgetGroup } from "./components/WidgetGroup";
import { widgetData } from "./widgetData";
export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Widgets</h1>
      <WidgetGroup widgetData={widgetData} />
    </div>
  );
}
