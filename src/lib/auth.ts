import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { verify } from './api'

export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('token')
  
    if (!token) return false

  try {
        await verify(token)
    return true
  } catch {
        localStorage.removeItem('token')
    return false
  }
}

export const useProtectedRoute = (allowedRoutes: string[] = ['/products']) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
            const authenticated = await isAuthenticated()

      if (!authenticated) {
                router.push('/login')
        return
      }

            if (!allowedRoutes.includes(pathname)) {
                router.push('/products')
      }
    }

    checkAuth()
  }, [router, pathname])
}

export const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
}