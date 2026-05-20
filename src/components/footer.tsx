export function Footer() {
  return (
    <footer className="mt-auto py-6">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Oussama Elhaiki. All rights reserved.
      </p>
    </footer>
  )
}
