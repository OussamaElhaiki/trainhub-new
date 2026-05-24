import { getTrains } from "@/lib/train-db"
import { getStations } from "@/lib/station-db"
import { getSchedules } from "@/lib/schedule-db"
import { HomeView } from "@/components/home-view"

export default async function Home() {
  const [trains, stations, schedules] = await Promise.all([
    getTrains(),
    getStations(),
    getSchedules(),
  ])

  return (
    <HomeView
      trainCount={trains.length}
      stationCount={stations.length}
      scheduleCount={schedules.length}
      schedules={schedules}
    />
  )
}
