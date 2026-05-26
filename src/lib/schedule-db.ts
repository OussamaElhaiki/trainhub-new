import { connectMongoose } from "@/utils/mongoose-client"
import { ScheduleModel } from "@/models/schedule-model"
import type { ISchedule, IScheduleForm } from "@/types/schedule-t"

export async function getSchedules(): Promise<ISchedule[]> {
  await connectMongoose()
  const docs = await ScheduleModel.find().sort({ departureTime: 1 })
  return docs.map((doc) => doc.toJSON() as unknown as ISchedule)
}

export async function createSchedule(data: IScheduleForm): Promise<ISchedule> {
  await connectMongoose()
  const doc = await ScheduleModel.create(data)
  return doc.toJSON() as unknown as ISchedule
}

export async function updateSchedule(id: string, data: IScheduleForm): Promise<ISchedule | null> {
  await connectMongoose()
  const doc = await ScheduleModel.findByIdAndUpdate(id, data, { new: true })
  if (!doc) return null
  return doc.toJSON() as unknown as ISchedule
}

export async function deleteSchedule(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await ScheduleModel.findByIdAndDelete(id)
  return !!result
}

export async function countSchedules(): Promise<number> {
  await connectMongoose()
  return ScheduleModel.countDocuments()
}
