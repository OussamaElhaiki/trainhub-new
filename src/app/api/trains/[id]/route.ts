import { updateTrain, deleteTrain } from "@/lib/train-db"
import { trainFormSchema } from "@/types/train-t"
import type { ITrainForm } from "@/types/train-t"
import z from "zod"

interface IParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IParams) {
  const { id } = await props.params
  const body: ITrainForm = await request.json()
  const result = trainFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: z.flattenError(result.error) }, { status: 400 })
  }
  const train = await updateTrain(id, body)
  if (train === "duplicate") return Response.json({ error: "duplicate" }, { status: 409 })
  if (!train) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json(train)
}

export async function DELETE(_request: Request, props: IParams) {
  const { id } = await props.params
  const ok = await deleteTrain(id)
  if (!ok) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ success: true })
}
