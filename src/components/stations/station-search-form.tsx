"use client"

import { useState } from "react"
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
import type { IStation } from "@/types/station-t"

interface IProps {
  stations: IStation[]
  schedules: ISchedule[]
  selected: string
}

export function StationSearchForm(props: IProps) {
  const { stations, schedules } = props
  const [selected, setSelected] = useState(props.selected)

  const results = selected
    ? schedules.filter((s) => s.arrivalStation === selected)
    : []

  const sorted = sortByDepartureTime(results)

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>Select station</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a station" />
          </SelectTrigger>
          <SelectContent>
            {stations.map((s) => (
              <SelectItem key={s.id} value={s.name}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected && sorted.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No schedules found for station <span className="font-medium">{selected}</span>.
        </p>
      )}

      {sorted.length > 0 && (
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Train</TableHead>
                <TableHead>Departure (Vilnius)</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Return dep.</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Carriages</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((schedule) => {
                const status = statusConfig[schedule.status]
                return (
                  <TableRow
                    key={schedule.id}
                    className={schedule.status === "archived" ? "opacity-60" : ""}
                  >
                    <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                    <TableCell>{formatDateTime(schedule.departureTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalDepartureTime)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
                    </TableCell>
                    <TableCell>{schedule.platform}</TableCell>
                    <TableCell>{schedule.carriages}</TableCell>
                    <TableCell>{schedule.seats}</TableCell>
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
          Choose a station above to see all trains serving it.
        </p>
      )}
    </div>
  )
}
