import Link from "next/link"
import { signoutAction } from "@/actions/signout-action"
import { Button } from "@/components/ui/button"
import type { auth } from "@/utils/auth"

type ISession = typeof auth.$Infer.Session

interface IProps {
  session: ISession | null
}

export function AuthNav({ session }: IProps) {
  if (!session) {
    return (
      <ul className="grid grid-flow-col w-fit gap-x-2">
        <li>
          <Button asChild variant="ghost" size="sm">
            <Link href="/signin">Sign in</Link>
          </Button>
        </li>
        <li>
          <Button asChild size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </li>
      </ul>
    )
  }

  return (
    <ul className="grid grid-flow-col w-fit gap-x-2 items-center">
      <li className="flex items-center gap-2 text-sm text-muted-foreground">
        {session.user.name}
        <span className="rounded-full border px-2 py-0.5 text-xs font-semibold capitalize border-primary/30 bg-primary/10 text-primary">
          {session.user.role}
        </span>
      </li>
      <li>
        <form action={signoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Sign out
          </Button>
        </form>
      </li>
    </ul>
  )
}