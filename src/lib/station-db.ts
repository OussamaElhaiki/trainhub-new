import { connectMongoose } from "@/utils/mongoose-client"
import { StationModel } from "@/models/station-model"
import type { IStation, IStationForm } from "@/types/station-t"

export async function getStations(): Promise<IStation[]> {
  await connectMongoose()
  const docs = await StationModel.find().sort({ name: 1 })
  return docs.map((doc) => doc.toJSON() as unknown as IStation)
}

export async function createStation(data: IStationForm): Promise<IStation | "duplicate"> {
  await connectMongoose()
  const existing = await StationModel.findOne({ name: data.name })
  if (existing) return "duplicate"
  const doc = await StationModel.create(data)
  return doc.toJSON() as unknown as IStation
}

export async function updateStation(id: string, data: IStationForm): Promise<IStation | "duplicate" | null> {
  await connectMongoose()
  const existing = await StationModel.findOne({ name: data.name, _id: { $ne: id } })
  if (existing) return "duplicate"
  const doc = await StationModel.findByIdAndUpdate(id, data, { new: true })
  if (!doc) return null
  return doc.toJSON() as unknown as IStation
}

export async function deleteStation(id: string): Promise<boolean> {
  await connectMongoose()
  const result = await StationModel.findByIdAndDelete(id)
  return !!result
}
