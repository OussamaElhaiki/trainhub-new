"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { statusConfig, calculateDuration, formatDateTime, sortByDepartureTime } from "@/lib/train-utils"
import { TrainDetailsDialog } from "@/components/trains/train-details-dialog"
import type { ISchedule } from "@/types/schedule-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedules: ISchedule[]
  destinations: string[]
  selected: string
}

export function RouteSearchForm(props: IProps) {
  const { schedules, destinations } = props
  const [selected, setSelected] = useState(props.selected)

  const results = sortByDepartureTime(
    selected ? schedules.filter((s) => s.arrivalStation === selected) : []
  )

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>Select destination</Label>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Vilnius</span>
          <ArrowRightIcon className="size-4 text-muted-foreground" />
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selected && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No schedules found for <span className="font-medium">{selected}</span>.
        </p>
      )}

      {results.length > 0 && (
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Train</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Return dep.</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((schedule) => {
                const status = statusConfig[schedule.status]
                return (
                  <TableRow
                    key={schedule.id}
                    className={schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
                  >
                    <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                    <TableCell>{formatDateTime(schedule.departureTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalDepartureTime)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
                    </TableCell>
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
      )}

      {!selected && (
        <p className="text-sm text-muted-foreground">
          Choose a destination above to see available trains.
        </p>
      )}
    </div>
  )
}
