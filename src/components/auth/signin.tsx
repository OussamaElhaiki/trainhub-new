"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { signinAction } from "@/actions/signin-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { IState } from "@/types/action-t"
import type { IDictionary } from "@/lib/dictionary"

const INITIAL: IState = { isSaved: false }

interface IProps {
  lang: string
  dict: IDictionary
}

function SubmitButton(props: { label: string; pending: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? props.pending : props.label}
    </Button>
  )
}

export function SignInForm(props: IProps) {
  const { lang, dict } = props
  const [state, action] = useActionState<IState, FormData>(signinAction, INITIAL)

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="napo@panko.lt" defaultValue={state.fields?.email ?? ""} />
        {state.errors?.email && (
          <p className="text-xs text-destructive">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="••••••••" />
        {state.errors?.password && (
          <p className="text-xs text-destructive">{state.errors.password[0]}</p>
        )}
      </div>

      {state.message && (
        <p className="text-xs text-destructive">{state.message}</p>
      )}

      <SubmitButton label={dict.auth.signIn} pending={dict.auth.signingIn} />

      <p className="text-center text-xs text-muted-foreground">
        {dict.auth.noAccount}{" "}
        <Link href={`/${lang}/signup`} className="text-primary hover:underline">
          {dict.auth.signUp}
        </Link>
      </p>
    </form>
  )
}
