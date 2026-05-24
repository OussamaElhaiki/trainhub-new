"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postApi, putApi } from "@/utils/server-api"
import { PlusIcon, PencilIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { stationFormSchema } from "@/types/station-t"
import type { IStation, IStationForm } from "@/types/station-t"

interface IProps {
  station?: IStation
  onSuccess?: (station: IStation) => void
  trigger?: React.ReactNode
}

export function StationFormDialog(props: IProps) {
  const { station, onSuccess, trigger } = props
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const isEdit = !!station

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IStationForm>({
    resolver: zodResolver(stationFormSchema),
    defaultValues: { name: station?.name ?? "" },
    mode: "onTouched",
  })

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      reset({ name: station?.name ?? "" })
      setServerError(null)
    }
  }

  async function onSubmit(data: IStationForm) {
    setServerError(null)
    const json = isEdit
      ? await putApi(`/api/stations/${station.id}`, data)
      : await postApi("/api/stations", data)

    if (json?.error) {
      const codes: Record<string, string> = {
        duplicate: "A station with this name already exists",
        not_found: "Station not found",
      }
      setServerError(codes[json.error] ?? "Something went wrong")
      return
    }

    setOpen(false)
    reset()
    onSuccess?.(json as IStation)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            {isEdit ? <><PencilIcon className="size-3.5" /> Edit</> : <><PlusIcon className="size-3.5" /> Add Station</>}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Station" : "Add Station"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="name">Station name</Label>
            <Input
              id="name"
              placeholder="e.g. Kaunas"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-xs text-destructive">{serverError}</p>
          )}

          <div className="flex justify-end gap-2">
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
              {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add Station"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
