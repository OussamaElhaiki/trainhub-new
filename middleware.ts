import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/utils/auth"
import { Role } from "@/constants/role"

const ADMIN_PATHS = ["/trains", "/trains/schedule", "/stations", "/admin"]
const PUBLIC_PATHS = ["/", "/signin", "/signup", "/api/auth"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  const session = await auth.api.getSession({ headers: request.headers })

  if (!session) {
    if (isPublic) return NextResponse.next()
    return NextResponse.redirect(new URL("/", request.url))
  }

  const role = session.user.role
  const isAdminPath = ADMIN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  if (isAdminPath && role !== Role.Administrator) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}