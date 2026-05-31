"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { statusConfig, formatDateTime, calculateDuration, sortByArrivalTime, filterByStation } from "@/lib/train-utils"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"
import { useDict } from "@/lib/dictionary-context"
import type { ISchedule } from "@/types/schedule-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedules: ISchedule[]
  stations: string[]
}

export function StationArrivalsPanel(props: IProps) {
  const { schedules, stations } = props
  const [selectedStation, setSelectedStation] = useState<string>("")
  const dict = useDict()
  const p = dict.pages.arrivalTimes
  const c = dict.common

  const filtered = filterByStation(schedules, selectedStation)

  const sorted = sortByArrivalTime(filtered)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <Label>{c.filterByStation}</Label>
          <Select
            value={selectedStation}
            onValueChange={(v) => setSelectedStation(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder={c.allStations} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{c.allStations}</SelectItem>
              {stations.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{p.arrivalTime}</TableHead>
              <TableHead>{c.train}</TableHead>
              <TableHead>{p.station}</TableHead>
              <TableHead>{p.departureVilnius}</TableHead>
              <TableHead>{c.duration}</TableHead>
              <TableHead>{c.platform}</TableHead>
              <TableHead>{c.status}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  {p.noArrivals}{selectedStation ? ` — ${selectedStation}` : ""}.
                </TableCell>
              </TableRow>
            )}
            {sorted.map((schedule) => {
              const sc = statusConfig[schedule.status]
              const statusLabel = dict.status[schedule.status as keyof typeof dict.status]
              return (
                <TableRow
                  key={schedule.id}
                  className={schedule.status === ScheduleStatus.Cancelled || schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
                >
                  <TableCell className="font-mono text-lg font-semibold">
                    {formatDateTime(schedule.arrivalTime)}
                  </TableCell>
                  <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                  <TableCell>{schedule.arrivalStation}</TableCell>
                  <TableCell>{formatDateTime(schedule.departureTime)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
                  </TableCell>
                  <TableCell>{schedule.platform}</TableCell>
                  <TableCell>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${sc.className}`}>
                      {statusLabel}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <TrainDetailsDialog schedule={schedule} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        {c.showing} {sorted.length} {sorted.length !== 1 ? c.arrivalsWord : c.arrivalWord}.
      </p>
    </div>
  )
}
