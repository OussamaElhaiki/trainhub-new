import { getStations } from "@/lib/station-db"
import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { StationSearchView } from "@/components/stations/station-search-view"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ station?: string }>
}

export default async function StationSearchPage(props: IProps) {
  const { lang } = await props.params
  const { station = "" } = await props.searchParams
  const [stations, schedules, dict] = await Promise.all([getStations(), getSchedules(), getDictionary(lang)])
  return <StationSearchView stations={stations} schedules={schedules} selected={station} dict={dict} />
}
