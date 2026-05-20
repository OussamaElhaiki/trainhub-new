import { connectMongoose } from "@/utils/mongoose-client"
import { TrainModel } from "@/models/train"
import type { ITrain, ITrainForm } from "@/types/train-t"

export async function getTrains(): Promise<ITrain[]> {
  await connectMongoose()
  const docs = await TrainModel.find().sort({ trainNumber: 1 }).lean()
  return docs.map((doc) => ({
    id: String(doc._id),
    trainNumber: doc.trainNumber,
  }))
}

export async function createTrain(data: ITrainForm): Promise<ITrain> {
  await connectMongoose()
  const doc = await TrainModel.create(data)
  return { id: String(doc._id), trainNumber: doc.trainNumber }
}

export async function updateTrain(id: string, data: ITrainForm): Promise<ITrain | null> {
  await connectMongoose()
  const doc = await TrainModel.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!doc) return null
  return { id: String(doc._id), trainNumber: doc.trainNumber }
}

export async function deleteTrain(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await TrainModel.findByIdAndDelete(id)
  return !!result
}
