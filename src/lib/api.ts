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

export async function fetchProducts(params?: {
  page?: number
  limit?: number
  search?: string
  manufacturer?: string
  inStock?: boolean
}) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)
  if (params?.manufacturer) searchParams.append('manufacturer', params.manufacturer)
  if (params?.inStock !== undefined) searchParams.append('inStock', params.inStock.toString())

  const response = await fetch(`${API_URL}/api/products?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function fetchManufacturers() {
  const response = await fetch(`${API_URL}/api/manufacturers`)
  if (!response.ok) {
    throw new Error('Failed to fetch manufacturers')
  }
  return response.json()
}

