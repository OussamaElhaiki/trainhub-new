import { getStations } from "@/lib/station-db"
import { AllStationsView } from "@/components/stations/all-stations-view"

export default async function AllStationsPage() {
  const stations = await getStations()
  return <AllStationsView stations={stations} />
}
