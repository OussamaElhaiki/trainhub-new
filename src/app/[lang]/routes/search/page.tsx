import { getApi } from "@/utils/server-api"
import { getUniqueDestinations } from "@/lib/train-utils"
import { getDictionary } from "@/lib/dictionary"
import { RouteSearchView } from "@/components/routes/route-search-view"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ destination?: string }>
}

export default async function RouteSearchPage(props: IProps) {
  const { lang } = await props.params
  const { destination = "" } = await props.searchParams
  const [schedules, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  const destinations = getUniqueDestinations(schedules)
  return <RouteSearchView schedules={schedules} destinations={destinations} selected={destination} dict={dict} />
}
