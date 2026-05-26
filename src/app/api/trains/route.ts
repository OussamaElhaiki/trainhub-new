import { getTrains, createTrain } from "@/lib/train-db"
import { trainFormSchema } from "@/types/train-t"
import type { ITrainForm } from "@/types/train-t"

export async function GET() {
  const trains = await getTrains()
  return Response.json(trains)
}

export async function POST(request: Request) {
  const body: ITrainForm = await request.json()
  const result = trainFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const train = await createTrain(body)
  if (train === "duplicate") {
    return Response.json({ error: "duplicate" }, { status: 409 })
  }
  return Response.json(train, { status: 201 })
}
