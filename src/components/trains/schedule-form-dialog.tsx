"use client"

import { FormField } from "@/components/ui/form-field"
import { useDialogForm } from "@/hooks/use-dialog-form"
import { useForm, Controller } from "react-hook-form"
import { useCrud } from "@/hooks/use-crud"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { PLATFORMS, CARRIAGES_OPTIONS } from "@/lib/constants"
import type { IStation } from "@/types/station-t"
import { DateTimePicker } from "@/components/ui/datetime-picker"

interface IProps {
  schedule?: ISchedule
  trains: ITrain[]
  stations: IStation[]
  onSuccess?: (schedule: ISchedule) => void
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
  const { schedule, trains, stations, onSuccess, trigger } = props

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

  const { open, serverError, setServerError, handleOpenChange } = useDialogForm(
    () => reset(initial)
  )

  const { submit, isEdit } = useCrud({
    endpoint: "/api/schedules",
    id: schedule?.id,
    errorCodes: { not_found: "Schedule not found" },
    onSuccess: (json) => { handleOpenChange(false); onSuccess?.(json as ISchedule) },
    setServerError,
  })

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

        <form onSubmit={handleSubmit(submit)} className="space-y-4 pt-1">

          <FormField label="Train number" error={errors.trainNumber?.message}>
            <Controller name="trainNumber" control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select a train" /></SelectTrigger>
                <SelectContent>
                  {trains.map((t) => (
                    <SelectItem key={t.id} value={t.trainNumber}>{t.trainNumber}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </FormField>

          <FormField label="Departure time (Vilnius)" error={errors.departureTime?.message}>
            <Controller name="departureTime" control={control} render={({ field }) => (
              <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick departure date & time" />
            )} />
          </FormField>

          <FormField label="Platform" error={errors.platform?.message}>
            <Controller name="platform" control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>Platform {p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </FormField>

          <FormField label="Carriages" error={errors.carriages?.message}>
            <Controller name="carriages" control={control} render={({ field }) => (
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger><SelectValue placeholder="Select carriages" /></SelectTrigger>
                <SelectContent>
                  {CARRIAGES_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </FormField>

          <FormField label="Total seats (10–500)" error={errors.seats?.message}>
            <Input id="seats" type="number" {...register("seats", { valueAsNumber: true })} />
          </FormField>

          <FormField label="Arrival station" error={errors.arrivalStation?.message}>
            <Controller name="arrivalStation" control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select station" /></SelectTrigger>
                <SelectContent>
                  {stations.map((s) => (
                    <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </FormField>

          <FormField label="Arrival time" error={errors.arrivalTime?.message}>
            <Controller name="arrivalTime" control={control} render={({ field }) => (
              <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick arrival date & time" />
            )} />
          </FormField>

          <FormField label="Departure from arrival station" error={errors.arrivalDepartureTime?.message}>
            <Controller name="arrivalDepartureTime" control={control} render={({ field }) => (
              <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Pick departure date & time" />
            )} />
          </FormField>

          <FormField label="Status" error={errors.status?.message}>
            <Controller name="status" control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )} />
          </FormField>

          {serverError && <p className="text-xs text-destructive">{serverError}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
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