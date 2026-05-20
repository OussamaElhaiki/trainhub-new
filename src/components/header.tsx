import Image from "next/image"
import Link from "next/link"
import { Nav } from "./nav"

export function Header() {
  return (
    <header className="bg-background/30 backdrop-blur-md border-b border-border w-full relative z-50">
      <div className="flex items-center w-full px-6 py-3">
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
          <span className="text-2xl font-bold text-white tracking-tight">
            TrainHub
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
