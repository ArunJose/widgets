"use client";

import { WidgetGroup } from "../components/WidgetGroup";
import { WidgetVisibilityControl } from "../components/WidgetVisibilityControl";
import { toggleWidgetVisibility } from "./actions/widgetVisibilitiy.actions";
import { widgetData } from "./widgetData";
import { useState } from "react";

export default function Home() {
  const [visibleWidgets, setVisibleWidgets] = useState<number[]>(
    widgetData.map((widget) => widget.id)
  );

  const handleWidgetVisibilityChange = async (
    widgetId: number,
    isVisible: boolean
  ) => {
    const data = await toggleWidgetVisibility(widgetId, isVisible);
    if (data.success) {
      setVisibleWidgets((prevWidgets) =>
        isVisible
          ? [...prevWidgets, widgetId]
          : prevWidgets.filter((id) => id !== widgetId)
      );
    }
  };

  return (
    <div className="p-4 mx-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold underline mb-4">Widgets</h1>
        <WidgetVisibilityControl
          visibleWidgets={visibleWidgets}
          handleWidgetVisibilityChange={handleWidgetVisibilityChange}
        />
      </div>
      <WidgetGroup widgetData={widgetData} visibleWidgets={visibleWidgets} />
    </div>
  );
}