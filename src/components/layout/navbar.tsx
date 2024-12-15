'use client'

import Link from 'next/link'
import { useEffect, useState, use } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Sun, Moon } from 'lucide-react'
import { logout, isAuthenticated } from '@/lib/auth'


export function Navbar() {  
  const authState = use(isAuthenticated())
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }

    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem('cart')
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [theme, resolvedTheme])

  const toggleTheme = () => {
    console.log('Current theme before toggle:', theme)
    setTheme(theme === 'dark' ? 'light' : 'dark')
    console.log('New theme after toggle:', theme)
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Auto Parts</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/products"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Products
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 flex items-center justify-center"
          >
            {mounted && (
              theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )
            )}
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </Button>

          { authState
            ? (<Button onClick={logout}>Logout</Button>) 
            : (<Button asChild><Link href="/login">Login</Link></Button>)}
        </div>
      </div>
    </header>
  )
}
