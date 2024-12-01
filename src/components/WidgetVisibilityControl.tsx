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

import { widgetData } from "../app/widgetData";

export function WidgetVisibilityControl({
  visibleWidgets,
  handleWidgetVisibilityChange,
}: {
  visibleWidgets: number[];
  handleWidgetVisibilityChange: (widgetId: number, isVisible: boolean) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Widgets</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Toggle Widget Visibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {widgetData.map((widget) => (
          <DropdownMenuCheckboxItem
            key={widget.id}
            checked={visibleWidgets.includes(widget.id)}
            onCheckedChange={(checked) =>
              handleWidgetVisibilityChange(widget.id, checked)
            }
          >
            {widget.widgetType === "text" ? widget.heading : widget.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
