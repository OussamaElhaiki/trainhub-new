import { connectMongoose } from "@/utils/mongoose-client"
import { TrainModel } from "@/models/train-model"
import type { ITrain, ITrainForm } from "@/types/train-t"

export async function getTrains(): Promise<ITrain[]> {
  await connectMongoose()
  const docs = await TrainModel.find().sort({ trainNumber: 1 })
  return docs.map((doc) => doc.toJSON() as unknown as ITrain)
}

export async function createTrain(data: ITrainForm): Promise<ITrain | "duplicate"> {
  await connectMongoose()
  const existing = await TrainModel.findOne({ trainNumber: data.trainNumber })
  if (existing) return "duplicate"
  const doc = await TrainModel.create(data)
  return doc.toJSON() as unknown as ITrain
}

export async function updateTrain(id: string, data: ITrainForm): Promise<ITrain | "duplicate" | null> {
  await connectMongoose()
  const existing = await TrainModel.findOne({ trainNumber: data.trainNumber, _id: { $ne: id } })
  if (existing) return "duplicate"
  const doc = await TrainModel.findByIdAndUpdate(id, data, { new: true })
  if (!doc) return null
  return doc.toJSON() as unknown as ITrain
}

export async function deleteTrain(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await TrainModel.findByIdAndDelete(id)
  return !!result
}
