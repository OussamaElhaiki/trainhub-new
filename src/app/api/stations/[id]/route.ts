import { updateStation, deleteStation } from "@/lib/station-db"
import { stationFormSchema } from "@/types/station-t"
import type { IStationForm } from "@/types/station-t"
import z from "zod"

interface IParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IParams) {
  const { id } = await props.params
  const body: IStationForm = await request.json()
  const result = stationFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: z.flattenError(result.error) }, { status: 400 })
  }
  const station = await updateStation(id, body)
  if (station === "duplicate") return Response.json({ error: "duplicate" }, { status: 409 })
  if (!station) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json(station)
}

export async function DELETE(_request: Request, props: IParams) {
  const { id } = await props.params
  const ok = await deleteStation(id)
  if (!ok) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({ success: true })
}
