import { getNavItems, createNavItem } from "@/lib/nav-db"
import { navItemFormSchema } from "@/types/nav-t"
import type { INavItemForm } from "@/types/nav-t"
import z from "zod"

export async function GET() {
  const items = await getNavItems()
  return Response.json(items)
}

export async function POST(request: Request) {
  const body: INavItemForm = await request.json()
  const result = navItemFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: z.flattenError(result.error) }, { status: 400 })
  }
  const item = await createNavItem(result.data)
  return Response.json(item, { status: 201 })
}
