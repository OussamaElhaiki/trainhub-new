"use client"

import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { filterActiveSchedules, sortByDepartureTime, statusConfig } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  destination: string
}

export function DepartureList(props: IProps) {
  const { destination } = props
  const [schedules, setSchedules] = useState<ISchedule[]>([])

  useEffect(() => {
    if (!destination) {
      setSchedules([])
      return
    }
    getApi<ISchedule[]>(`/api/schedules?arrivalStation=${encodeURIComponent(destination)}`).then(
      (data) => {
        const active = filterActiveSchedules(data ?? [])
        setSchedules(sortByDepartureTime(active).slice(0, 5))
      }
    )
  }, [destination])

  if (!destination || schedules.length === 0) return null

  return (
    <div className="absolute top-full mt-2 left-0 z-50 min-w-64 rounded-lg border border-border bg-background/95 backdrop-blur-sm shadow-lg p-3 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Next departures to {destination}
      </p>
      <div className="space-y-1.5">
        {schedules.map((s) => {
          const status = statusConfig[s.status]
          return (
            <div key={s.id} className="flex items-center justify-between gap-4 text-sm">
              <span className="font-mono font-semibold">{s.departureTime.slice(11, 16)}</span>
              <span className="text-muted-foreground flex-1">{s.trainNumber}</span>
              <span className="text-xs text-muted-foreground">Pl. {s.platform}</span>
              <span className={`rounded-full border px-1.5 py-0.5 text-xs font-semibold ${status.className}`}>
                {status.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
