import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/utils/auth"
import { Role } from "@/constants/role"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.match(/^\/(en|lt)\/admin/)) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (session?.user.role !== Role.Administrator) {
    throw new Error("You do not have permission to access this page.")
  }

  return NextResponse.next()
}
