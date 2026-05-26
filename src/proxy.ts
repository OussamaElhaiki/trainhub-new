import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/utils/auth"
import { Role } from "@/constants/role"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user.role !== Role.Administrator) {
    throw new Error("You do not have permission to access this page.")
  }

  return NextResponse.next()
}
