import { model, models, Schema, Model, Types } from "mongoose"
import type { WithStringId } from "@/models/model-t"
import type { IScheduleForm } from "@/types/schedule-t"
import { ScheduleStatus } from "@/constants/status"

type IScheduleDoc = IScheduleForm

type IReturnType = WithStringId<IScheduleDoc>

const scheduleSchema = new Schema<IScheduleDoc>(
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
      enum: Object.values(ScheduleStatus),
      default: ScheduleStatus.OnTime,
    },
  },
  {
    timestamps: false,
    collection: "schedules",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IScheduleDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const ScheduleModel: Model<IScheduleDoc> =
  models.Schedule || model("Schedule", scheduleSchema)
