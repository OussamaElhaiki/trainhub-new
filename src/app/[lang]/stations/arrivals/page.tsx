import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { StationArrivalsView } from "@/components/stations/station-arrivals-view"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function ArrivalTimesPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <StationArrivalsView schedules={schedules} dict={dict} />
}
