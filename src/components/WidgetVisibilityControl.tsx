"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Loader2 } from "lucide-react";

import { widgetData } from "../app/widgetData";

export function WidgetVisibilityControl({
  visibleWidgets,
  handleWidgetVisibilityChange,
}: {
  visibleWidgets: number[];
  handleWidgetVisibilityChange: (widgetId: number, isVisible: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [loadingStates, setLoadingStates] = React.useState<
    Record<number, boolean>
  >({});

  const handleCheckedChange = async (widgetId: number, checked: boolean) => {
    if (loadingStates[widgetId]) return;

    setLoadingStates((prev) => ({ ...prev, [widgetId]: true }));
    await handleWidgetVisibilityChange(widgetId, checked);
    setLoadingStates((prev) => ({ ...prev, [widgetId]: false }));
    setOpen(true);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Widgets</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 px-2 select-none"
        onSelect={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between">
          <DropdownMenuLabel className="select-none">
            Toggle Visibility
          </DropdownMenuLabel>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 mr-1"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DropdownMenuSeparator />
        {widgetData.map((widget) => (
          <DropdownMenuCheckboxItem
            key={widget.id}
            checked={visibleWidgets.includes(widget.id)}
            onSelect={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onCheckedChange={(checked) =>
              handleCheckedChange(widget.id, checked)
            }
            className="border-none [&>span:first-child]:border [&>span:first-child]:border-input [&>span:first-child]:rounded"
            disabled={loadingStates[widget.id]}
          >
            <span className="flex items-center gap-2">
              {widget.widgetType === "text" ? widget.heading : widget.label}
              {loadingStates[widget.id] && (
                <Loader2 className="h-3 w-3 animate-spin" />
              )}
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
