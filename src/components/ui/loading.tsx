'use client'

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loading({ 
  message = 'Loading...', 
  size = 'md',
  className = ''
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full min-h-[200px] space-y-4 ${className}`}>
      <Loader2 
        className={`
          ${sizeClasses[size]} 
          animate-spin 
          text-primary/60
        `} 
      />
      <p className={`
        text-muted-foreground 
        ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl'}
      `}>
        {message}
      </p>
    </div>
  )
}
