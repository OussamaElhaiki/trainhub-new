"use server"

import { createStation, updateStation } from "@/lib/station-db"
import { stationFormSchema } from "@/types/station-t"
import type { IState } from "@/types/action-t"
import z from "zod"

export async function stationAction(_prev: IState, formData: FormData): Promise<IState> {
  const id = String(formData.get("id") ?? "")
  const raw = {
    name: formData.get("name"),
  }

  const result = stationFormSchema.safeParse(raw)
  if (!result.success) {
    return {
      isSaved: false,
      errors: z.flattenError(result.error).fieldErrors as Record<string, string[]>,
      fields: { name: String(raw.name ?? "") },
    }
  }

  const { name } = result.data

  if (id.length > 0) {
    const station = await updateStation(id, { name })
    if (station === "duplicate") return { isSaved: false, message: "A station with this name already exists" }
    if (!station) return { isSaved: false, message: "Station not found" }
  } else {
    const station = await createStation({ name })
    if (station === "duplicate") return { isSaved: false, message: "A station with this name already exists" }
  }

  return { isSaved: true }
}
