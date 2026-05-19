export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">Welcome to TrainHub</h1>
      <p className="text-xl text-foreground mb-8">
        Vilnius Railway Station Schedule Management System
      </p>
      <p className="text-lg text-muted-foreground max-w-2xl">
        Navigate through the menu above to view train schedules, stations, routes, and more.
      </p>
    </div>
  )
}