import type { ITrain } from "@/types/train-t"

export const statusConfig = {
  "on-time": { label: "On Time", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  delayed: { label: "Delayed", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  cancelled: { label: "Cancelled", className: "bg-red-500/20 text-red-400 border-red-500/30" },
} as const

export function calculateDuration(startTime: string, endTime: string): string {
  const [startHour = 0, startMin = 0] = startTime.split(":").map(Number)
  const [endHour = 0, endMin = 0] = endTime.split(":").map(Number)
  let duration = endHour * 60 + endMin - (startHour * 60 + startMin)
  if (duration < 0) duration += 24 * 60
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}

export function getUniquePlatforms(trains: ITrain[]): string[] {
  return Array.from(new Set(trains.map((t) => t.platform))).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )
}

export function getUniqueDestinations(trains: ITrain[]): string[] {
  return Array.from(new Set(trains.map((t) => t.arrivalStation))).sort()
}

export function sortByDepartureTime(trains: ITrain[]): ITrain[] {
  return [...trains].sort((a, b) => a.departureTime.localeCompare(b.departureTime))
}

export function sortByTrainNumber(trains: ITrain[]): ITrain[] {
  return [...trains].sort((a, b) => a.trainNumber.localeCompare(b.trainNumber))
}
