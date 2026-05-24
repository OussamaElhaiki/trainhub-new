import { model, models, Schema, Model, Types } from "mongoose"
import type { WithStringId } from "@/models/model-t"

interface ITrainDoc {
  trainNumber: string
}

type IReturnType = WithStringId<ITrainDoc>

const trainSchema = new Schema<ITrainDoc>(
  {
    trainNumber: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: false,
    collection: "trains",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ITrainDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const TrainModel: Model<ITrainDoc> =
  models.Train || model("Train", trainSchema)
