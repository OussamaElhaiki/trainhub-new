import Link from "next/link"

export function NotFoundView() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-8xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium !text-primary-foreground no-underline hover:bg-primary/90 hover:!text-primary-foreground visited:!text-primary-foreground transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/trains"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium !text-foreground no-underline hover:bg-accent hover:!text-accent-foreground visited:!text-foreground transition-colors"
        >
          View trains
        </Link>
      </div>
    </div>
  )
}
