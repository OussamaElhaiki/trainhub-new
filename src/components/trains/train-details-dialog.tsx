"use client"

import { useState } from "react"
import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { calculateDuration, statusConfig, formatDateTime } from "@/lib/train-utils"
import { useDict } from "@/lib/dictionary-context"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  schedule: ISchedule
}

export function TrainDetailsDialog(props: IProps) {
  const { schedule } = props
  const [open, setOpen] = useState(false)
  const dict = useDict()
  const p = dict.pages.details
  const sc = statusConfig[schedule.status]
  const statusLabel = dict.status[schedule.status as keyof typeof dict.status]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <InfoIcon className="size-3.5" /> {p.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {dict.common.train} {schedule.trainNumber} — {schedule.arrivalStation}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">{p.statusLabel}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${sc.className}`}>
              {statusLabel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.departureVilnius}</span>
            <span className="font-medium">{formatDateTime(schedule.departureTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.arrivalAt} {schedule.arrivalStation}</span>
            <span className="font-medium">{formatDateTime(schedule.arrivalTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.departureFrom} {schedule.arrivalStation}</span>
            <span className="font-medium">{formatDateTime(schedule.arrivalDepartureTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.travelDuration}</span>
            <span className="font-medium">
              {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">{p.platform}</span>
            <span className="font-medium">{schedule.platform}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.carriages}</span>
            <span className="font-medium">{schedule.carriages}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{p.totalSeats}</span>
            <span className="font-medium">{schedule.seats}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
