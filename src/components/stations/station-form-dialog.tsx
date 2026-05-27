"use client"

import { useActionState, useEffect } from "react"
import { useDialogForm } from "@/hooks/use-dialog-form"
import { stationAction } from "@/actions/station-action"
import type { IState } from "@/types/action-t"
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
import type { IStation } from "@/types/station-t"

interface IProps {
  station?: IStation
  onSuccess?: () => void
  trigger?: React.ReactNode
}

const INITIAL_STATE = { isSaved: false }

export function StationFormDialog(props: IProps) {
  const { station, onSuccess, trigger } = props
  const isEdit = !!station

  const [state, action, isPending] = useActionState<IState, FormData>(stationAction, INITIAL_STATE)
  const { open, handleOpenChange } = useDialogForm(() => {})

  useEffect(() => {
    if (state.isSaved) {
      handleOpenChange(false)
      onSuccess?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

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

        <form action={action} className="space-y-4 pt-1">
          {station && <input type="hidden" name="id" value={station.id} />}

          <div className="space-y-1.5">
            <Label htmlFor="name">Station name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Kaunas"
              defaultValue={station?.name ?? ""}
            />
            {state.errors?.name && (
              <p className="text-xs text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          {state.message && !state.isSaved && (
            <p className="text-xs text-destructive">{state.message}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving…" : isEdit ? "Save changes" : "Add Station"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
