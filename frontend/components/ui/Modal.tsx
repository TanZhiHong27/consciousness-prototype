'use client'

import React from 'react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'danger'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(10, 25, 41, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--navy-medium)',
          border: '2px solid var(--slate-medium)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <div className="mb-6 text-slate-light">{children}</div>
        <div className="flex gap-3">
          {secondaryAction && (
            <Button
              variant="ghost"
              onClick={secondaryAction.onClick}
              className="flex-1"
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant={primaryAction.variant || 'primary'}
              onClick={primaryAction.onClick}
              className="flex-1"
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

