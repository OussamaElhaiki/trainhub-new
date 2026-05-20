"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { trainFormSchema } from "@/types/train-t"
import type { ITrain, ITrainForm } from "@/types/train-t"

interface IProps {
  train?: ITrain
  trigger?: React.ReactNode
}

export function TrainFormDialog(props: IProps) {
  const { train, trigger } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const isEdit = !!train

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ITrainForm>({
    resolver: zodResolver(trainFormSchema),
    defaultValues: { trainNumber: train?.trainNumber ?? "" },
  })

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      reset({ trainNumber: train?.trainNumber ?? "" })
      setServerError(null)
    }
  }

  async function onSubmit(data: ITrainForm) {
    setServerError(null)
    const json = isEdit
      ? await putApi(`/api/trains/${train.id}`, data)
      : await postApi("/api/trains", data)

    if (json?.error) {
      const codes: Record<string, string> = {
        duplicate: "This train number already exists",
        not_found: "Train not found",
      }
      setServerError(codes[json.error] ?? "Something went wrong")
      return
    }

    setOpen(false)
    reset()
    router.refresh()
  }

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
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
