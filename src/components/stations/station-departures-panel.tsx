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
import { statusConfig, formatDateTime, sortByArrivalDepartureTime } from "@/lib/train-utils"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"
import type { ISchedule } from "@/types/schedule-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedules: ISchedule[]
  stations: string[]
}

export function StationDeparturesPanel(props: IProps) {
  const { schedules, stations } = props
  const [selectedStation, setSelectedStation] = useState<string>("")

  const filtered = selectedStation
    ? schedules.filter((s) => s.arrivalStation === selectedStation)
    : schedules

  const sorted = sortByArrivalDepartureTime(filtered)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <Label>Filter by station</Label>
          <Select
            value={selectedStation}
            onValueChange={(v) => setSelectedStation(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="All stations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stations</SelectItem>
              {stations.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departs at</TableHead>
              <TableHead>Train</TableHead>
              <TableHead>From station</TableHead>
              <TableHead>Arrived at</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No departures found{selectedStation ? ` for ${selectedStation}` : ""}.
                </TableCell>
              </TableRow>
            )}
            {sorted.map((schedule) => {
              const status = statusConfig[schedule.status]
              return (
                <TableRow
                  key={schedule.id}
                  className={schedule.status === ScheduleStatus.Cancelled || schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
                >
                  <TableCell className="font-mono text-lg font-semibold">
                    {formatDateTime(schedule.arrivalDepartureTime)}
                  </TableCell>
                  <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                  <TableCell>{schedule.arrivalStation}</TableCell>
                  <TableCell>{formatDateTime(schedule.arrivalTime)}</TableCell>
                  <TableCell>{schedule.platform}</TableCell>
                  <TableCell>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                      {status.label}
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
        Showing {sorted.length} departure{sorted.length !== 1 ? "s" : ""}.
      </p>
    </div>
  )
}
