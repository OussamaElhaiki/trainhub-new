"use client"

import { useState } from "react"

export function useDialogForm(onClose: () => void) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) {
      onClose()
      setServerError(null)
    }
  }

  return { open, serverError, setServerError, handleOpenChange }
}