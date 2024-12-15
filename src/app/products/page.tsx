'use client'

import { Suspense } from 'react'
import { ProductsClient } from "@/components/products/products-client"
import { Loader2 } from "lucide-react"
import { useProtectedRoute } from '@/lib/auth'
// import bg from '../../../public/bg.jpg'

function ProductsLoading() {
  return (  
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary/60" />
    </div>
  )
}

export default function ProductsPage() {
  // Protect this route
  useProtectedRoute()

  return (
    <div className="pb-16 pt-10 space-y-10">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-14 pb-8">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              AutoParts Catalog
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Find the perfect parts for your vehicle from our extensive collection of high-quality automotive components.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient />
      </Suspense>
    </div>
  )
}
