import { model, models, Schema, Model, Types } from "mongoose"
import type { WithStringId } from "@/models/model-t"

interface IStationDoc {
  name: string
}

type IReturnType = WithStringId<IStationDoc>

const stationSchema = new Schema<IStationDoc>(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: false,
    collection: "stations",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IStationDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const StationModel: Model<IStationDoc> =
  models.Station || model("Station", stationSchema)
