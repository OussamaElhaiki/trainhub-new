import { connectMongoose } from "@/utils/mongoose-client"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectMongoose()
    return Response.json({ success: true, message: "Connected to MongoDB" })
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
