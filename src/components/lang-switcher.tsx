"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales } from "@/lib/dictionary"

const labels: Record<string, string> = {
  en: "EN",
  fr: "FR",
}

interface IProps {
  lang: string
}

export function LangSwitcher(props: IProps) {
  const { lang } = props
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {locales.map((locale, i) => {
        const target = pathname.replace(`/${lang}`, `/${locale}`)
        const isActive = locale === lang
        return (
          <span key={locale} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground/50">|</span>}
            <Link
              href={target}
              className={isActive
                ? "text-primary pointer-events-none"
                : "text-muted-foreground hover:text-foreground transition-colors"}
            >
              {labels[locale]}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
