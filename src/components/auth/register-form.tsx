'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [registerError, setRegisterError] = useState<string | null>(null)

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push('/login')
    },
    onError: (error: Error) => {
      setRegisterError(error.message || 'Registration failed. Please try again.')
    }
  })

  const onSubmit = (data: RegisterFormData) => {
    setRegisterError(null)
    registerMutation.mutate(data)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        {registerError && (
          <div 
            role="alert" 
            className="mb-4 p-3 bg-red-100 text-red-800 rounded-md"
          >
            {registerError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="text-sm font-medium leading-none"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              {...formRegister('name')}
              placeholder="Enter your name"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p 
                role="alert" 
                className="text-sm text-red-500"
              >
                {errors.name.message}
              </p>
            )}
          </div>

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
              {...formRegister('email')}
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
              {...formRegister('password')}
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
