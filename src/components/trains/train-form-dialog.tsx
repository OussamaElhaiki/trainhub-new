"use client"

import { useActionState, useEffect } from "react"
import { useDialogForm } from "@/hooks/use-dialog-form"
import { trainAction } from "@/actions/train-action"
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
import type { ITrain } from "@/types/train-t"

interface IProps {
  train?: ITrain
  onSuccess?: () => void
  trigger?: React.ReactNode
}

const INITIAL_STATE = { isSaved: false }

export function TrainFormDialog(props: IProps) {
  const { train, onSuccess, trigger } = props
  const isEdit = !!train

  const [state, action, isPending] = useActionState<IState, FormData>(trainAction, INITIAL_STATE)
  const { open, handleOpenChange } = useDialogForm(() => {})

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
            {isEdit ? <><PencilIcon className="size-3.5" /> Edit</> : <><PlusIcon className="size-3.5" /> Add Train</>}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Train" : "Add Train"}</DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-4 pt-1">
          {train && <input type="hidden" name="id" value={train.id} />}

          <div className="space-y-1.5">
            <Label htmlFor="trainNumber">Train number</Label>
            <Input
              id="trainNumber"
              name="trainNumber"
              placeholder="e.g. IC-001"
              defaultValue={train?.trainNumber ?? ""}
            />
            {state.errors?.trainNumber && (
              <p className="text-xs text-destructive">{state.errors.trainNumber[0]}</p>
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
              {isPending ? "Saving…" : isEdit ? "Save changes" : "Add Train"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
