"use server"

import { createTrain, updateTrain } from "@/lib/train-db"
import { trainFormSchema } from "@/types/train-t"
import type { IState } from "@/types/action-t"
import z from "zod"

export async function trainAction(_prev: IState, formData: FormData): Promise<IState> {
  const id = String(formData.get("id") ?? "")
  const raw = {
    trainNumber: formData.get("trainNumber"),
  }

  const result = trainFormSchema.safeParse(raw)
  if (!result.success) {
    return {
      isSaved: false,
      errors: z.flattenError(result.error).fieldErrors as Record<string, string[]>,
      fields: { trainNumber: String(raw.trainNumber ?? "") },
    }
  }

  const { trainNumber } = result.data

  if (id.length > 0) {
    const train = await updateTrain(id, { trainNumber })
    if (train === "duplicate") return { isSaved: false, message: "This train number already exists" }
    if (!train) return { isSaved: false, message: "Train not found" }
  } else {
    const train = await createTrain({ trainNumber })
    if (train === "duplicate") return { isSaved: false, message: "This train number already exists" }
  }

  return { isSaved: true }
}
