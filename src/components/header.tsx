import { Nav } from "./nav"

export function Header() {
  return (
    <header className="bg-background border-b border-border w-full">
      <div className="flex items-center w-full px-6 py-4">
        <div className="text-3xl font-bold text-primary">
          TrainHub
        </div>
        <Nav />
      </div>
    </header>
  )
}