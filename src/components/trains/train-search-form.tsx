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
import { statusConfig, calculateDuration, formatDateTime, filterByTrain } from "@/lib/train-utils"
import { useDict } from "@/lib/dictionary-context"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  trains: ITrain[]
  schedules: ISchedule[]
  selected: string
}

export function TrainSearchForm(props: IProps) {
  const { trains, schedules } = props
  const [selected, setSelected] = useState(props.selected)
  const dict = useDict()
  const p = dict.pages.trainSearch
  const c = dict.common

  const results = filterByTrain(schedules, selected)

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>{p.selectTrain}</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder={p.chooseTrain} />
          </SelectTrigger>
          <SelectContent>
            {trains.map((t) => (
              <SelectItem key={t.id} value={t.trainNumber}>{t.trainNumber}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {p.noResults} <span className="font-medium">{selected}</span>.
        </p>
      )}

      {results.length > 0 && (
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{c.departure}</TableHead>
                <TableHead>{c.destination}</TableHead>
                <TableHead>{c.arrival}</TableHead>
                <TableHead>{p.returnDep}</TableHead>
                <TableHead>{c.duration}</TableHead>
                <TableHead>{c.platform}</TableHead>
                <TableHead>{c.carriages}</TableHead>
                <TableHead>{c.seats}</TableHead>
                <TableHead>{c.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((schedule) => {
                const sc = statusConfig[schedule.status]
                const statusLabel = dict.status[schedule.status as keyof typeof dict.status]
                return (
                  <TableRow
                    key={schedule.id}
                    className={schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
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
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${sc.className}`}>
                        {statusLabel}
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
        <p className="text-sm text-muted-foreground">{p.hint}</p>
      )}
    </div>
  )
}
