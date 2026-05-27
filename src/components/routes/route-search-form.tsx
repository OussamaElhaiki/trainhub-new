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
import { useDict } from "@/lib/dictionary-context"
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
  const dict = useDict()
  const p = dict.pages.routeSearch
  const c = dict.common

  const results = sortByDepartureTime(
    selected ? schedules.filter((s) => s.arrivalStation === selected) : []
  )

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label>{p.selectDestination}</Label>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground">Vilnius</span>
          <ArrowRightIcon className="size-4 text-muted-foreground" />
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder={p.chooseDestination} />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                <TableHead>{c.train}</TableHead>
                <TableHead>{c.departure}</TableHead>
                <TableHead>{c.arrival}</TableHead>
                <TableHead>{p.returnDep}</TableHead>
                <TableHead>{c.duration}</TableHead>
                <TableHead>{c.platform}</TableHead>
                <TableHead>{c.status}</TableHead>
                <TableHead />
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
                    <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
                    <TableCell>{formatDateTime(schedule.departureTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalTime)}</TableCell>
                    <TableCell>{formatDateTime(schedule.arrivalDepartureTime)}</TableCell>
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
      )}

      {!selected && (
        <p className="text-sm text-muted-foreground">{p.hint}</p>
      )}
    </div>
  )
}
