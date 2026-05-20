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
import type { ISchedule } from "@/types/schedule-t"
import { calculateDuration, statusConfig, formatDateTime } from "@/lib/train-utils"

interface IProps {
  schedule: ISchedule
}

export function TrainDetailsDialog(props: IProps) {
  const { schedule } = props
  const [open, setOpen] = useState(false)
  const status = statusConfig[schedule.status]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <InfoIcon className="size-3.5" /> Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Train {schedule.trainNumber} — {schedule.arrivalStation}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Status</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Departure from Vilnius</span>
            <span className="font-medium">{formatDateTime(schedule.departureTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Arrival at {schedule.arrivalStation}</span>
            <span className="font-medium">{formatDateTime(schedule.arrivalTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Departure from {schedule.arrivalStation}</span>
            <span className="font-medium">{formatDateTime(schedule.arrivalDepartureTime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Travel duration</span>
            <span className="font-medium">
              {calculateDuration(schedule.departureTime, schedule.arrivalTime)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">{schedule.platform}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Carriages</span>
            <span className="font-medium">{schedule.carriages}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total seats</span>
            <span className="font-medium">{schedule.seats}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
