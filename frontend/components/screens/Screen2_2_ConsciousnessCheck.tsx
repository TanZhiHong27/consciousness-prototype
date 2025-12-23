'use client'

import React, { useState } from 'react'
import Button from '../ui/Button'

interface Screen2_2Props {
  onComplete: () => void
}

export default function Screen2_2_ConsciousnessCheck({ onComplete }: Screen2_2Props) {
  const [step, setStep] = useState<'gesture' | 'logic'>('gesture')
  const [gestureComplete, setGestureComplete] = useState(false)
  const [logicComplete, setLogicComplete] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')

  const currentYear = new Date().getFullYear()
  const yearBackwards = currentYear.toString().split('').reverse().join('')

  const handleGestureComplete = () => {
    setGestureComplete(true)
    setTimeout(() => setStep('logic'), 1500)
  }

  const handleLogicSubmit = () => {
    if (userAnswer === yearBackwards) {
      setLogicComplete(true)
      setTimeout(() => onComplete(), 1500)
    } else {
      alert('Incorrect. Please try again.')
      setUserAnswer('')
    }
  }

  return (
    <div className="mobile-container flex flex-col min-h-screen" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--slate-medium)' }}>
        <h2 className="text-2xl font-bold mb-2 text-white">Consciousness Check</h2>
        <p className="text-slate-light text-sm">Confirming cognitive presence and understanding</p>
      </div>

      {/* Camera View Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated Selfie View */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--slate-dark)' }}>
          {/* Face Frame Overlay */}
          <div className="relative">
            <div className="w-64 h-80 border-4 rounded-3xl" style={{ borderColor: 'var(--teal-accent)' }}>
              {/* Simulated face detection box */}
              <div className="absolute inset-4 border-2 rounded-2xl animate-pulse" style={{ borderColor: 'var(--teal-glow)' }}></div>
            </div>
            
            {/* AI Tracking Indicator */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--navy-medium)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--teal-accent)' }}></div>
                <p className="text-xs text-white">AI Tracking Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10" style={{ background: 'linear-gradient(to top, var(--navy-deep) 0%, transparent 100%)' }}>
          <div className="bg-navy-medium rounded-2xl p-6 border" style={{ borderColor: 'var(--slate-medium)' }}>
            {step === 'gesture' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-light">Action 1 of 2</span>
                  {gestureComplete && (
                    <div className="flex items-center gap-2 text-success-green">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Please blink twice rapidly, then smile
                </h3>
                <p className="text-slate-light text-sm mb-4">
                  The AI will track your facial landmarks to verify your presence
                </p>
                {!gestureComplete && (
                  <Button onClick={handleGestureComplete} fullWidth>
                    I&apos;ve Completed the Gesture
                  </Button>
                )}
              </div>
            )}

            {step === 'logic' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-light">Action 2 of 2</span>
                  {logicComplete && (
                    <div className="flex items-center gap-2 text-success-green">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  To confirm cognitive presence, say the current year backwards
                </h3>
                <p className="text-slate-light text-sm mb-4">
                  Current year: <strong className="text-white">{currentYear}</strong>
                </p>

                {/* Microphone Waveform Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-1 h-12">
                    {isListening ? (
                      Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 100 + 20}%`,
                            backgroundColor: 'var(--teal-accent)',
                            animationDelay: `${i * 50}ms`,
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-slate-light text-sm">Tap to start recording</p>
                    )}
                  </div>
                </div>

                {/* Answer Input (for demo - in real app this would be voice recognition) */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onFocus={() => setIsListening(true)}
                    onBlur={() => setIsListening(false)}
                    placeholder="Enter the year backwards"
                    className="w-full px-4 py-3 rounded-xl bg-navy-light border-2 text-white placeholder-slate-light focus:outline-none focus:border-teal-accent"
                    style={{
                      backgroundColor: 'var(--navy-light)',
                      borderColor: 'var(--slate-medium)',
                    }}
                  />
                </div>

                {!logicComplete && (
                  <Button onClick={handleLogicSubmit} fullWidth disabled={!userAnswer}>
                    Submit Answer
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

