"use server"

import { auth } from "@/utils/auth"
import { registerSchema } from "@/dto/register-dto"
import type { IState } from "@/types/action-t"

export async function signupAction(
  _prev: IState,
  formData: FormData
): Promise<IState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const result = registerSchema.safeParse(raw)
  if (!result.success) {
    return {
      isSaved: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      fields: {
        name: String(raw.name ?? ""),
        email: String(raw.email ?? ""),
      },
    }
  }

  const { name, email, password } = result.data

  const response = await auth.api.signUpEmail({
    body: { name, email, password },
    asResponse: true,
  })

  if (!response.ok) {
    const json = await response.json().catch(() => ({}))
    return {
      isSaved: false,
      message: (json as { message?: string }).message ?? "Registration failed",
    }
  }

  return { isSaved: true, message: "Account created successfully!" }
}