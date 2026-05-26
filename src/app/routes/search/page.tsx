import { getSchedules } from "@/lib/schedule-db"
import { getUniqueDestinations } from "@/lib/train-utils"
import { RouteSearchView } from "@/components/routes/route-search-view"

interface IProps {
  searchParams: Promise<{ destination?: string }>
}

export default async function RouteSearchPage(props: IProps) {
  const { destination = "" } = await props.searchParams
  const schedules = await getSchedules()
  const destinations = getUniqueDestinations(schedules)
  return <RouteSearchView schedules={schedules} destinations={destinations} selected={destination} />
}
