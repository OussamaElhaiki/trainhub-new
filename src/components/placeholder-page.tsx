interface IProps {
  title: string
}

export function PlaceholderPage(props: IProps) {
  const { title } = props
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">Content coming soon.</p>
    </div>
  )
}
