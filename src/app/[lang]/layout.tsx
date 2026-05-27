import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/lib/dictionary"
import { DictionaryProvider } from "@/lib/dictionary-context"
import type { ReactNode } from "react"

interface IProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout(props: IProps) {
  const { children, params } = props
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <DictionaryProvider dict={dict}>
      <div className="flex flex-col min-h-screen">
        <Header lang={lang} dict={dict} />
        <main className="container mx-auto max-w-screen-xl flex-1 px-4 py-8 relative z-0">
          {children}
        </main>
        <Footer />
      </div>
    </DictionaryProvider>
  )
}
