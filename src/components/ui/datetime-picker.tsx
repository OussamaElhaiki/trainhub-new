"use client"

import * as React from "react"
import { format, parseISO, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface IProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// value format: "YYYY-MM-DDTHH:MM"
export function DateTimePicker(props: IProps) {
  const { value, onChange, placeholder = "Pick date & time" } = props
  const [open, setOpen] = React.useState(false)

  const parsed = value && isValid(parseISO(value)) ? parseISO(value) : undefined
  const [hour, setHour] = React.useState(parsed ? String(parsed.getHours()).padStart(2, "0") : "")
  const [minute, setMinute] = React.useState(parsed ? String(parsed.getMinutes()).padStart(2, "0") : "")

  function handleDaySelect(day: Date | undefined) {
    if (!day) return
    const hh = hour || "00"
    const mm = minute || "00"
    const y = day.getFullYear()
    const mo = String(day.getMonth() + 1).padStart(2, "0")
    const d = String(day.getDate()).padStart(2, "0")
    onChange(`${y}-${mo}-${d}T${hh}:${mm}`)
  }

  function handleTimeChange(type: "hour" | "minute", val: string) {
    const num = val.replace(/\D/g, "").slice(0, 2)
    if (type === "hour") {
      setHour(num)
      if (parsed) {
        const y = parsed.getFullYear()
        const mo = String(parsed.getMonth() + 1).padStart(2, "0")
        const d = String(parsed.getDate()).padStart(2, "0")
        onChange(`${y}-${mo}-${d}T${num.padStart(2, "0")}:${minute || "00"}`)
      }
    } else {
      setMinute(num)
      if (parsed) {
        const y = parsed.getFullYear()
        const mo = String(parsed.getMonth() + 1).padStart(2, "0")
        const d = String(parsed.getDate()).padStart(2, "0")
        onChange(`${y}-${mo}-${d}T${hour || "00"}:${num.padStart(2, "0")}`)
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {parsed ? format(parsed, "dd MMM yyyy, HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[320px] p-0" align="start">
        <Calendar
          mode="single"
          selected={parsed}
          onSelect={handleDaySelect}
        />
        <div className="border-t border-border p-3 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Time:</span>
          <input
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            placeholder="HH"
            className="w-14 rounded-md border border-border bg-background px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="font-bold text-muted-foreground">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            placeholder="MM"
            className="w-14 rounded-md border border-border bg-background px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
