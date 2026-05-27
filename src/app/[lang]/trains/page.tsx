import { getTrains } from "@/lib/train-db"
import { getDictionary } from "@/lib/dictionary"
import { AllTrainsView } from "@/components/trains/all-trains-view"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function AllTrainsPage(props: IProps) {
  const { lang } = await props.params
  const [trains, dict] = await Promise.all([getTrains(), getDictionary(lang)])
  return <AllTrainsView trains={trains} dict={dict} />
}
