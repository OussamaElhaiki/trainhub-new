import { format, parseISO, isValid } from "date-fns"
import type { ISchedule } from "@/types/schedule-t"

export function formatDateTime(value: string): string {
  if (!value) return "—"
  try {
    const d = parseISO(value)
    return isValid(d) ? format(d, "dd MMM yyyy, HH:mm") : value
  } catch {
    return value
  }
}

function extractTime(value: string): string {
  // handles both "HH:MM" and "YYYY-MM-DDTHH:MM"
  if (value.includes("T")) return value.split("T")[1] ?? "00:00"
  return value
}

export const statusConfig = {
  "on-time": { label: "On Time", className: "bg-green-500/20 text-green-400 border-green-500/30", rowClass: "border-l-2 border-l-green-500/70" },
  delayed: { label: "Delayed", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", rowClass: "border-l-2 border-l-yellow-500/70" },
  cancelled: { label: "Cancelled", className: "bg-red-500/20 text-red-400 border-red-500/30", rowClass: "border-l-2 border-l-red-500/70" },
  archived: { label: "Archived", className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30", rowClass: "border-l-2 border-l-zinc-500/50" },
} as const

export function calculateDuration(startTime: string, endTime: string): string {
  const [startHour = 0, startMin = 0] = extractTime(startTime).split(":").map(Number)
  const [endHour = 0, endMin = 0] = extractTime(endTime).split(":").map(Number)
  let duration = endHour * 60 + endMin - (startHour * 60 + startMin)
  if (duration < 0) duration += 24 * 60
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}

export function getUniquePlatforms(schedules: ISchedule[]): string[] {
  return Array.from(new Set(schedules.map((s) => s.platform))).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )
}

export function getUniqueDestinations(schedules: ISchedule[]): string[] {
  return Array.from(new Set(schedules.map((s) => s.arrivalStation))).sort()
}

export function sortByDepartureTime(schedules: ISchedule[]): ISchedule[] {
  return [...schedules].sort((a, b) => a.departureTime.localeCompare(b.departureTime))
}
