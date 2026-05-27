import { getTrains } from "@/lib/train-db"
import { getSchedules } from "@/lib/schedule-db"
import { getDictionary } from "@/lib/dictionary"
import { TrainSearchView } from "@/components/trains/train-search-view"

interface IProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ train?: string }>
}

export default async function TrainSearchPage(props: IProps) {
  const { lang } = await props.params
  const { train: trainNumber = "" } = await props.searchParams
  const [trains, schedules, dict] = await Promise.all([getTrains(), getSchedules(), getDictionary(lang)])
  return <TrainSearchView trains={trains} schedules={schedules} selected={trainNumber} dict={dict} />
}
