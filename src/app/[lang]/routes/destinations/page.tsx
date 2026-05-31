import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { DestinationsView } from "@/components/routes/destinations-view"
import type { ISchedule } from "@/types/schedule-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function ArrivalDestinationsPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([
    getApi<ISchedule[]>("/api/schedules").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <DestinationsView schedules={schedules} dict={dict} lang={lang} />
}
