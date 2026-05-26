import { getSchedules } from "@/lib/schedule-db"
import { DestinationsView } from "@/components/routes/destinations-view"

export default async function ArrivalDestinationsPage() {
  const schedules = await getSchedules()
  return <DestinationsView schedules={schedules} />
}
