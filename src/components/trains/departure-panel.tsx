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
import { statusConfig, formatDateTime } from "@/lib/train-utils"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"
import { useDict } from "@/lib/dictionary-context"
import type { ISchedule } from "@/types/schedule-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedules: ISchedule[]
  stations: string[]
}

export function DeparturePanel(props: IProps) {
  const { schedules, stations } = props
  const [selectedStation, setSelectedStation] = useState<string>("")
  const dict = useDict()
  const p = dict.pages.departureSchedule
  const c = dict.common

  const filtered = selectedStation
    ? schedules.filter((s) => s.arrivalStation === selectedStation)
    : schedules

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <Label>{p.filterByArrival}</Label>
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

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{c.time}</TableHead>
              <TableHead>{c.train}</TableHead>
              <TableHead>{c.destination}</TableHead>
              <TableHead>{c.platform}</TableHead>
              <TableHead>{c.status}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  {p.noResults}
                </TableCell>
              </TableRow>
            )}
            {filtered.map((schedule) => {
              const sc = statusConfig[schedule.status]
              const statusLabel = dict.status[schedule.status as keyof typeof dict.status]
              return (
                <TableRow
                  key={schedule.id}
                  className={schedule.status === ScheduleStatus.Cancelled || schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
                >
                  <TableCell className="font-mono text-lg font-semibold">
                    {formatDateTime(schedule.departureTime)}
                  </TableCell>
                  <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                  <TableCell>{schedule.arrivalStation}</TableCell>
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
        {c.showing} {filtered.length} {filtered.length !== 1 ? c.departuresWord : c.departureWord}.
      </p>
    </div>
  )
}
