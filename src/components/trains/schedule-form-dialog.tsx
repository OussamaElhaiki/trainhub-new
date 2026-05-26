"use client"

import { useActionState, useEffect, useState } from "react"
import { useDialogForm } from "@/hooks/use-dialog-form"
import { scheduleAction } from "@/actions/schedule-action"
import type { IState } from "@/types/action-t"
import { FormField } from "@/components/ui/form-field"
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
import type { ISchedule } from "@/types/schedule-t"
import type { ITrain } from "@/types/train-t"
import { PLATFORMS, CARRIAGES_OPTIONS } from "@/lib/constants"
import type { IStation } from "@/types/station-t"
import { DateTimePicker } from "@/components/ui/datetime-picker"
import { ScheduleStatus } from "@/constants/status"

interface IProps {
  schedule?: ISchedule
  trains: ITrain[]
  stations: IStation[]
  onSuccess?: () => void
  trigger?: React.ReactNode
}

const INITIAL_STATE = { isSaved: false }

export function ScheduleFormDialog(props: IProps) {
  const { schedule, trains, stations, onSuccess, trigger } = props
  const isEdit = !!schedule

  const [state, action, isPending] = useActionState<IState, FormData>(scheduleAction, INITIAL_STATE)
  const { open, handleOpenChange } = useDialogForm(() => {})

  const [trainNumber, setTrainNumber] = useState(schedule?.trainNumber ?? "")
  const [departureTime, setDepartureTime] = useState(schedule?.departureTime ?? "")
  const [platform, setPlatform] = useState(schedule?.platform ?? "")
  const [carriages, setCarriages] = useState(String(schedule?.carriages ?? 1))
  const [arrivalStation, setArrivalStation] = useState(schedule?.arrivalStation ?? "")
  const [arrivalTime, setArrivalTime] = useState(schedule?.arrivalTime ?? "")
  const [arrivalDepartureTime, setArrivalDepartureTime] = useState(schedule?.arrivalDepartureTime ?? "")
  const [status, setStatus] = useState<ScheduleStatus>(schedule?.status ?? ScheduleStatus.OnTime)

  useEffect(() => {
    if (state.isSaved) {
      handleOpenChange(false)
      onSuccess?.()
    }
  }, [state])

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

        <form action={action} className="space-y-4 pt-1">
          {schedule && <input type="hidden" name="id" value={schedule.id} />}
          <input type="hidden" name="trainNumber" value={trainNumber} />
          <input type="hidden" name="departureTime" value={departureTime} />
          <input type="hidden" name="platform" value={platform} />
          <input type="hidden" name="carriages" value={carriages} />
          <input type="hidden" name="arrivalStation" value={arrivalStation} />
          <input type="hidden" name="arrivalTime" value={arrivalTime} />
          <input type="hidden" name="arrivalDepartureTime" value={arrivalDepartureTime} />
          <input type="hidden" name="status" value={status} />

          <FormField label="Train number" error={state.errors?.trainNumber?.[0]}>
            <Select value={trainNumber} onValueChange={setTrainNumber}>
              <SelectTrigger><SelectValue placeholder="Select a train" /></SelectTrigger>
              <SelectContent>
                {trains.map((t) => (
                  <SelectItem key={t.id} value={t.trainNumber}>{t.trainNumber}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Departure time (Vilnius)" error={state.errors?.departureTime?.[0]}>
            <DateTimePicker value={departureTime} onChange={setDepartureTime} placeholder="Pick departure date & time" />
          </FormField>

          <FormField label="Platform" error={state.errors?.platform?.[0]}>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p} value={p}>Platform {p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Carriages" error={state.errors?.carriages?.[0]}>
            <Select value={carriages} onValueChange={setCarriages}>
              <SelectTrigger><SelectValue placeholder="Select carriages" /></SelectTrigger>
              <SelectContent>
                {CARRIAGES_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Total seats (10–500)" error={state.errors?.seats?.[0]}>
            <Input id="seats" name="seats" type="number" defaultValue={schedule?.seats ?? 100} />
          </FormField>

          <FormField label="Arrival station" error={state.errors?.arrivalStation?.[0]}>
            <Select value={arrivalStation} onValueChange={setArrivalStation}>
              <SelectTrigger><SelectValue placeholder="Select station" /></SelectTrigger>
              <SelectContent>
                {stations.map((s) => (
                  <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Arrival time" error={state.errors?.arrivalTime?.[0]}>
            <DateTimePicker value={arrivalTime} onChange={setArrivalTime} placeholder="Pick arrival date & time" />
          </FormField>

          <FormField label="Departure from arrival station" error={state.errors?.arrivalDepartureTime?.[0]}>
            <DateTimePicker value={arrivalDepartureTime} onChange={setArrivalDepartureTime} placeholder="Pick departure date & time" />
          </FormField>

          <FormField label="Status" error={state.errors?.status?.[0]}>
            <Select value={status} onValueChange={(v) => setStatus(v as ScheduleStatus)}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ScheduleStatus.OnTime}>On Time</SelectItem>
                <SelectItem value={ScheduleStatus.Delayed}>Delayed</SelectItem>
                <SelectItem value={ScheduleStatus.Cancelled}>Cancelled</SelectItem>
                <SelectItem value={ScheduleStatus.Archived}>Archived</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {state.message && !state.isSaved && (
            <p className="text-xs text-destructive">{state.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => handleOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving…" : isEdit ? "Save changes" : "Add Schedule"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
