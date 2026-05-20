import { getSchedules, createSchedule } from "@/lib/schedule-db"
import { scheduleFormSchema } from "@/types/schedule-t"

export async function GET() {
  const schedules = await getSchedules()
  return Response.json(schedules)
}

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const result = scheduleFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const schedule = await createSchedule(result.data)
  return Response.json(schedule, { status: 201 })
}
