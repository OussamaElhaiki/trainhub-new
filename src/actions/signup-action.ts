"use server"

import { auth } from "@/utils/auth"
import { registerSchema } from "@/dto/register-dto"
import { headers } from "next/headers"
import type { IState } from "@/types/action-t"
import z from "zod"

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
      errors: z.flattenError(result.error).fieldErrors as unknown as Record<string, string[]>,
      fields: {
        name: String(raw.name ?? ""),
        email: String(raw.email ?? ""),
      },
    }
  }

  const { name, email, password } = result.data

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    })
  } catch (error) {
    console.error("Sign up error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    if (errorMessage.includes("already exists") || errorMessage.includes("email")) {
      return {
        isSaved: false,
        errors: { email: ["This email is already registered"] },
        message: "Failed to sign up",
      }
    }

    if (errorMessage.includes("Password too short") || errorMessage.includes("Password is too short")) {
      return {
        isSaved: false,
        errors: { password: ["Password must be at least 8 characters long"] },
        message: "Password is too short",
      }
    }

    return {
      isSaved: false,
      message: errorMessage || "Failed to sign up",
    }
  }

  return { isSaved: true, message: "Account created successfully!" }
}
