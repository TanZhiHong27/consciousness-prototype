'use client'

import React, { useState } from 'react'
import Button from '../ui/Button'

interface Screen3Props {
  onComplete: () => void
}

export default function Screen3_ICScan({ onComplete }: Screen3Props) {
  const [scanComplete, setScanComplete] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  const handleStartScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScanComplete(true)
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="mobile-container flex flex-col min-h-screen" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--slate-medium)' }}>
        <h2 className="text-2xl font-bold mb-2 text-white">Digital IC Scan</h2>
        <p className="text-slate-light text-sm">Biometric verification using your MyKad</p>
      </div>

      {/* Camera View Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated Camera View */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--slate-dark)' }}>
          {/* IC Frame Overlay */}
          <div className="relative w-full max-w-sm px-6">
            <div className="relative">
              {/* Frame Guide */}
              <div className="border-4 rounded-lg" style={{ borderColor: scanComplete ? 'var(--success-green)' : 'var(--teal-accent)', aspectRatio: '85.6/53.98' }}>
                {/* Corner Guides */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: 'var(--teal-accent)' }}></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: 'var(--teal-accent)' }}></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: 'var(--teal-accent)' }}></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: 'var(--teal-accent)' }}></div>

                {/* Scanning Animation */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-teal-accent animate-pulse" style={{ backgroundColor: 'var(--teal-accent)' }}></div>
                  </div>
                )}

                {/* Success Overlay */}
                {scanComplete && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-medium bg-opacity-90 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success-green)' }}>
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold">IC Verified</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instruction Text */}
              {!scanComplete && (
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <p className="text-white font-medium mb-1">Align your MyKad within the frame</p>
                  <p className="text-slate-light text-sm">Ensure good lighting and the card is flat</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, var(--navy-deep) 0%, transparent 100%)' }}>
          <div className="bg-navy-medium rounded-2xl p-6 border" style={{ borderColor: 'var(--slate-medium)' }}>
            {!scanComplete ? (
              <Button onClick={handleStartScan} fullWidth disabled={isScanning}>
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            ) : (
              <div>
                <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--navy-light)' }}>
                  <p className="text-sm text-slate-light mb-2">Verification Details:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-white">✓ Identity confirmed</p>
                    <p className="text-xs text-white">✓ Biometric match verified</p>
                    <p className="text-xs text-white">✓ Document authenticity validated</p>
                  </div>
                </div>
                <Button onClick={onComplete} fullWidth>
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

