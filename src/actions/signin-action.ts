"use server"

import { auth } from "@/utils/auth"
import { loginSchema } from "@/utils/login-validator"
import { redirect } from "next/navigation"
import type { IState } from "@/types/action-t"

export async function signinAction(
  _prev: IState,
  formData: FormData
): Promise<IState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = loginSchema.safeParse(raw)
  if (!result.success) {
    return {
      isSaved: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      fields: { email: String(raw.email ?? "") },
    }
  }

  const { email, password } = result.data

  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  })

  if (!response.ok) {
    return { isSaved: false, message: "Invalid email or password", fields: { email } }
  }

  redirect("/")
}