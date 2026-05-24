import { getSchedules } from "@/lib/schedule-db"
import { StationDeparturesView } from "@/components/stations/station-departures-view"

export default async function StationDeparturesPage() {
  const schedules = await getSchedules()
  return <StationDeparturesView schedules={schedules} />
}
