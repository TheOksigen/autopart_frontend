'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const removeFromCart = (productToRemove: any) => {
    const updatedCart = cart.filter(product => product.id !== productToRemove.id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.priceWithKDV, 0).toFixed(2)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden transition-colors hover:bg-accent/40">
              <CardHeader>
                <CardTitle className="flex justify-between items-start gap-2">
                  <span className="text-lg leading-tight line-clamp-2">{product.name}</span>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => removeFromCart(product)}
                    className="opacity-70 hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">OEM:</span>
                    <span className="text-muted-foreground">{product.OemNo}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">Code:</span>
                    <span className="text-muted-foreground">{product.codeOfProduct}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium min-w-20">Manufacturer:</span>
                    <span className="text-muted-foreground">{product.manufacturer}</span>
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Price (excl. KDV)</p>
                  <p className="text-lg font-semibold">
                    ${product.priceWithOutKDV.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-muted-foreground">Price (incl. KDV)</p>
                  <p className="text-xl font-bold text-primary">
                    ${product.priceWithKDV.toFixed(2)}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total</h2>
            <p className="text-2xl font-bold text-primary">${calculateTotal()}</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
