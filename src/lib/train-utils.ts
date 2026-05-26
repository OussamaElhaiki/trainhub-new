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

export function sortByArrivalTime(schedules: ISchedule[]): ISchedule[] {
  return [...schedules].sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime))
}

export function sortByArrivalDepartureTime(schedules: ISchedule[]): ISchedule[] {
  return [...schedules].sort((a, b) => a.arrivalDepartureTime.localeCompare(b.arrivalDepartureTime))
}

export function filterActiveSchedules(schedules: ISchedule[]): ISchedule[] {
  return schedules.filter((s) => s.status !== "archived")
}

export type IRouteGroup = {
  destination: string
  count: number
  firstDep: string
  lastDep: string
  duration: string
}

export type IDestinationSummary = {
  name: string
  count: number
  nextDep: string
  duration: string
}

function groupByDestination(schedules: ISchedule[]): Map<string, ISchedule[]> {
  const map = new Map<string, ISchedule[]>()
  for (const s of schedules) {
    map.set(s.arrivalStation, [...(map.get(s.arrivalStation) ?? []), s])
  }
  return map
}

export function buildRouteGroups(schedules: ISchedule[]): IRouteGroup[] {
  const active = filterActiveSchedules(schedules)
  const map = groupByDestination(active)
  return [...map.entries()]
    .map(([destination, items]) => {
      const sorted = sortByDepartureTime(items)
      const first = sorted[0]!
      const last = sorted[sorted.length - 1]!
      return {
        destination,
        count: items.length,
        firstDep: first.departureTime.slice(11, 16),
        lastDep: last.departureTime.slice(11, 16),
        duration: calculateDuration(first.departureTime, first.arrivalTime),
      }
    })
    .sort((a, b) => a.destination.localeCompare(b.destination))
}

export function buildDestinationSummaries(schedules: ISchedule[]): IDestinationSummary[] {
  const active = filterActiveSchedules(schedules)
  const map = groupByDestination(active)
  return [...map.entries()]
    .map(([name, items]) => {
      const sorted = sortByDepartureTime(items)
      const next = sorted[0]!
      return {
        name,
        count: items.length,
        nextDep: next.departureTime.slice(11, 16),
        duration: calculateDuration(next.departureTime, next.arrivalTime),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
