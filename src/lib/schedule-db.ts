import { connectMongoose } from "@/utils/mongoose-client"
import { ScheduleModel } from "@/models/schedule"
import type { ISchedule, IScheduleForm } from "@/types/schedule-t"

function docToSchedule(doc: Record<string, unknown>): ISchedule {
  return {
    id: String(doc._id),
    trainNumber: doc.trainNumber as string,
    departureTime: doc.departureTime as string,
    platform: doc.platform as string,
    carriages: doc.carriages as number,
    seats: doc.seats as number,
    arrivalStation: doc.arrivalStation as string,
    arrivalTime: doc.arrivalTime as string,
    arrivalDepartureTime: doc.arrivalDepartureTime as string,
    status: doc.status as ISchedule["status"],
  }
}

export async function getSchedules(): Promise<ISchedule[]> {
  await connectMongoose()
  const docs = await ScheduleModel.find().sort({ departureTime: 1 }).lean()
  return docs.map((doc) => docToSchedule(doc as Record<string, unknown>))
}

export async function createSchedule(data: IScheduleForm): Promise<ISchedule> {
  await connectMongoose()
  const doc = await ScheduleModel.create(data)
  return docToSchedule(doc.toObject() as Record<string, unknown>)
}

export async function updateSchedule(id: string, data: IScheduleForm): Promise<ISchedule | null> {
  await connectMongoose()
  const doc = await ScheduleModel.findByIdAndUpdate(id, data, { new: true }).lean()
  if (!doc) return null
  return docToSchedule(doc as Record<string, unknown>)
}

export async function deleteSchedule(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await ScheduleModel.findByIdAndDelete(id)
  return !!result
}
