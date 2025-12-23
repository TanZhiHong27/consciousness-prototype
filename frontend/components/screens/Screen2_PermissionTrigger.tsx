'use client'

import React from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface Screen2Props {
  isOpen: boolean
  onAllow: () => void
  onCancel: () => void
}

export default function Screen2_PermissionTrigger({
  isOpen,
  onAllow,
  onCancel,
}: Screen2Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Safety Protocol Activation"
      primaryAction={{
        label: 'Allow Secure Access',
        onClick: onAllow,
        variant: 'primary',
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onCancel,
      }}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--teal-accent)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Camera & Microphone Access Required</p>
            <p className="text-slate-light text-sm leading-relaxed">
              LifeKey requires camera and microphone access to enable:
            </p>
          </div>
        </div>

        <div className="pl-11 space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-teal-accent mt-1">•</span>
            <p className="text-slate-light text-sm">
              <strong className="text-white">AI Witnessing Protocol:</strong> Advanced facial recognition and voice analysis to verify your identity and consent
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-accent mt-1">•</span>
            <p className="text-slate-light text-sm">
              <strong className="text-white">Anti-Coercion Detection:</strong> Environmental scanning and behavioral analysis to ensure you are alone and acting freely
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-teal-accent mt-1">•</span>
            <p className="text-slate-light text-sm">
              <strong className="text-white">Cognitive Verification:</strong> Interactive tests to confirm your mental presence and understanding
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--navy-light)', border: '1px solid var(--slate-medium)' }}>
          <p className="text-xs text-slate-light">
            <strong className="text-white">Privacy Note:</strong> All data is encrypted and processed locally. No recordings are stored permanently.
          </p>
        </div>
      </div>
    </Modal>
  )
}

