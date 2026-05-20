import { getApi } from "@/utils/server-api"
import { TrainSearchView } from "@/components/trains/train-search-view"
import type { ITrain } from "@/types/train-t"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  searchParams: Promise<{ train?: string }>
}

export default async function TrainSearchPage(props: IProps) {
  const { searchParams } = props
  const { train: trainNumber } = await searchParams
  const [trains, schedules] = await Promise.all([
    getApi<ITrain[]>("/api/trains"),
    getApi<ISchedule[]>("/api/schedules"),
  ])
  return <TrainSearchView trains={trains ?? []} schedules={schedules ?? []} selected={trainNumber ?? ""} />
}
