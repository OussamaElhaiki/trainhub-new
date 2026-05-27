import Image from "next/image"
import Link from "next/link"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Nav } from "./nav"
import { AuthNav } from "./auth-nav"
import { LangSwitcher } from "./lang-switcher"
import { getNavGroups } from "@/lib/nav-db"
import type { IDictionary } from "@/lib/dictionary"

interface IProps {
  lang: string
  dict: IDictionary
}

export async function Header(props: IProps) {
  const { lang, dict } = props
  const [session, navGroups] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getNavGroups(),
  ])
  const role = session?.user.role

  return (
    <header className="bg-background/30 backdrop-blur-md border-b border-border w-full relative z-50">
      <div className="flex items-center w-full px-6 py-3 gap-4">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-3 no-underline shrink-0 visited:!text-inherit"
        >
          <Image
            src="/logo.svg"
            alt="TrainHub logo"
            width={80}
            height={34}
            className="h-12 w-auto"
            priority
          />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">Train</span><span className="text-primary">Hub</span>
          </span>
        </Link>

        <Nav lang={lang} dict={dict} role={role} navGroups={navGroups} />

        <div className="ml-auto flex items-center gap-4">
          <LangSwitcher lang={lang} />
          <AuthNav session={session} lang={lang} dict={dict} />
        </div>
      </div>
    </header>
  )
}
