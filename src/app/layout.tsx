import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { ReactNode } from "react"
import { StoreProvider } from "@/components/providers/store-provider"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Train Schedule System",
  description: "Track and view train schedules departing from Vilnius railway station."
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="lt" className={cn("dark font-sans", geist.variable)} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
        <StoreProvider>
          <Header />
          <main className="container mx-auto max-w-screen-xl flex-1 px-4 py-8 relative z-0">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}