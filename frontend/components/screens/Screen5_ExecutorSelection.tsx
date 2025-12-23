'use client'

import React, { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface Screen5Props {
  onComplete: () => void
}

export default function Screen5_ExecutorSelection({ onComplete }: Screen5Props) {
  const [selectedExecutor, setSelectedExecutor] = useState<'amanah' | 'private' | null>(null)

  return (
    <div className="mobile-container flex flex-col min-h-screen" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--slate-medium)' }}>
        <h2 className="text-2xl font-bold mb-2 text-white">Select Digital Executor</h2>
        <p className="text-slate-light text-sm">Choose who will unlock your will upon confirmed death</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Explanation */}
          <div className="bg-navy-medium rounded-2xl p-6 border" style={{ borderColor: 'var(--slate-medium)' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--teal-glow)' }}>
                <span className="text-xl">🔐</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">The Smart Contract</h3>
                <p className="text-sm text-slate-light leading-relaxed">
                  Your Digital Executor is responsible for unlocking and executing your will after your death is confirmed through official channels.
                </p>
              </div>
            </div>
          </div>

          {/* Choice A: Amanah Raya */}
          <Card
            onClick={() => setSelectedExecutor('amanah')}
            selected={selectedExecutor === 'amanah'}
            className="p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">Amanah Raya</h3>
                  <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--success-green)', color: 'var(--white)' }}>
                    Recommended
                  </span>
                </div>
                <p className="text-slate-light text-sm mb-3 font-medium">
                  The Digital Oracle
                </p>
                <p className="text-slate-light text-sm leading-relaxed mb-3">
                  Government-backed trustee. Automatic execution upon death confirmation through official government records.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">No additional setup required</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">Automatic verification through JPN (National Registration Department)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">Legally recognized and protected</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Choice B: Private Individual */}
          <Card
            onClick={() => setSelectedExecutor('private')}
            selected={selectedExecutor === 'private'}
            className="p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Private Individual</h3>
                <p className="text-slate-light text-sm mb-3 font-medium">
                  Biometric Link
                </p>
                <p className="text-slate-light text-sm leading-relaxed mb-3">
                  Appoint a trusted person (e.g., Son, Daughter, Lawyer). They must use the LifeKey app and scan their own biometrics to unlock the will.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">Personal control over execution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">Requires executor to have LifeKey app installed</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-accent mt-1">✓</span>
                    <p className="text-xs text-slate-light">Biometric verification required for access</p>
                  </div>
                </div>
                {selectedExecutor === 'private' && (
                  <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--navy-light)' }}>
                    <p className="text-xs text-slate-light mb-2">Executor Details Required:</p>
                    <input
                      type="text"
                      placeholder="Executor's Full Name"
                      className="w-full px-3 py-2 rounded-lg bg-navy-deep border text-white placeholder-slate-light text-sm mb-2 focus:outline-none focus:border-teal-accent"
                      style={{
                        borderColor: 'var(--slate-medium)',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="IC Number"
                      className="w-full px-3 py-2 rounded-lg bg-navy-deep border text-white placeholder-slate-light text-sm focus:outline-none focus:border-teal-accent"
                      style={{
                        borderColor: 'var(--slate-medium)',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <div className="mt-6">
            <Button
              onClick={onComplete}
              fullWidth
              disabled={!selectedExecutor}
            >
              Complete Will Creation
            </Button>
            {!selectedExecutor && (
              <p className="text-xs text-warning-amber text-center mt-2">
                Please select an executor to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

