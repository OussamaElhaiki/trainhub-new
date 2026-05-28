"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/utils/auth-client"
import { Button } from "@/components/ui/button"

interface IProps {
  label: string
}

export function SignOutButton(props: IProps) {
  const { label } = props
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleSignOut}>
      {label}
    </Button>
  )
}
