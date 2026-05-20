import { connectMongoose } from "@/utils/mongoose-client"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
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
