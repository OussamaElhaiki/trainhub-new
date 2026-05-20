import { connectMongoose } from "@/utils/mongoose-client"
import { TrainModel } from "@/models/train"
import { sortByDepartureTime } from "@/lib/train-utils"
import type { ITrain } from "@/types/train-t"

export async function getTrains(): Promise<ITrain[]> {
  await connectMongoose()
  const docs = await TrainModel.find().lean()
  const trains: ITrain[] = docs.map((doc) => ({
    id: String(doc._id),
    trainNumber: doc.trainNumber,
    departureTime: doc.departureTime,
    platform: doc.platform,
    carriages: doc.carriages,
    seats: doc.seats,
    arrivalStation: doc.arrivalStation,
    arrivalTime: doc.arrivalTime,
    status: doc.status,
  }))
  return sortByDepartureTime(trains)
}
