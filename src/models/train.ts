import mongoose from "mongoose"

type ITrainDocument = {
  trainNumber: string
}

const trainSchema = new mongoose.Schema<ITrainDocument>(
  {
    trainNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export const TrainModel: mongoose.Model<ITrainDocument> =
  (mongoose.models.Train as mongoose.Model<ITrainDocument>) ??
  mongoose.model<ITrainDocument>("Train", trainSchema)
