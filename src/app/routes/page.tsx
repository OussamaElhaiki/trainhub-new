import { getSchedules } from "@/lib/schedule-db"
import { RouteListView } from "@/components/routes/route-list-view"

export default async function TrainRoutesPage() {
  const schedules = await getSchedules()
  return <RouteListView schedules={schedules} />
}
