import { getDictionary } from "@/lib/dictionary"

//throw new Error("test")
interface IProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage(props: IProps) {
  const { lang } = await props.params
  const dict = await getDictionary(lang)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">{dict.home.title}</h1>
      <p className="text-xl text-foreground mb-8">{dict.home.subtitle}</p>
      <p className="text-lg text-muted-foreground max-w-2xl">{dict.home.description}</p>
    </div>
  )
}
