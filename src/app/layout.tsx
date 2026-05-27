import type { Metadata } from "next"
import "./globals.css"
import type { ReactNode } from "react"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "TrainHub",
  description: "Track and view train schedules departing from Vilnius railway station.",
}

interface IProps {
  children: ReactNode
}

export default function RootLayout(props: IProps) {
  const { children } = props

  return (
    <html suppressHydrationWarning>
      <body className={cn("dark font-sans bg-background text-foreground overflow-x-hidden", geist.variable)}>
        {children}
      </body>
    </html>
  )
}
