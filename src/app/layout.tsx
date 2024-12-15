import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryProvider from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Auto Parts - Premium Auto Parts Marketplace",
  description: "Find high-quality auto parts from trusted manufacturers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={cn(
        inter.variable,
        "min-h-screen bg-background font-sans antialiased",
        "selection:bg-primary/20 selection:text-primary"
      )}>
        <ThemeProvider>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              {children}
         
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
