import { getStations } from "@/lib/station-db"
import { getSchedules } from "@/lib/schedule-db"
import { StationSearchView } from "@/components/stations/station-search-view"

interface IProps {
  searchParams: Promise<{ station?: string }>
}

export default async function StationSearchPage(props: IProps) {
  const { station = "" } = await props.searchParams
  const [stations, schedules] = await Promise.all([getStations(), getSchedules()])
  return <StationSearchView stations={stations} schedules={schedules} selected={station} />
}
