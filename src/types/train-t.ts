import { z } from "zod"

export const trainFormSchema = z.object({
  trainNumber: z
    .string()
    .min(1, "Train number is required")
    .max(20, "Train number is too long")
    .regex(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9\-]+$/, "Train number must contain both letters and numbers (e.g. IC-001)"),
})

export type ITrainForm = z.infer<typeof trainFormSchema>

export type ITrain = {
  id: string
  trainNumber: string
}
