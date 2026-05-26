import { getTrains } from "@/lib/train-db"
import { getSchedules } from "@/lib/schedule-db"
import { TrainSearchView } from "@/components/trains/train-search-view"

interface IProps {
  searchParams: Promise<{ train?: string }>
}

export default async function TrainSearchPage(props: IProps) {
  const { train: trainNumber = "" } = await props.searchParams
  const [trains, schedules] = await Promise.all([getTrains(), getSchedules()])
  return <TrainSearchView trains={trains} schedules={schedules} selected={trainNumber} />
}
