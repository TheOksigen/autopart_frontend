"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Remove DarkReader attributes that cause hydration issues
    const cleanup = () => {
      document.documentElement.removeAttribute('data-darkreader-mode')
      document.documentElement.removeAttribute('data-darkreader-scheme')
      const elements = document.querySelectorAll('[data-darkreader-inline-stroke]')
      elements.forEach((el) => {
        el.removeAttribute('data-darkreader-inline-stroke')
        el.removeAttribute('style')
      })
    }

    cleanup()
    setMounted(true)

    return cleanup
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange
      {...props}
    >
      {mounted ? children : null}
    </NextThemesProvider>
  )
}
