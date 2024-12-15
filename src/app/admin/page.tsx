'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchProducts, fetchManufacturers, verify } from '@/lib/api'
import { Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {    
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    
    const checkAdminRole = async () => {     
      try {        
        const userData = await verify(token)
        setIsAdmin(userData.role === 'admin')        
        if (userData.role !== 'admin') {
          router.push('/admin')
        }
      } catch (error) {        
        localStorage.removeItem('token')
        router.push('/login')
      }
    }

    checkAdminRole()
  }, [router])

    const { 
    data: productsData, 
    isLoading: isProductsLoading 
  } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: () => {
      const token = localStorage.getItem('token')
      return fetchProducts({ limit: 100 }, token || '')
    },
    enabled: isAdmin
  })

    const { 
    data: manufacturersData, 
    isLoading: isManufacturersLoading 
  } = useQuery({
    queryKey: ['adminManufacturers'],
    queryFn: () => {
      const token = localStorage.getItem('token')
      return fetchManufacturers(token || '')
    },
    enabled: isAdmin
  })

    if (!isAdmin || isProductsLoading || isManufacturersLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{productsData?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Manufacturers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{manufacturersData?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => router.push('/products/new')}
              className="w-full"
            >
              Add New Product
            </Button>
            <Button 
              onClick={() => router.push('/manufacturers/new')}
              className="w-full"
            >
              Add New Manufacturer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}