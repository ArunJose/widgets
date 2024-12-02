"use client";

import { WidgetGroup } from "../components/WidgetGroup";
import { WidgetVisibilityControl } from "../components/WidgetVisibilityControl";
import {
  toggleWidgetVisibility,
  getAllVisibleWidgetIds,
} from "./actions/widgetVisibilitiy.actions";
import { widgetData } from "./widgetData";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import SignInView from "../components/SignInView";

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleWidgets, setVisibleWidgets] = useState<number[]>([]);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const fetchVisibleWidgets = async () => {
      const visibleWidgetsData = await getAllVisibleWidgetIds();

      if (visibleWidgetsData.success && visibleWidgetsData.visibleWidgetIds) {
        setVisibleWidgets(visibleWidgetsData.visibleWidgetIds);
      }
      setIsLoading(false);
    };
    fetchVisibleWidgets();
  }, []);

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
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
    }
  };

  //Check if user is loaded
  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return <SignInView />;
  }

  return (
    <div className="p-4 mx-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold underline mb-4">Widgets</h1>
        <WidgetVisibilityControl
          visibleWidgets={visibleWidgets}
          handleWidgetVisibilityChange={handleWidgetVisibilityChange}
        />
      </div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <WidgetGroup widgetData={widgetData} visibleWidgets={visibleWidgets} />
      )}
    </div>
  );
}
