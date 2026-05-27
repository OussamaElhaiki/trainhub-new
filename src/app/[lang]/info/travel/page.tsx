import { getDictionary } from "@/lib/dictionary"
import { PlaceholderPage } from "@/components/placeholder-page"

interface IProps {
  params: Promise<{ lang: string }>
}

export default async function TravelInformationPage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)
  return <PlaceholderPage title={dict.nav.travelInformation} />
}
