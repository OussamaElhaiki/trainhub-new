import { connectMongoose } from "@/utils/mongoose-client"

export async function GET() {
  try {
    await connectMongoose()
    return Response.json({ connected: true })
  } catch (error) {
    return Response.json(
      { connected: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
