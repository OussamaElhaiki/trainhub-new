import mongoose, { type Model } from "mongoose"
import type { ITrain } from "@/types/train-t"

const trainSchema = new mongoose.Schema<ITrain>(
  {
    trainNumber: { type: String, required: true },
    departureTime: { type: String, required: true },
    platform: { type: String, required: true },
    carriages: { type: Number, required: true },
    seats: { type: Number, required: true },
    arrivalStation: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["on-time", "delayed", "cancelled"],
      default: "on-time",
    },
  },
  { timestamps: true }
)

export const TrainModel: Model<ITrain> =
  mongoose.models.Train ?? mongoose.model<ITrain>("Train", trainSchema)
