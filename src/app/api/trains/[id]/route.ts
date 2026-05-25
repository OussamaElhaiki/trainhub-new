import { updateTrain, deleteTrain } from "@/lib/train-db"
import { trainFormSchema } from "@/types/train-t"

interface IParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IParams) {
  const { params } = props
  const { id } = await params
  const body: unknown = await request.json()
  const result = trainFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const train = await updateTrain(id, result.data)
  if (train === "duplicate") return Response.json({ error: "duplicate" }, { status: 409 })
  if (!train) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json(train)
}

export async function DELETE(_request: Request, props: IParams) {
  const { params } = props
  const { id } = await params
  const ok = await deleteTrain(id)
  if (!ok) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ success: true })
}
