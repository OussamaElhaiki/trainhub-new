import { getTrains } from "@/lib/train-db"

export async function GET() {
  const trains = await getTrains()
  return Response.json({ count: trains.length })
}
