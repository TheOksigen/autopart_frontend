'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authenticated = await isAuthenticated()

        if (authenticated) {      
          router.replace('/products')
        } else {      
          router.replace('/login')
        }
      } catch (error) {        
        router.replace('/login')
      }
    }

    checkAuthAndRedirect()
  }, [router])  
  
  return null
}