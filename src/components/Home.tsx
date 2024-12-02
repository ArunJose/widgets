"use client";

import { WidgetGroup } from "./WidgetGroup";
import { WidgetVisibilityControl } from "./WidgetVisibilityControl";
import {
  toggleWidgetVisibility,
  getAllVisibleWidgetIds,
} from "@/app/actions/widgetVisibilitiy.actions";
import { widgetData } from "@/app/widgetData";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Loading from "./Loading";
import { useUser } from "@clerk/nextjs";
import SignInView from "@/components/SignInView";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleWidgets, setVisibleWidgets] = useState<number[]>([]);
  const { isLoaded, user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchVisibleWidgets = async () => {
      const visibleWidgetsData = await getAllVisibleWidgetIds(userId || "");
      if (visibleWidgetsData.success && visibleWidgetsData.visibleWidgetIds) {
        setVisibleWidgets(visibleWidgetsData.visibleWidgetIds);
      }
      setIsLoading(false);
    };
    fetchVisibleWidgets();
  }, [userId]);

  const handleWidgetVisibilityChange = async (
    widgetId: number,
    isVisible: boolean
  ) => {
    const data = await toggleWidgetVisibility(
      widgetId,
      isVisible,
      userId || ""
    );
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

  //Check if authentication details are being loaded
  if (!isLoaded) {
    return <Loading />;
  }

  //If user is not signed in
  if (!user) {
    return <SignInView />;
  }

  return (
    <div className="p-4 mx-4">
      <div className="flex flex-col items-center mb-8">
        <p className="text-gray-600 mb-6 text-center max-w-2xl">
          Select which widgets you would like to display on your dashboard.
          Toggle widgets on/off to customize your view.
        </p>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
          <WidgetVisibilityControl
            visibleWidgets={visibleWidgets}
            handleWidgetVisibilityChange={handleWidgetVisibilityChange}
          />
          <span className="text-sm text-gray-500">
            {visibleWidgets.length} widgets selected
          </span>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            title="Click to select which widgets to display on your dashboard"
          >
            <InfoCircledIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
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
