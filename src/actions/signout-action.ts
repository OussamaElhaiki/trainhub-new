"use server"

import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function signoutAction() {
  await auth.api.signOut({ headers: await headers() })
  redirect("/")
}