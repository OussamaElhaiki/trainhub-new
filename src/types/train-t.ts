import { z } from "zod"

export const trainSchema = z.object({
  id: z.string(),
  trainNumber: z.string().min(1, "Train number is required"),
  departureTime: z.string().regex(/^\d{2}:\d{2}$/, "Format must be HH:MM"),
  platform: z.string().min(1, "Platform is required"),
  carriages: z.number().min(1, "Must have at least 1 carriage"),
  seats: z.number().min(1, "Must have at least 1 seat"),
  arrivalStation: z.string().min(1, "Arrival station is required"),
  arrivalTime: z.string().regex(/^\d{2}:\d{2}$/, "Format must be HH:MM"),
  status: z.enum(["on-time", "delayed", "cancelled"]).default("on-time"),
})

export type ITrain = z.infer<typeof trainSchema>

export const trainSearchSchema = z.object({
  trainNumber: z.string().optional(),
  platform: z.string().optional(),
  arrivalStation: z.string().optional(),
  status: z.enum(["all", "on-time", "delayed", "cancelled"]),
})

export type ITrainSearch = z.infer<typeof trainSearchSchema>
