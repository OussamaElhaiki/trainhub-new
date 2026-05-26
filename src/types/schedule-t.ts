import { z } from "zod"
import { ScheduleStatus } from "@/constants/status"

export const scheduleFormSchema = z
  .object({
    trainNumber: z.string().min(1, "Train number is required"),
    departureTime: z.string().min(1, "Departure time is required").regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid datetime"),
    platform: z.string().min(1, "Platform is required"),
    carriages: z.number().min(1, "Min 1 carriage").max(20, "Max 20 carriages"),
    seats: z.number().min(10, "Min 10 seats").max(500, "Max 500 seats"),
    arrivalStation: z.string().min(1, "Arrival station is required"),
    arrivalTime: z.string().min(1, "Arrival time is required").regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid datetime"),
    arrivalDepartureTime: z.string().min(1, "Departure time from arrival station is required").regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid datetime"),
    status: z.nativeEnum(ScheduleStatus),
  })
  .refine((data) => data.arrivalTime !== data.departureTime, {
    message: "Arrival time must differ from departure time from Vilnius",
    path: ["arrivalTime"],
  })
  .refine((data) => data.arrivalTime !== data.arrivalDepartureTime, {
    message: "Arrival time must differ from departure time from arrival station",
    path: ["arrivalTime"],
  })

export type IScheduleForm = z.infer<typeof scheduleFormSchema>

export type ISchedule = IScheduleForm & { id: string }

export const scheduleSearchSchema = z.object({
  trainNumber: z.string().optional(),
  arrivalStation: z.string().optional(),
  status: z.enum(["all", ScheduleStatus.OnTime, ScheduleStatus.Delayed, ScheduleStatus.Cancelled, ScheduleStatus.Archived]),
})

export type IScheduleSearch = z.infer<typeof scheduleSearchSchema>
