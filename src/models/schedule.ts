import mongoose from "mongoose"

type IScheduleDocument = {
  trainNumber: string
  departureTime: string
  platform: string
  carriages: number
  seats: number
  arrivalStation: string
  arrivalTime: string
  arrivalDepartureTime: string
  status: "on-time" | "delayed" | "cancelled" | "archived"
}

const scheduleSchema = new mongoose.Schema<IScheduleDocument>(
  {
    trainNumber: { type: String, required: true },
    departureTime: { type: String, required: true },
    platform: { type: String, required: true },
    carriages: { type: Number, required: true },
    seats: { type: Number, required: true },
    arrivalStation: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    arrivalDepartureTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["on-time", "delayed", "cancelled", "archived"],
      default: "on-time",
    },
  },
  { timestamps: true }
)

export const ScheduleModel: mongoose.Model<IScheduleDocument> =
  (mongoose.models.Schedule as mongoose.Model<IScheduleDocument>) ??
  mongoose.model<IScheduleDocument>("Schedule", scheduleSchema)
