import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { TrainScheduleView } from "@/components/trains/train-schedule-view"
import type { ITrain } from "@/types/train-t"
import type { ISchedule } from "@/types/schedule-t"
import type { IStation } from "@/types/station-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function TrainSchedulePage(props: IProps) {
  const { lang } = await props.params
  const [trains, schedules, stations, dict] = await Promise.all([
    getApi<ITrain[]>("/api/trains").then((r) => r ?? []),
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getApi<IStation[]>("/api/stations").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <TrainScheduleView trains={trains} schedules={schedules} stations={stations} dict={dict} />
}
