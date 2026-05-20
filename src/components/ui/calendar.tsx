"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col",
        month: "flex flex-col gap-3",
        month_caption: "relative flex items-center justify-center h-8",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 flex items-center justify-between",
        button_previous: "inline-flex items-center justify-center size-7 rounded-md border border-border bg-transparent opacity-50 hover:opacity-100 transition-opacity",
        button_next: "inline-flex items-center justify-center size-7 rounded-md border border-border bg-transparent opacity-50 hover:opacity-100 transition-opacity",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-8 text-center text-[0.8rem] font-normal",
        week: "flex w-full mt-1",
        day: "relative p-0 text-center text-sm w-8 h-8 flex items-center justify-center",
        day_button: cn(
          "inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        ),
        selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside: "opacity-40",
        disabled: "opacity-30 pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left"
            ? <ChevronLeftIcon className="size-4" />
            : <ChevronRightIcon className="size-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
