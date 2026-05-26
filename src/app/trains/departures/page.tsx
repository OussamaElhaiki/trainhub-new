import { getSchedules } from "@/lib/schedule-db"
import { DepartureScheduleView } from "@/components/trains/departure-schedule-view"

export default async function DepartureSchedulePage() {
  const schedules = await getSchedules()
  return <DepartureScheduleView schedules={schedules} />
}
