import { updateSchedule, deleteSchedule } from "@/lib/schedule-db"
import { scheduleFormSchema } from "@/types/schedule-t"

interface IParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IParams) {
  const { params } = props
  const { id } = await params
  const body: unknown = await request.json()
  const result = scheduleFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const schedule = await updateSchedule(id, result.data)
  if (!schedule) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json(schedule)
}

export async function DELETE(_request: Request, props: IParams) {
  const { params } = props
  const { id } = await params
  const ok = await deleteSchedule(id)
  if (!ok) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ success: true })
}
