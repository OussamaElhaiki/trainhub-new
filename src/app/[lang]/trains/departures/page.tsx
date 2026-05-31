import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { DepartureScheduleView } from "@/components/trains/departure-schedule-view"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function DepartureSchedulePage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <DepartureScheduleView schedules={schedules} dict={dict} />
}
