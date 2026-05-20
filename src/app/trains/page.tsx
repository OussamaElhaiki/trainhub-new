import { getApi } from "@/utils/server-api"
import { AllTrainsView } from "@/components/trains/all-trains-view"
import type { ITrain } from "@/types/train-t"

export default async function AllTrainsPage() {
  const trains = await getApi<ITrain[]>("/api/trains") ?? []
  return <AllTrainsView trains={trains} />
}
