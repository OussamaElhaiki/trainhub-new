import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { RouteListView } from "@/components/routes/route-list-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function TrainRoutesPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  return <RouteListView schedules={schedules} dict={dict} lang={lang} />
}
