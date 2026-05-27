import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { DestinationsView } from "@/components/routes/destinations-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function ArrivalDestinationsPage(props: IProps) {
  const { lang } = await props.params
  const [schedules, dict] = await Promise.all([getSchedules(), getDictionary(lang)])
  return <DestinationsView schedules={schedules} dict={dict} lang={lang} />
}
