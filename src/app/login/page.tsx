'use client'

import { LoginForm } from '@/components/auth/login-form'


export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          Sign in to your account
        </h1>
        <LoginForm />       
      </div>
    </div>
  )
}