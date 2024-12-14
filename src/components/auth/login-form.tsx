'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [loginError, setLoginError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      router.push('/products')
    },
    onError: (error: Error) => {
      setLoginError(error.message || 'Login failed. Please try again.')
    }
  })

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null)
    loginMutation.mutate(data)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        {loginError && (
          <div 
            role="alert" 
            className="mb-4 p-3 bg-red-100 text-red-800 rounded-md"
          >
            {loginError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="text-sm font-medium leading-none"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p 
                role="alert" 
                className="text-sm text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p 
                role="alert" 
                className="text-sm text-red-500"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
