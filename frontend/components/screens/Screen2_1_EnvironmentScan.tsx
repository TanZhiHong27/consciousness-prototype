'use client'

import React, { useState, useEffect } from 'react'
import Button from '../ui/Button'

interface Screen2_1Props {
  onComplete: () => void
}

export default function Screen2_1_EnvironmentScan({ onComplete }: Screen2_1Props) {
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(true)
  const [scanComplete, setScanComplete] = useState(false)
  const [threatsDetected, setThreatsDetected] = useState<string[]>([])

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false)
            setScanComplete(true)
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isScanning])

  // Simulate AI detection
  useEffect(() => {
    if (scanProgress > 30 && scanProgress < 50) {
      setThreatsDetected(['Analyzing background audio...', 'Scanning for movement...'])
    } else if (scanProgress > 50) {
      setThreatsDetected(['Environment secure', 'No threats detected'])
    }
  }, [scanProgress])

  return (
    <div className="mobile-container flex flex-col min-h-screen" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Camera View Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated Camera View */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--slate-dark)' }}>
          {/* AR Overlay Instructions */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-6">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-dashed flex items-center justify-center animate-spin-slow" style={{ borderColor: 'var(--teal-accent)' }}>
                  <div className="w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--teal-glow)' }}></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">360° Environment Scan</h2>
              <p className="text-slate-light mb-6">
                Slowly pan your phone 360 degrees around the room
              </p>
              
              {/* Progress Bar */}
              <div className="w-full max-w-xs mx-auto mb-4">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-medium)' }}>
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${scanProgress}%`,
                      backgroundColor: scanComplete ? 'var(--success-green)' : 'var(--teal-accent)',
                      boxShadow: scanComplete ? '0 0 20px var(--success-green)' : '0 0 20px var(--teal-glow)',
                    }}
                  />
                </div>
                <p className="text-xs text-slate-light mt-2">{scanProgress}% Complete</p>
              </div>
            </div>
          </div>

          {/* AI Detection Overlays (Simulated) */}
          {isScanning && scanProgress > 20 && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Simulated bounding boxes */}
              <div className="absolute top-20 left-10 w-24 h-32 border-2 rounded animate-pulse" style={{ borderColor: 'var(--teal-accent)' }}></div>
              <div className="absolute bottom-32 right-16 w-32 h-24 border-2 rounded animate-pulse" style={{ borderColor: 'var(--teal-accent)' }}></div>
              <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 rounded animate-pulse" style={{ borderColor: 'var(--teal-accent)' }}></div>
            </div>
          )}

          {/* AI Status Text */}
          <div className="absolute bottom-32 left-0 right-0 px-6 z-20">
            <div className="bg-navy-medium rounded-xl p-4 border" style={{ borderColor: 'var(--slate-medium)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--teal-accent)' }}></div>
                <p className="text-sm font-medium text-white">AI Active</p>
              </div>
              <div className="space-y-1">
                {threatsDetected.map((threat, idx) => (
                  <p key={idx} className="text-xs text-slate-light">
                    {threat}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success State */}
      {scanComplete && (
        <div className="absolute inset-0 flex items-center justify-center z-30" style={{ backgroundColor: 'rgba(10, 25, 41, 0.95)' }}>
          <div className="text-center px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success-green)' }}>
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Environment Secure</h2>
            <p className="text-slate-light mb-8">You are alone</p>
            <Button onClick={onComplete} fullWidth>
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

