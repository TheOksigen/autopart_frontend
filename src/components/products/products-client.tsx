'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchProducts, fetchManufacturers } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Package2, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  OemNo: string
  codeOfProduct: string
  manufacturer: string
  priceWithKDV: number
  priceWithOutKDV: number
  stock: boolean
  description?: string
  image?: string
  discouisnt?: number
  iskonto?: string
}

interface ProductsResponse {
  products: Product[]
  totalPages: number
  currentPage: number
  totalItems: number
}

export function ProductsClient() {
  const [mounted, setMounted] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [filters, setFilters] = useState({
    search: '',
    manufacturer: 'all',
    inStock: 'all',
    page: 1
  })

  useEffect(() => {
    setMounted(true)
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const addToCart = (product: any) => {
    const updatedCart = [...cart, { ...product, image: product.image || null }]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleSearchInputChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      search: value,
      page: 1 
    }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()    
    setFilters(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  const { data: manufacturersData } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: fetchManufacturers,
    enabled: mounted,
  })

  const { 
    data: productsData, 
    isLoading: isLoadingProducts,
    isError,
  } = useQuery<ProductsResponse>({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts({
      page: filters.page,
      limit: 40,
      search: filters.search || undefined,
      manufacturer: filters.manufacturer === 'all' ? undefined : filters.manufacturer,
      inStock: filters.inStock === 'all' ? undefined : filters.inStock === 'true',
    }),
    enabled: mounted,
  })

  console.log(productsData?.products)

  if (!mounted) {
    return (
      <div className="container mx-auto py-32 text-center">
        <Loading size="lg" message="Initializing..." />
      </div>
    )
  }

  const renderFilters = () => (
    <div className="container mx-auto">
      <form onSubmit={handleSearch} className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Products
            </label>
            <Input
              value={filters.search}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              placeholder="Name or OEM number..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Manufacturer
            </label>
            <Select
              value={filters.manufacturer}
              onValueChange={(value) => handleFilterChange('manufacturer', value)}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="All Manufacturers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                {manufacturersData?.map((manufacturer: { id: string; name: string }) => (
                  <SelectItem key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Stock Status
            </label>
            <Select
              value={filters.inStock}
              onValueChange={(value) => handleFilterChange('inStock', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="true">In Stock</SelectItem>
                <SelectItem value="false">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full" size="lg">
              {isLoadingProducts ? (
                <>
                  <Loading size="sm" message="Searching..." className="mr-2" />
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )

  const renderProducts = () => {
    if (isLoadingProducts) {
      return (
        <div className="container mx-auto">
          <Loading message="Loading products..." />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="container mx-auto">
          <div className="rounded-lg border bg-card/50 p-16 text-center">
            <Package2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Error Loading Products</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Failed to load products. Please try again later.
            </p>
          </div>
        </div>
      )
    }

    if (!productsData?.products?.length) {
      return (
        <div className="container mx-auto">
          <div className="rounded-lg border bg-card/50 p-16 text-center">
            <Package2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No Products Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        </div>
      )
    }


    console.log(productsData.products)
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData?.products?.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden transition-colors hover:bg-accent/40">
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardHeader className="flex flex-row items-center space-x-4">
                {product.image && (
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      className="object-cover rounded-lg" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardTitle className="space-y-2">
                  <span className="text-lg leading-tight line-clamp-2">{product.name}</span>
                  <Badge 
                    variant={product.stock ? "default" : "secondary"}
                    className={cn(
                      "transition-colors",
                      product.stock ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""
                    )}
                  >
                    {product.stock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">OEM:</span>
                    <span className="text-muted-foreground">{product.OemNo.slice(0, 20)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">Code:</span>
                    <span className="text-muted-foreground">{product.codeOfProduct}....</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">Manufacturer:</span>
                    <span className="text-muted-foreground">{product.manufacturer}</span>
                  </p>
                  {product.iskonto && (
                    <p className="flex items-center gap-2">
                      <span className="font-medium min-w-20">Discount:</span>
                      <span className="text-muted-foreground">{product.iskonto}</span>
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Price (excl. KDV)</p>
                  <p className="text-lg font-semibold">
                  ₺{product.priceWithOutKDV.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-muted-foreground">Price (incl. KDV)</p>
                  <p className="text-xl font-bold text-primary">
                  ₺{product.priceWithKDV.toFixed(2)}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => addToCart(product)}
                  disabled={!product.stock}
                  className="ml-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderPagination = () => {
    if (!productsData || productsData.totalPages <= 1) return null

    return (
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={filters.page === 1 || isLoadingProducts}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="text-sm">
            <span className="px-3 py-1 rounded-md bg-primary/10">
              {filters.page}
            </span>
            <span className="text-muted-foreground mx-3">of</span>
            <span className="px-3 py-1 rounded-md bg-primary/10">
              {productsData.totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={filters.page === productsData.totalPages || isLoadingProducts}
            className="gap-2"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {renderFilters()}
      {renderProducts()}
      {renderPagination()}
    </div>
  )
}
