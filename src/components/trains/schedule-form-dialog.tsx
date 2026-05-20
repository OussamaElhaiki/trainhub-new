"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postApi, putApi } from "@/utils/server-api"
import { PlusIcon, PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { scheduleFormSchema } from "@/types/schedule-t"
import type { ISchedule, IScheduleForm } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import { STATIONS, PLATFORMS, CARRIAGES_OPTIONS } from "@/lib/constants"
import { DateTimePicker } from "@/components/ui/datetime-picker"

interface IProps {
  schedule?: ISchedule
  trains: ITrain[]
  trigger?: React.ReactNode
}

const DEFAULT_VALUES = {
  trainNumber: "",
  departureTime: "",
  platform: "",
  carriages: 1 as number,
  seats: 100 as number,
  arrivalStation: "",
  arrivalTime: "",
  arrivalDepartureTime: "",
  status: "on-time" as IScheduleForm["status"],
}

export function ScheduleFormDialog(props: IProps) {
  const { schedule, trains, trigger } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const isEdit = !!schedule

  const initial: IScheduleForm = schedule
    ? {
        trainNumber: schedule.trainNumber,
        departureTime: schedule.departureTime,
        platform: schedule.platform,
        carriages: schedule.carriages,
        seats: schedule.seats,
        arrivalStation: schedule.arrivalStation,
        arrivalTime: schedule.arrivalTime,
        arrivalDepartureTime: schedule.arrivalDepartureTime,
        status: schedule.status,
      }
    : DEFAULT_VALUES

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IScheduleForm>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: initial,
  })

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      reset(initial)
      setServerError(null)
    }
  }

  async function onSubmit(data: IScheduleForm) {
    setServerError(null)
    const json = isEdit
      ? await putApi(`/api/schedules/${schedule.id}`, data)
      : await postApi("/api/schedules", data)

    if (json?.error) {
      const codes: Record<string, string> = {
        not_found: "Schedule not found",
      }
      setServerError(codes[json.error] ?? "Something went wrong")
      return
    }

    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            {isEdit ? <><PencilIcon className="size-3.5" /> Edit</> : <><PlusIcon className="size-3.5" /> Add Schedule</>}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Schedule" : "Add Schedule"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {/* Train Number */}
          <div className="space-y-1.5">
            <Label>Train number</Label>
            <Controller
              name="trainNumber"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a train" />
                  </SelectTrigger>
                  <SelectContent>
                    {trains.map((t) => (
                      <SelectItem key={t.id} value={t.trainNumber}>
                        {t.trainNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.trainNumber && (
              <p className="text-xs text-destructive">{errors.trainNumber.message}</p>
            )}
          </div>

          {/* Departure Time */}
          <div className="space-y-1.5">
            <Label>Departure time (Vilnius)</Label>
            <Controller
              name="departureTime"
              control={control}
              render={({ field }) => (
                <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick departure date & time" />
              )}
            />
            {errors.departureTime && (
              <p className="text-xs text-destructive">{errors.departureTime.message}</p>
            )}
          </div>

          {/* Platform */}
          <div className="space-y-1.5">
            <Label>Platform</Label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={p}>
                        Platform {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.platform && (
              <p className="text-xs text-destructive">{errors.platform.message}</p>
            )}
          </div>

          {/* Carriages */}
          <div className="space-y-1.5">
            <Label>Carriages</Label>
            <Controller
              name="carriages"
              control={control}
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select carriages" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARRIAGES_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.carriages && (
              <p className="text-xs text-destructive">{errors.carriages.message}</p>
            )}
          </div>

          {/* Seats */}
          <div className="space-y-1.5">
            <Label htmlFor="seats">Total seats (10–500)</Label>
            <Input
              id="seats"
              type="number"
              {...register("seats", { valueAsNumber: true })}
            />
            {errors.seats && (
              <p className="text-xs text-destructive">{errors.seats.message}</p>
            )}
          </div>

          {/* Arrival Station */}
          <div className="space-y-1.5">
            <Label>Arrival station</Label>
            <Controller
              name="arrivalStation"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.arrivalStation && (
              <p className="text-xs text-destructive">{errors.arrivalStation.message}</p>
            )}
          </div>

          {/* Arrival Time */}
          <div className="space-y-1.5">
            <Label>Arrival time</Label>
            <Controller
              name="arrivalTime"
              control={control}
              render={({ field }) => (
                <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick arrival date & time" />
              )}
            />
            {errors.arrivalTime && (
              <p className="text-xs text-destructive">{errors.arrivalTime.message}</p>
            )}
          </div>

          {/* Departure from Arrival Station */}
          <div className="space-y-1.5">
            <Label>Departure from arrival station</Label>
            <Controller
              name="arrivalDepartureTime"
              control={control}
              render={({ field }) => (
                <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick departure date & time" />
              )}
            />
            {errors.arrivalDepartureTime && (
              <p className="text-xs text-destructive">{errors.arrivalDepartureTime.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-time">On Time</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-destructive">{errors.status.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-xs text-destructive">{serverError}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add Schedule"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
