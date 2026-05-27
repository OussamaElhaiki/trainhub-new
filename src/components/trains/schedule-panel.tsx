"use client"

import { useState } from "react"
import { deleteApi, getApi } from "@/utils/server-api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScheduleFormDialog } from "@/components/trains/schedule-form-dialog"
import { DeleteConfirmDialog } from "@/components/trains/delete-confirm-dialog"
import { statusConfig, calculateDuration, formatDateTime } from "@/lib/train-utils"
import { useDict } from "@/lib/dictionary-context"
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import type { IStation } from "@/types/station-t"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedules: ISchedule[]
  trains: ITrain[]
  stations: IStation[]
}

export function SchedulePanel(props: IProps) {
  const [schedules, setSchedules] = useState(props.schedules)
  const { trains, stations } = props
  const dict = useDict()
  const p = dict.pages.trainSchedule
  const c = dict.common

  async function refresh() {
    const data = await getApi<ISchedule[]>("/api/schedules")
    if (data) setSchedules(data)
  }

  async function handleDelete(id: string) {
    await deleteApi("/api/schedules", id)
    await refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {schedules.length} {schedules.length !== 1 ? p.schedulesFound : p.scheduleFound}
        </p>
        <ScheduleFormDialog trains={trains} stations={stations} onSuccess={refresh} />
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{c.train}</TableHead>
              <TableHead>{c.departure}</TableHead>
              <TableHead>{c.destination}</TableHead>
              <TableHead>{c.arrival}</TableHead>
              <TableHead>{p.returnDep}</TableHead>
              <TableHead>{c.duration}</TableHead>
              <TableHead>{c.platform}</TableHead>
              <TableHead>{c.carriages}</TableHead>
              <TableHead>{c.seats}</TableHead>
              <TableHead>{c.status}</TableHead>
              <TableHead className="text-right">{c.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                  {p.noSchedules}
                </TableCell>
              </TableRow>
            )}
            {schedules.map((schedule) => {
              const sc = statusConfig[schedule.status]
              const statusLabel = dict.status[schedule.status as keyof typeof dict.status]
              return (
                <TableRow
                  key={schedule.id}
                  className={schedule.status === ScheduleStatus.Archived ? "opacity-60" : ""}
                >
                  <TableCell className="font-medium">{schedule.trainNumber}</TableCell>
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ScheduleFormDialog schedule={schedule} trains={trains} stations={stations} onSuccess={refresh} />
                      <DeleteConfirmDialog
                        title={`Delete schedule for ${schedule.trainNumber}?`}
                        description="This will permanently remove this schedule entry."
                        onConfirm={() => handleDelete(schedule.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
