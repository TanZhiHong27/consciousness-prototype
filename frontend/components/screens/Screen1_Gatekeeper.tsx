'use client'

import React from 'react'
import Card from '../ui/Card'

interface Screen1Props {
  onSelect: (isMuslim: boolean) => void
}

export default function Screen1_Gatekeeper({ onSelect }: Screen1Props) {
  return (
    <div className="mobile-container flex flex-col items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--teal-accent)' }}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--navy-deep)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white">LifeKey</h1>
          <p className="text-slate-light text-lg">Digital Will Creation</p>
        </div>

        {/* Subtitle */}
        <p className="text-center text-slate-light mb-8 px-4">
          Please select your status to determine the legal structure of your will
        </p>

        {/* Selection Cards */}
        <div className="space-y-4 mb-6">
          <Card
            onClick={() => onSelect(true)}
            className="p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                <span className="text-2xl">🕌</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Muslim Citizen
                </h3>
                <p className="text-slate-light text-sm leading-relaxed">
                  Faraid & Wasiyyah Laws Apply
                </p>
                <p className="text-slate-light text-xs mt-2 opacity-75">
                  Fixed 2/3 distribution to Quranic heirs, 1/3 discretionary
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onSelect(false)}
            className="p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                <span className="text-2xl">⚖️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Non-Muslim Citizen
                </h3>
                <p className="text-slate-light text-sm leading-relaxed">
                  Standard Civil Law
                </p>
                <p className="text-slate-light text-xs mt-2 opacity-75">
                  Full 100% distribution freedom to assigned beneficiaries
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-light opacity-60">
            🔒 Secured by AI Verification & National ID
          </p>
        </div>
      </div>
    </div>
  )
}

