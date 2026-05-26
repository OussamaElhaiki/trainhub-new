"use client"

import { useState } from "react"
import { deleteApi } from "@/utils/server-api"
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
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import type { IStation } from "@/types/station-t"

interface IProps {
  schedules: ISchedule[]
  trains: ITrain[]
  stations: IStation[]
}

export function SchedulePanel(props: IProps) {
  const [schedules, setSchedules] = useState(props.schedules)
  const { trains, stations } = props

  async function handleDelete(id: string) {
    await deleteApi("/api/schedules", id)
    setSchedules((prev) => prev.filter((s) => s.id !== id))
  }

  function handleSave(schedule: ISchedule) {
    setSchedules((prev) => {
      const exists = prev.find((s) => s.id === schedule.id)
      return exists ? prev.map((s) => (s.id === schedule.id ? schedule : s)) : [...prev, schedule]
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{schedules.length} schedule{schedules.length !== 1 ? "s" : ""} found.</p>
        <ScheduleFormDialog trains={trains} stations={stations} onSuccess={handleSave} />
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Return dep.</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Carriages</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                  No schedules yet. Add the first one above.
                </TableCell>
              </TableRow>
            )}
            {schedules.map((schedule) => {
              const status = statusConfig[schedule.status]
              return (
                <TableRow
                  key={schedule.id}
                  className={schedule.status === "archived" ? "opacity-60" : ""}
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
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ScheduleFormDialog schedule={schedule} trains={trains} stations={stations} onSuccess={handleSave} />
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
