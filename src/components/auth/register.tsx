"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { signupAction } from "@/actions/signup-action"
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

export function RegisterForm(props: IProps) {
  const { lang, dict } = props
  const [state, action] = useActionState<IState, FormData>(signupAction, INITIAL)

  if (state.isSaved) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-green-500">{state.message}</p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/${lang}/signin`}>{dict.auth.signIn}</Link>
        </Button>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Napo" defaultValue={state.fields?.name ?? ""} />
        {state.errors?.name && (
          <p className="text-xs text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

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

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" />
        {state.errors?.confirmPassword && (
          <p className="text-xs text-destructive">{state.errors.confirmPassword[0]}</p>
        )}
      </div>

      {state.message && !state.isSaved && (
        <p className="text-xs text-destructive">{state.message}</p>
      )}

      <SubmitButton label={dict.auth.createAccount} pending={dict.auth.creatingAccount} />

      <p className="text-center text-xs text-muted-foreground">
        {dict.auth.haveAccount}{" "}
        <Link href={`/${lang}/signin`} className="text-primary hover:underline">
          {dict.auth.signIn}
        </Link>
      </p>
    </form>
  )
}
