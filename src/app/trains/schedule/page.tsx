import { getTrains } from "@/lib/train-db"
import { getSchedules } from "@/lib/schedule-db"
import { getStations } from "@/lib/station-db"
import { TrainScheduleView } from "@/components/trains/train-schedule-view"

export default async function TrainSchedulePage() {
  const [trains, schedules, stations] = await Promise.all([
    getTrains(),
    getSchedules(),
    getStations(),
  ])
  return <TrainScheduleView trains={trains} schedules={schedules} stations={stations} />
}
