import { getTrains, createTrain } from "@/lib/train-db"
import { trainFormSchema } from "@/types/train-t"
import { TrainModel } from "@/models/train"
import { connectMongoose } from "@/utils/mongoose-client"

export async function GET() {
  const trains = await getTrains()
  return Response.json(trains)
}

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const result = trainFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  await connectMongoose()
  const existing = await TrainModel.findOne({ trainNumber: result.data.trainNumber })
  if (existing) {
    return Response.json({ error: "duplicate" }, { status: 409 })
  }
  const train = await createTrain(result.data)
  return Response.json(train, { status: 201 })
}
