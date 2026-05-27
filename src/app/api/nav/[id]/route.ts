import { updateNavItem, deleteNavItem } from "@/lib/nav-db"
import { navItemFormSchema } from "@/types/nav-t"
import type { INavItemForm } from "@/types/nav-t"
import z from "zod"

interface IParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, props: IParams) {
  const { id } = await props.params
  const body: INavItemForm = await request.json()
  const result = navItemFormSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: z.flattenError(result.error) }, { status: 400 })
  }
  const item = await updateNavItem(id, result.data)
  if (!item) return Response.json({ error: "not found" }, { status: 404 })
  return Response.json(item)
}

export async function DELETE(_request: Request, props: IParams) {
  const { id } = await props.params
  const ok = await deleteNavItem(id)
  if (!ok) return Response.json({ error: "not found" }, { status: 404 })
  return new Response(null, { status: 204 })
}
