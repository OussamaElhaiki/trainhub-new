import { z } from "zod"
import { Role } from "@/constants/role"

export const navItemFormSchema = z.object({
  key: z.string().min(1),
  slug: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
  parentKey: z.string().optional(),
  order: z.number().int().min(0),
})

export type INavItemForm = z.infer<typeof navItemFormSchema>

export type INavItem = INavItemForm & { id: string }

export type INavGroup = {
  key: string
  children: INavItem[]
}
