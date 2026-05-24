import { getStations, createStation } from "@/lib/station-db"
import { stationFormSchema } from "@/types/station-t"
import type { IStationForm } from "@/types/station-t"

export async function GET() {
  const stations = await getStations()
  return Response.json(stations)
}

export async function POST(request: Request) {
  const body: IStationForm = await request.json()
  const result = stationFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const station = await createStation(result.data)
  if (station === "duplicate") {
    return Response.json({ error: "duplicate" }, { status: 409 })
  }
  return Response.json(station, { status: 201 })
}
