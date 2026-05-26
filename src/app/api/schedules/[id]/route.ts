import { updateSchedule, deleteSchedule } from "@/lib/schedule-db"
import { scheduleFormSchema } from "@/types/schedule-t"
import type { IScheduleForm } from "@/types/schedule-t"

type IProps = {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IProps) {
  const { id } = await props.params
  const body: IScheduleForm = await request.json()
  const result = scheduleFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const schedule = await updateSchedule(id, body)
  if (!schedule) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json(schedule)
}

export async function DELETE(_request: Request, props: IProps) {
  const { id } = await props.params
  const ok = await deleteSchedule(id)
  if (!ok) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ success: true })
}
