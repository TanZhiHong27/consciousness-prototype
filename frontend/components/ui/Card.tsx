'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
  className?: string
}

export default function Card({
  children,
  onClick,
  selected = false,
  className = '',
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${selected 
          ? 'border-teal-accent bg-navy-light shadow-lg shadow-teal-glow' 
          : 'border-slate-medium bg-navy-medium hover:border-slate-light hover:bg-navy-light'
        }
        ${onClick ? 'active:scale-98' : ''}
        ${className}
      `}
      style={{
        borderColor: selected ? 'var(--teal-accent)' : 'var(--slate-medium)',
        backgroundColor: selected ? 'var(--navy-light)' : 'var(--navy-medium)',
        boxShadow: selected ? '0 10px 40px var(--teal-glow)' : undefined,
      }}
    >
      {children}
    </div>
  )
}

