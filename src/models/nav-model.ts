import { model, models, Schema, Model, Types } from "mongoose"
import type { WithStringId } from "@/models/model-t"
import type { INavItemForm } from "@/types/nav-t"

type INavItemDoc = INavItemForm

type IReturnType = WithStringId<INavItemDoc>

const navItemSchema = new Schema<INavItemDoc>(
  {
    key: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    role: { type: String },
    parentKey: { type: String },
    order: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: false,
    collection: "nav_items",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: INavItemDoc & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const NavItemModel: Model<INavItemDoc> =
  models.NavItem || model("NavItem", navItemSchema)
