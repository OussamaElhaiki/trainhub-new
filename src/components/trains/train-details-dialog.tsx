"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ITrain } from "@/types/train-t"
import { calculateDuration, statusConfig } from "@/lib/train-utils"

interface IProps {
  train: ITrain
}

export function TrainDetailsDialog(props: IProps) {
  const { train } = props
  const [open, setOpen] = useState(false)
  const status = statusConfig[train.status]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Train {train.trainNumber} — {train.arrivalStation}
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
            <span className="font-medium">{train.departureTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Arrival at {train.arrivalStation}</span>
            <span className="font-medium">{train.arrivalTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Travel duration</span>
            <span className="font-medium">
              {calculateDuration(train.departureTime, train.arrivalTime)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">{train.platform}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Carriages</span>
            <span className="font-medium">{train.carriages}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total seats</span>
            <span className="font-medium">{train.seats}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
