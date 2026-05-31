import { getApi } from "@/utils/server-api"
import { getDictionary } from "@/lib/dictionary"
import { AllTrainsView } from "@/components/trains/all-trains-view"
import type { ITrain } from "@/types/train-t"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function AllTrainsPage(props: IProps) {
  const { lang } = await props.params
  const [trains, dict] = await Promise.all([
    getApi<ITrain[]>("/api/trains").then((r) => r ?? []),
    getDictionary(lang),
  ])
  return <AllTrainsView trains={trains} dict={dict} />
}
