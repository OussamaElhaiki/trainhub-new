import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { TrainSearchView } from "@/components/trains/train-search-view"
import type { ITrain } from "@/types/train-t"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ train?: string }>
}

export default async function TrainSearchPage(props: IProps) {
  const { lang } = await props.params
  const { train: trainNumber = "" } = await props.searchParams
  const [trains, schedules, dict] = await Promise.all([
    getApi<ITrain[]>("/api/trains").then((r) => r ?? []),
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <TrainSearchView trains={trains} schedules={schedules} selected={trainNumber} dict={dict} />
}
