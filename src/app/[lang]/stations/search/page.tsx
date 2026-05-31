import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { StationSearchView } from "@/components/stations/station-search-view"
import type { IStation } from "@/types/station-t"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ station?: string }>
}

export default async function StationSearchPage(props: IProps) {
  const { lang } = await props.params
  const { station = "" } = await props.searchParams
  const [stations, schedules, dict] = await Promise.all([
    getApi<IStation[]>("/api/stations").then((r) => r ?? []),
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <StationSearchView stations={stations} schedules={schedules} selected={station} dict={dict} />
}
