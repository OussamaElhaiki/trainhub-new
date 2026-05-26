"use server"

import { createSchedule, updateSchedule } from "@/lib/schedule-db"
import { scheduleFormSchema } from "@/types/schedule-t"
import type { IState } from "@/types/action-t"
import z from "zod"

export async function scheduleAction(_prev: IState, formData: FormData): Promise<IState> {
  const id = String(formData.get("id") ?? "")
  const raw = {
    trainNumber: formData.get("trainNumber"),
    departureTime: formData.get("departureTime"),
    platform: formData.get("platform"),
    carriages: Number(formData.get("carriages")),
    seats: Number(formData.get("seats")),
    arrivalStation: formData.get("arrivalStation"),
    arrivalTime: formData.get("arrivalTime"),
    arrivalDepartureTime: formData.get("arrivalDepartureTime"),
    status: formData.get("status"),
  }

  const result = scheduleFormSchema.safeParse(raw)
  if (!result.success) {
    return {
      isSaved: false,
      errors: z.flattenError(result.error).fieldErrors as Record<string, string[]>,
    }
  }

  if (id.length > 0) {
    const schedule = await updateSchedule(id, result.data)
    if (!schedule) return { isSaved: false, message: "Schedule not found" }
  } else {
    await createSchedule(result.data)
  }

  return { isSaved: true }
}
