import type { StateCreator } from "zustand"
import type { INavSlice } from "@/types/store-t"

export const createNavigationSlice: StateCreator<INavSlice> = (set) => ({
  menu: [],
  setMenu: (menu) =>
    set(() => ({
      menu,
    })),
})
