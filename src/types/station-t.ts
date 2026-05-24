import { z } from "zod"

export const stationFormSchema = z.object({
  name: z
    .string()
    .min(1, "That's too short")
    .max(40, "That's too long")
    .regex(/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ\s\-]+$/, "Station names are letters only")
})

export type IStationForm = z.infer<typeof stationFormSchema>

export type IStation = {
  id: string
  name: string
}
