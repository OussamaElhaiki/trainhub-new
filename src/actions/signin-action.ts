"use server"

import { auth } from "@/utils/auth"
import { loginSchema } from "@/utils/login-validator"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { IState } from "@/types/action-t"
import z from "zod"

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
      errors: z.flattenError(result.error).fieldErrors as unknown as Record<string, string[]>,
      fields: { email: String(raw.email ?? "") },
    }
  }

  const { email, password } = result.data

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    })
  } catch (error) {
    console.error("Sign in error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    if (errorMessage.includes("Invalid email") || errorMessage.includes("user not found")) {
      return {
        isSaved: false,
        errors: { email: ["User not found."] },
        message: "Failed to sign in",
        fields: { email },
      }
    }

    if (errorMessage.includes("Invalid password") || errorMessage.includes("password")) {
      return {
        isSaved: false,
        errors: { password: ["Incorrect password."] },
        message: "Failed to sign in",
      }
    }

    return {
      isSaved: false,
      message: errorMessage || "Failed to sign in",
    }
  }

  redirect("/")
}
