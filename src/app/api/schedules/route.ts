import { getSchedules, createSchedule } from "@/lib/schedule-db"
import { scheduleFormSchema } from "@/types/schedule-t"
import type { IScheduleForm } from "@/types/schedule-t"
import z from "zod"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const arrivalStation = searchParams.get("arrivalStation")
  const schedules = await getSchedules()
  if (arrivalStation) {
    return Response.json(schedules.filter((s) => s.arrivalStation === arrivalStation))
  }
  return Response.json(schedules)
}

export async function POST(request: Request) {
  const body: IScheduleForm = await request.json()
  const result = scheduleFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: z.flattenError(result.error) }, { status: 400 })
  }
  const schedule = await createSchedule(body)
  return Response.json(schedule, { status: 201 })
}
