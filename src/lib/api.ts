const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}

export async function register(userData: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Registration failed')
  }
  return response.json()
}

export async function verify(token: string) {
  const response = await fetch(`${API_URL}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  if (!response.ok) {
    throw new Error('Verification failed')
  }
  return response.json()
}

export async function fetchProducts(params?: {
  page?: number
  limit?: number
  search?: string
  manufacturer?: string
  inStock?: boolean
}, token?: string) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)
  if (params?.manufacturer) searchParams.append('manufacturer', params.manufacturer)
  if (params?.inStock !== undefined) searchParams.append('inStock', params.inStock.toString())

  if(!token) {throw new Error('Token is required')}
console.log(searchParams.toString())
  const response = await fetch(`${API_URL}/api/products?${searchParams.toString()}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function fetchManufacturers(token: string) {
  console.log(token)
  const response = await fetch(`${API_URL}/api/manufacturers`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch manufacturers')
  }
  
  return await response.json()
}

export async function fetchProduct(id: string, token: string) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

  })
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}

export async function fetchCart(token: string) {
  const response = await fetch(`${API_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }
  return response.json()

}

export async function addToCart(token: string, productId: string, quantity: number) {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  })
  if (!response.ok) {
    throw new Error('Failed to add to cart')
  }
  return response.json()
}

export async function removeFromCart(token: string, productId: string) {
  const reponse = await fetch(`${API_URL}/api/cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  })
  if (!reponse.ok) {
    throw new Error('Failed to remove from cart')
  }
  return reponse.json()
}

