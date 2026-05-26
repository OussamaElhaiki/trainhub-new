import { getTrains } from "@/lib/train-db"
import { AllTrainsView } from "@/components/trains/all-trains-view"

export default async function AllTrainsPage() {
  const trains = await getTrains()
  return <AllTrainsView trains={trains} />
}
