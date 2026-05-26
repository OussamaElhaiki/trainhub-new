"use client"

import { useDialogForm } from "@/hooks/use-dialog-form"
import { useForm } from "react-hook-form"
import { useCrud } from "@/hooks/use-crud"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { trainFormSchema } from "@/types/train-t"
import type { ITrain, ITrainForm } from "@/types/train-t"

interface IProps {
  train?: ITrain
  onSuccess?: (train: ITrain) => void
  trigger?: React.ReactNode
}

export function TrainFormDialog(props: IProps) {
  const { train, onSuccess, trigger } = props
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ITrainForm>({
    resolver: zodResolver(trainFormSchema),
    defaultValues: { trainNumber: train?.trainNumber ?? "" },
  })
  const { open, serverError, setServerError, handleOpenChange } = useDialogForm(
  () => reset({ trainNumber: train?.trainNumber ?? "" })
)
  
  const { submit, isEdit } = useCrud({
  endpoint: "/api/trains",
  id: train?.id,
  errorCodes: {
    duplicate: "This train number already exists",
    not_found: "Train not found",
  },
  onSuccess: (json) => { handleOpenChange(false); onSuccess?.(json as ITrain) },
  setServerError,
})
  
  

  
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

        <form onSubmit={handleSubmit(submit)} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="trainNumber">Train number</Label>
            <Input
              id="trainNumber"
              placeholder="e.g. IC-001"
              {...register("trainNumber")}
            />
            {errors.trainNumber && (
              <p className="text-xs text-destructive">{errors.trainNumber.message}</p>
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
              {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add Train"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
