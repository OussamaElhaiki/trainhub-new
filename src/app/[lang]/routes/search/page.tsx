import { getSchedules } from "@/lib/schedule-db"
import { getUniqueDestinations } from "@/lib/train-utils"
import { getDictionary } from "@/lib/dictionary"
import { RouteSearchView } from "@/components/routes/route-search-view"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ destination?: string }>
}

export default async function RouteSearchPage(props: IProps) {
  const { lang } = await props.params
  const { destination = "" } = await props.searchParams
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  const destinations = getUniqueDestinations(schedules)
  return <RouteSearchView schedules={schedules} destinations={destinations} selected={destination} dict={dict} />
}
