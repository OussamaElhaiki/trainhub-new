"use client"

import { createContext, useContext } from "react"
import type { IDictionary } from "./dictionary"
import type { ReactNode } from "react"

const DictionaryContext = createContext<IDictionary | null>(null)

interface IProps {
  dict: IDictionary
  children: ReactNode
}

export function DictionaryProvider(props: IProps) {
  const { dict, children } = props
  return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>
}

export function useDict(): IDictionary {
  const dict = useContext(DictionaryContext)
  if (!dict) throw new Error("useDict must be used within DictionaryProvider")
  return dict
}
