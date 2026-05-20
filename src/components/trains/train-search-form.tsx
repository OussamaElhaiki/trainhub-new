"use client"

import { useRouter } from "next/navigation"
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
import { statusConfig, calculateDuration, formatDateTime } from "@/lib/train-utils"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"

interface IProps {
  trains: ITrain[]
  schedules: ISchedule[]
  selected: string
}

export function TrainSearchForm(props: IProps) {
  const { trains, schedules, selected } = props
  const router = useRouter()

  const results = selected
    ? schedules.filter((s) => s.trainNumber === selected)
    : []

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>Select train number</Label>
        <Select
          value={selected}
          onValueChange={(value: string) =>
            router.push(`/trains/search?train=${value}`)
          }
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a train" />
          </SelectTrigger>
          <SelectContent>
            {trains.map((t) => (
              <SelectItem key={t.id} value={t.trainNumber}>
                {t.trainNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No schedules found for train <span className="font-medium">{selected}</span>.
        </p>
      )}

      {results.length > 0 && (
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departure</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Return dep.</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Carriages</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((schedule) => {
                const status = statusConfig[schedule.status]
                return (
                  <TableRow
                    key={schedule.id}
                    className={schedule.status === "archived" ? "opacity-60" : ""}
                  >
                    <TableCell>{formatDateTime(schedule.departureTime)}</TableCell>
                    <TableCell>{schedule.arrivalStation}</TableCell>
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
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {!selected && (
        <p className="text-sm text-muted-foreground">
          Choose a train number above to see its schedules.
        </p>
      )}
    </div>
  )
}
