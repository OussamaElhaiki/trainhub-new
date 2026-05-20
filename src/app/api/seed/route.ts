import { connectMongoose } from "@/utils/mongoose-client"
import { TrainModel } from "@/models/train"

export async function GET() {
  await connectMongoose()
  const count = await TrainModel.countDocuments()
  return Response.json({
    message: `Database already seeded. Collection has ${count} train documents.`,
  })
}
