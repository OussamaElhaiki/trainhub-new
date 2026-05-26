import { Label } from "@/components/ui/label"

interface IProps {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField(props: IProps) {
  const { label, error, children } = props
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}