'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-teal-accent text-navy-deep hover:bg-teal-glow hover:shadow-lg hover:shadow-teal-glow active:scale-95',
    secondary: 'bg-slate-dark text-white border-2 border-slate-medium hover:border-teal-accent hover:bg-slate-medium',
    danger: 'bg-error-red text-white hover:bg-red-600 active:scale-95',
    ghost: 'bg-transparent text-slate-light border-2 border-slate-medium hover:border-slate-light hover:text-white',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        backgroundColor: variant === 'primary' ? 'var(--teal-accent)' : undefined,
        color: variant === 'primary' ? 'var(--navy-deep)' : undefined,
        borderColor: variant === 'secondary' || variant === 'ghost' ? 'var(--slate-medium)' : undefined,
      }}
    >
      {children}
    </button>
  )
}

