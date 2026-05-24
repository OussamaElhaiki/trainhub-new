import { getSchedules } from "@/lib/schedule-db"
import { StationArrivalsView } from "@/components/stations/station-arrivals-view"

export default async function ArrivalTimesPage() {
  const schedules = await getSchedules()
  return <StationArrivalsView schedules={schedules} />
}
