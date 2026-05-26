import Image from "next/image"
import Link from "next/link"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { Nav } from "./nav"
import { AuthNav } from "./auth-nav"
import { NavSearch } from "./nav-search/nav-search"

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() })
  const role = session?.user.role

  return (
    <header className="bg-background/30 backdrop-blur-md border-b border-border w-full relative z-50">
      <div className="flex items-center w-full px-6 py-3 gap-4">
        <Link
          href="/"
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

        {session && <Nav role={role} />}

        <div className="ml-auto flex items-center gap-4">
          {session && <NavSearch />}
          <AuthNav session={session} />
        </div>
      </div>
    </header>
  )
}
