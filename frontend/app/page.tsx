'use client'

import React, { useState, useEffect, useRef } from 'react'

type Screen = 'legal-framework' | 'permission' | 'ic-scan' | 'environment-scan' | 'liveness-check' | 'consciousness-check' | 'asset-distribution' | 'executor-selection' | 'review-seal' | 'success-dashboard' | 'ic-locked'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('legal-framework')
  const [selectedLegalFramework, setSelectedLegalFramework] = useState<'muslim' | 'non-muslim' | null>(null)
  const [selectedExecutor, setSelectedExecutor] = useState<'amanah' | 'private' | null>(null)
  const [executorDetails, setExecutorDetails] = useState<{ name: string; ic: string }>({ name: '', ic: '' })

  // Screen 1: Legal Framework Selection
  if (currentScreen === 'legal-framework') {
    return (
      <LegalFrameworkScreen
        selectedOption={selectedLegalFramework}
        onSelect={(option) => setSelectedLegalFramework(option)}
        onContinue={() => setCurrentScreen('permission')}
      />
    )
  }

  // Screen 2: Permission Trigger
  if (currentScreen === 'permission') {
    return (
      <PermissionScreen
        onAllow={() => setCurrentScreen('ic-scan')}
        onCancel={() => setCurrentScreen('legal-framework')}
      />
    )
  }

  // Screen 3: IC Scan (moved before environment scan to capture IC details first)
  if (currentScreen === 'ic-scan') {
    return (
      <ICScanScreen
        onComplete={() => setCurrentScreen('environment-scan')}
      />
    )
  }

  // Screen 4: Environment Scan
  if (currentScreen === 'environment-scan') {
    return (
      <EnvironmentScanScreen
        onComplete={() => setCurrentScreen('liveness-check')}
        onThreatDetected={() => setCurrentScreen('ic-locked')}
      />
    )
  }

  // Screen: IC Locked
  if (currentScreen === 'ic-locked') {
    return <ICLockedScreen />
  }

  // Screen 4.5: Biometric Liveness Check (Gestures)
  if (currentScreen === 'liveness-check') {
    return (
      <BiometricLivenessCheckScreen
        onComplete={() => setCurrentScreen('consciousness-check')}
      />
    )
  }

  // Screen 5: Consciousness Check
  if (currentScreen === 'consciousness-check') {
    return (
      <ConsciousnessCheckScreen
        onComplete={() => setCurrentScreen('asset-distribution')}
      />
    )
  }

  // Screen 6: Asset Distribution
  if (currentScreen === 'asset-distribution') {
    return (
      <AssetDistributionScreen
        isMuslim={selectedLegalFramework === 'muslim'}
        onComplete={() => setCurrentScreen('executor-selection')}
      />
    )
  }

  // Screen 7: Executor Selection
  if (currentScreen === 'executor-selection') {
    return (
      <ExecutorSelectionScreen
        selectedExecutor={selectedExecutor}
        executorDetails={executorDetails}
        onSelectExecutor={(executor) => setSelectedExecutor(executor)}
        onUpdateExecutorDetails={(details) => setExecutorDetails(details)}
        onComplete={() => setCurrentScreen('review-seal')}
      />
    )
  }

  // Screen 8: Review & Seal
  if (currentScreen === 'review-seal') {
    return (
      <ReviewSealScreen
        isMuslim={selectedLegalFramework === 'muslim'}
        executor={selectedExecutor}
        executorDetails={executorDetails}
        onComplete={() => setCurrentScreen('success-dashboard')}
      />
    )
  }

  // Screen 9: Success & Dashboard
  return (
    <SuccessDashboardScreen
      executor={selectedExecutor}
      executorDetails={executorDetails}
    />
  )
}

// ========== SCREEN COMPONENTS ==========

// Screen 1: Legal Framework Selection
function LegalFrameworkScreen({ 
  selectedOption, 
  onSelect, 
  onContinue 
}: { 
  selectedOption: 'muslim' | 'non-muslim' | null
  onSelect: (option: 'muslim' | 'non-muslim') => void
  onContinue: () => void
}) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at top, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at bottom, rgba(15,23,42,0.9), #020617)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      overflowY: 'auto'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ marginBottom: '48px', marginTop: '40px' }}>
            <h1 style={{
              fontSize: '30px',
              fontWeight: 800,
              marginBottom: '12px',
              color: '#ffffff',
              lineHeight: '1.2',
              letterSpacing: '-0.5px'
            }}>
              Select Your Legal Framework
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              maxWidth: '320px'
            }}>
              This choice determines how LifeKey structures your will under Malaysian law.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div
              onClick={() => onSelect('muslim')}
              style={{
                padding: '20px 22px',
                borderRadius: '18px',
                border: selectedOption === 'muslim' ? '2px solid #00d9ff' : '1px solid #273549',
                background: selectedOption === 'muslim'
                  ? 'linear-gradient(135deg, #0b192f, #123859)'
                  : 'linear-gradient(135deg, #070f1f, #101827)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedOption === 'muslim'
                  ? '0 0 22px rgba(0, 217, 255, 0.35)'
                  : '0 0 12px rgba(15,23,42,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              {/* Icon - stylized crescent & star */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                background: 'radial-gradient(circle at 30% 20%, rgba(56,189,248,0.4), transparent 60%)',
                border: '1px solid rgba(56,189,248,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.5 4.2C12.6 4.07 11.7 4.16 10.84 4.48C8.22 5.44 6.8 8.3 7.76 10.92C8.72 13.54 11.58 14.96 14.2 14C15.25 13.62 16.11 12.95 16.74 12.1C15.9 12.27 15 12.21 14.12 11.88C11.5 10.92 10.08 8.06 11.04 5.44C11.35 4.61 11.86 3.9 12.5 3.35C12.83 3.68 13.16 3.96 13.5 4.2Z"
                    fill="#22d3ee"
                  />
                  <path
                    d="M17.5 6.25L18.2 7.8L19.88 7.93L18.6 9.02L18.99 10.67L17.5 9.8L16.01 10.67L16.4 9.02L15.12 7.93L16.8 7.8L17.5 6.25Z"
                    fill="#e5f9ff"
                  />
                </svg>
              </div>

              {/* Text content */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.4'
                }}>
                  Muslim Citizen
                </h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  Subject to <strong style={{ color: '#e5e7eb' }}>Faraid & Wasiyyah</strong> laws. 2/3 fixed to heirs, 1/3 flexible under Shariah.
                </p>
              </div>

              {/* Selection checkmark */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '999px',
                  border: selectedOption === 'muslim'
                    ? '2px solid #22c55e'
                    : '2px solid #4b5563',
                  backgroundColor: selectedOption === 'muslim' ? '#022c22' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: selectedOption === 'muslim'
                    ? '0 0 14px rgba(34,197,94,0.7)'
                    : 'none',
                  transition: 'all 0.2s ease'
                }}>
                  {selectedOption === 'muslim' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="#22c55e"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div
              onClick={() => onSelect('non-muslim')}
              style={{
                padding: '20px 22px',
                borderRadius: '18px',
                border: selectedOption === 'non-muslim' ? '2px solid #00d9ff' : '1px solid #273549',
                background: selectedOption === 'non-muslim'
                  ? 'linear-gradient(135deg, #0b192f, #123859)'
                  : 'linear-gradient(135deg, #070f1f, #101827)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedOption === 'non-muslim'
                  ? '0 0 22px rgba(0, 217, 255, 0.35)'
                  : '0 0 12px rgba(15,23,42,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              {/* Icon - legal pillar / balanced scales */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                background: 'radial-gradient(circle at 30% 20%, rgba(56,189,248,0.4), transparent 60%)',
                border: '1px solid rgba(56,189,248,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 7H17M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7M5 7L3 11H9L7 7ZM19 7L17 11H23L21 7ZM5 17C6.10457 17 7 16.1046 7 15H3C3 16.1046 3.89543 17 5 17ZM19 17C20.1046 17 21 16.1046 21 15H17C17 16.1046 17.8954 17 19 17Z"
                    stroke="#e5f9ff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7V19M9 19H15"
                    stroke="#22d3ee"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Text content */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  marginBottom: '6px',
                  color: '#ffffff',
                  lineHeight: '1.4'
                }}>
                  Non-Muslim Citizen
                </h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  Subject to standard <strong style={{ color: '#e5e7eb' }}>Civil Law</strong>. You have 100% freedom to decide your asset distribution.
                </p>
              </div>

              {/* Selection checkmark */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '999px',
                  border: selectedOption === 'non-muslim'
                    ? '2px solid #22c55e'
                    : '2px solid #4b5563',
                  backgroundColor: selectedOption === 'non-muslim' ? '#022c22' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: selectedOption === 'non-muslim'
                    ? '0 0 14px rgba(34,197,94,0.7)'
                    : 'none',
                  transition: 'all 0.2s ease'
                }}>
                  {selectedOption === 'non-muslim' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="#22c55e"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <button
            onClick={onContinue}
            disabled={!selectedOption}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              backgroundColor: selectedOption ? '#00d9ff' : '#4a5568',
              color: selectedOption ? '#0a1929' : '#718096',
              boxShadow: selectedOption ? '0 4px 12px rgba(0, 217, 255, 0.4)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedOption) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption) {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

// Screen 2: Permission Trigger Modal
function PermissionScreen({ onAllow, onCancel }: { onAllow: () => void; onCancel: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: 'rgba(10, 25, 41, 0.95)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#132f4c',
        borderRadius: '20px',
        padding: '24px',
        border: '2px solid #4a5568'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#ffffff'
        }}>
          Safety Protocol Activation
        </h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={{
            color: '#718096',
            fontSize: '15px',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            LifeKey requires camera and microphone access to enable:
          </p>
          
          <div style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#00d9ff', marginTop: '4px' }}>•</span>
              <p style={{ color: '#718096', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#ffffff' }}>AI Witnessing Protocol:</strong> Advanced facial recognition and voice analysis to verify your identity and consent
              </p>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#00d9ff', marginTop: '4px' }}>•</span>
              <p style={{ color: '#718096', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#ffffff' }}>Anti-Coercion Detection:</strong> Environmental scanning and behavioral analysis to ensure you are alone and acting freely
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#00d9ff', marginTop: '4px' }}>•</span>
              <p style={{ color: '#718096', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#ffffff' }}>Cognitive Verification:</strong> Interactive tests to confirm your mental presence and understanding
              </p>
            </div>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: '#1e4976',
            border: '1px solid #4a5568',
            marginTop: '16px'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#718096',
              lineHeight: '1.5'
            }}>
              <strong style={{ color: '#ffffff' }}>Privacy Note:</strong> All data is encrypted and processed locally. No recordings are stored permanently.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '12px',
              border: '2px solid #4a5568',
              backgroundColor: 'transparent',
              color: '#718096',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#718096'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#4a5568'
              e.currentTarget.style.color = '#718096'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onAllow}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#00d9ff',
              color: '#0a1929',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 217, 255, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
            }}
          >
            Allow Secure Access
          </button>
        </div>
      </div>
    </div>
  )
}

// Screen 3: Environment Scan - 360° AR View with Real Camera & Threat Detection
function EnvironmentScanScreen({ onComplete, onThreatDetected }: { onComplete: () => void; onThreatDetected: () => void }) {
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [aiStatus, setAiStatus] = useState<string[]>([])
  const [cameraAccess, setCameraAccess] = useState(false)
  const [threats, setThreats] = useState<Array<{ x: number; y: number; width: number; height: number; type: string }>>([])
  const [isLocking, setIsLocking] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Spacebar trigger for threat detection (for testing/demo)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if scanning is active and no threat already detected
      if (e.code === 'Space' && isScanning && !isLocking && threats.length === 0) {
        e.preventDefault()
        
        // Simulate knife detection at center of screen
        const newThreat = {
          x: 40, // Center-left area
          y: 40, // Center-top area
          width: 120,
          height: 120,
          type: 'knife'
        }
        
        setThreats([newThreat])
        setAiStatus([
          '⚠️ THREAT DETECTED',
          'Security protocol activated',
          'Terminating session...',
          'Locking IC...'
        ])
        setIsLocking(true)
        setIsScanning(false)
        
        // Auto-terminate and lock IC after 2 seconds
        setTimeout(() => {
          onThreatDetected()
        }, 2000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isScanning, isLocking, threats.length, onThreatDetected])

  // Request camera access
  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setCameraAccess(true)
          
          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            setIsScanning(true)
          }
        }
      } catch (error) {
        console.error('Camera access denied:', error)
        setAiStatus(['Camera access required', 'Please allow camera access to continue'])
      }
    }

    requestCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])


  // Scan progress
  useEffect(() => {
    if (isScanning && !isLocking) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false)
            setScanComplete(true)
            return 100
          }
          return prev + 1
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [isScanning, isLocking])

  // AI Status updates
  useEffect(() => {
    if (isLocking) return
    
    if (scanProgress < 30) {
      setAiStatus(['Initializing scan...', 'Camera active', 'Threat detection ready'])
    } else if (scanProgress < 50) {
      setAiStatus([
        'Scanning environment for threats...', 
        'Analyzing background audio for coercion...', 
        'Monitoring for dangerous items...'
      ])
    } else if (scanProgress < 80) {
      setAiStatus([
        'Detecting movement patterns...', 
        'Verifying isolation...', 
        'No dangerous items detected so far...'
      ])
    } else if (scanProgress >= 100) {
      setAiStatus([
        'Environment secure', 
        'No threats detected', 
        'Scan complete - Safe to proceed'
      ])
    }
  }, [scanProgress, isLocking])

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#2d3748',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Real Camera Feed */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#2d3748',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror for natural feel
          }}
        />

        {/* Threat Detection Overlays - Red Squares */}
        {threats.map((threat, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              width: `${threat.width}px`,
              height: `${threat.height}px`,
              border: '4px solid #ef4444',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)',
              animation: 'pulse 0.5s infinite',
              zIndex: 15
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              ⚠️ THREAT DETECTED
            </div>
          </div>
        ))}
      </div>

      {/* Instructions Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: '24px'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            margin: '0 auto 16px',
            borderRadius: '50%',
            border: '4px dashed #00d9ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'spin 3s linear infinite'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 217, 255, 0.3)'
            }} />
          </div>
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '12px',
          color: '#ffffff'
        }}>
          360° Environment Scan
        </h2>
        <p style={{
          color: '#718096',
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          Slowly pan your phone 360 degrees around the room
        </p>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto'
        }}>
          <div style={{
            height: '8px',
            borderRadius: '4px',
            backgroundColor: '#132f4c',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              height: '100%',
              width: `${scanProgress}%`,
              backgroundColor: scanComplete ? '#10b981' : '#00d9ff',
              transition: 'width 0.3s ease',
              boxShadow: scanComplete ? '0 0 20px rgba(16, 185, 129, 0.5)' : '0 0 20px rgba(0, 217, 255, 0.5)'
            }} />
          </div>
          <p style={{
            fontSize: '14px',
            color: '#718096',
            textAlign: 'center'
          }}>
            {scanProgress}% Complete
          </p>
        </div>
      </div>

      {/* AI Status Panel */}
      <div style={{
        position: 'absolute',
        bottom: '128px',
        left: '24px',
        right: '24px',
        zIndex: 10
      }}>
        <div style={{
          backgroundColor: isLocking ? '#7f1d1d' : '#132f4c',
          borderRadius: '16px',
          padding: '16px',
          border: isLocking ? '2px solid #ef4444' : '1px solid #4a5568',
          boxShadow: isLocking ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isLocking ? '#ef4444' : '#00d9ff',
              animation: 'pulse 1.5s infinite'
            }} />
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              {isLocking ? '⚠️ THREAT DETECTED' : 'AI Active'}
            </p>
          </div>
          <div style={{ paddingLeft: '16px' }}>
            {aiStatus.map((status, idx) => (
              <p key={idx} style={{
                fontSize: '12px',
                color: isLocking ? '#fca5a5' : '#718096',
                marginBottom: '4px',
                lineHeight: '1.4',
                fontWeight: isLocking ? 600 : 400
              }}>
                {status}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {scanComplete && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 25, 41, 0.95)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          padding: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#ffffff'
            }}>
              Environment Secure
            </h2>
            <p style={{
              color: '#718096',
              fontSize: '16px',
              marginBottom: '32px'
            }}>
              You are alone
            </p>
            <button
              onClick={onComplete}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#00d9ff',
                color: '#0a1929',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 217, 255, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

// Screen 4.5: Biometric Liveness Check (Gestures)
function BiometricLivenessCheckScreen({ onComplete }: { onComplete: () => void }) {
  const [currentCommand, setCurrentCommand] = useState(1)
  const [commandComplete, setCommandComplete] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const commands = [
    { id: 1, text: 'Raise your LEFT hand', icon: '✋', next: 'Blink rapidly twice' },
    { id: 2, text: 'Blink rapidly twice', icon: '👁️', next: 'Turn your head slowly to the RIGHT' },
    { id: 3, text: 'Turn your head slowly to the RIGHT', icon: '👤', next: 'Complete' }
  ]

  const currentCmd = commands[currentCommand - 1]

  // Request front-facing camera
  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setIsTracking(true)
        }
      } catch (error) {
        console.error('Camera access denied:', error)
      }
    }
    requestCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleCommandComplete = () => {
    setCommandComplete(true)
    if (currentCommand < 3) {
      setTimeout(() => {
        setCurrentCommand(currentCommand + 1)
        setCommandComplete(false)
        setIsTracking(true)
      }, 1500)
    } else {
      setTimeout(() => onComplete(), 1500)
    }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #4a5568',
        backgroundColor: '#0a1929',
        zIndex: 20
      }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '4px',
          color: '#ffffff'
        }}>
          Liveness Verification
        </h2>
        <p style={{
          color: '#718096',
          fontSize: '12px'
        }}>
          Follow the commands to verify you are a live human
        </p>
      </div>

      {/* Full-Screen Camera View */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#2d3748',
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)' // Mirror for natural feel
          }}
        />

        {/* AI Overlay - Facial Tracking Mesh */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '400px',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          {/* Face Mesh Points */}
          <svg width="300" height="400" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Face outline */}
            <ellipse cx="150" cy="180" rx="100" ry="120" fill="none" stroke="#00d9ff" strokeWidth="2" opacity="0.6" />
            
            {/* Eye points and connections */}
            <circle cx="120" cy="160" r="4" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <circle cx="180" cy="160" r="4" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <line x1="120" y1="160" x2="180" y2="160" stroke="#00d9ff" strokeWidth="1" opacity="0.5" />
            
            {/* Nose point */}
            <circle cx="150" cy="200" r="3" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <line x1="150" y1="200" x2="120" y2="160" stroke="#00d9ff" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="200" x2="180" y2="160" stroke="#00d9ff" strokeWidth="1" opacity="0.5" />
            
            {/* Mouth points */}
            <circle cx="130" cy="240" r="3" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <circle cx="150" cy="245" r="3" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <circle cx="170" cy="240" r="3" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.8))' }} />
            <path d="M 130 240 Q 150 245 170 240" stroke="#00d9ff" strokeWidth="1" fill="none" opacity="0.5" />
            
            {/* Skeletal tracking - Shoulders */}
            <line x1="80" y1="280" x2="220" y2="280" stroke="#00d9ff" strokeWidth="2" opacity="0.6" />
            
            {/* Skeletal tracking - Arms */}
            <line x1="80" y1="280" x2="60" y2="320" stroke="#00d9ff" strokeWidth="2" opacity="0.6" />
            <line x1="220" y1="280" x2="240" y2="320" stroke="#00d9ff" strokeWidth="2" opacity="0.6" />
            
            {/* Shoulder points */}
            <circle cx="80" cy="280" r="5" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 1))' }} />
            <circle cx="220" cy="280" r="5" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 1))' }} />
            
            {/* Hand points */}
            <circle cx="60" cy="320" r="6" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 217, 255, 1))', animation: currentCommand === 1 ? 'pulse 1s infinite' : 'none' }} />
            <circle cx="240" cy="320" r="6" fill="#00d9ff" style={{ filter: 'drop-shadow(0 0 12px rgba(0, 217, 255, 1))' }} />
          </svg>
        </div>

        {/* Primary Instruction Banner */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '24px',
          right: '24px',
          zIndex: 15
        }}>
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #00d9ff',
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{
                fontSize: '12px',
                color: '#00d9ff',
                fontWeight: 600
              }}>
                Command {currentCommand} of 3
              </span>
              {commandComplete && (
                <span style={{
                  fontSize: '12px',
                  color: '#10b981',
                  fontWeight: 600
                }}>
                  ✓ Verified
                </span>
              )}
            </div>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              {currentCmd.text}
            </h3>

            {/* Animated Icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '32px',
                animation: isTracking ? 'pulse 1.5s infinite' : 'none'
              }}>
                {currentCmd.icon}
              </div>
              <p style={{
                fontSize: '14px',
                color: isTracking ? '#00d9ff' : '#718096',
                fontWeight: 600
              }}>
                {isTracking ? 'Tracking movement...' : 'Ready...'}
              </p>
            </div>

            {/* Secondary Instruction Queue */}
            {currentCommand < 3 && (
              <div style={{
                paddingTop: '12px',
                borderTop: '1px solid #4a5568',
                marginTop: '12px'
              }}>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  opacity: 0.7
                }}>
                  Next: {currentCmd.next}
                </p>
              </div>
            )}

            {/* Complete Button */}
            {!commandComplete && (
              <button
                onClick={handleCommandComplete}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#00d9ff',
                  color: '#0a1929',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 217, 255, 0.4)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
                }}
              >
                I've Completed This Action
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Biometric Sensor Status */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        backgroundColor: '#0a1929',
        borderTop: '1px solid #4a5568',
        zIndex: 15
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#00d9ff',
            animation: 'pulse 1.5s infinite',
            boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)'
          }} />
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#ffffff'
          }}>
            AI Sentry: Analyzing motor control latency and natural movement
          </p>
        </div>

        {/* Live Audio Waveform */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          height: '40px',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: '#132f4c',
          border: '1px solid #4a5568'
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                borderRadius: '2px',
                height: `${Math.random() * 100 + 20}%`,
                backgroundColor: '#00d9ff',
                animation: 'pulse 0.4s infinite',
                animationDelay: `${i * 40}ms`,
                boxShadow: '0 0 4px rgba(0, 217, 255, 0.6)'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

// Screen 5: AI Clinical Consciousness & Sobriety Test
function ConsciousnessCheckScreen({ onComplete }: { onComplete: () => void }) {
  const [currentTest, setCurrentTest] = useState<1 | 2 | 3>(1)
  const [progress, setProgress] = useState(33)
  const [test1Complete, setTest1Complete] = useState(false)
  const [test2Complete, setTest2Complete] = useState(false)
  const [test3Complete, setTest3Complete] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceAnswer, setVoiceAnswer] = useState('')
  const [stroopStartTime, setStroopStartTime] = useState<number | null>(null)
  const [stroopReactionTime, setStroopReactionTime] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Request front-facing camera
  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
        }
      } catch (error) {
        console.error('Camera access denied:', error)
      }
    }
    requestCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Update progress based on test completion
  useEffect(() => {
    if (test1Complete && test2Complete && test3Complete) {
      setProgress(100)
      setTimeout(() => onComplete(), 1500)
    } else if (test1Complete && test2Complete) {
      setProgress(67)
    } else if (test1Complete) {
      setProgress(33)
    }
  }, [test1Complete, test2Complete, test3Complete, onComplete])

  const handleTest1Submit = () => {
    if (voiceAnswer.trim().length > 0) {
      setTest1Complete(true)
      setTimeout(() => setCurrentTest(2), 1500)
    }
  }

  const handleTest2Answer = (answer: 'yes' | 'no' | 'nonsense') => {
    if (answer === 'nonsense') {
      setTest2Complete(true)
      setTimeout(() => {
        setCurrentTest(3)
        setStroopStartTime(Date.now())
      }, 1500)
    } else {
      alert('Incorrect. Please reconsider your answer.')
    }
  }

  const handleStroopAnswer = (color: 'red' | 'green' | 'blue' | 'yellow') => {
    if (stroopStartTime) {
      const reactionTime = Date.now() - stroopStartTime
      setStroopReactionTime(reactionTime)
    }
    if (color === 'red') {
      setTest3Complete(true)
    } else {
      alert('Incorrect. Please select the COLOR of the text, not the word itself.')
    }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#1a1a1a', // Deep charcoal medical dark mode
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Progress Bar Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #333333',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#ffffff'
          }}>
            Cognitive Assessment: {progress}% Complete
          </p>
          {test1Complete && test2Complete && test3Complete && (
            <span style={{
              fontSize: '12px',
              color: '#10b981', // Safety green
              fontWeight: 600
            }}>
              ✓ All Tests Passed
            </span>
          )}
        </div>
        <div style={{
          height: '4px',
          borderRadius: '2px',
          backgroundColor: '#333333',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: progress === 100 ? '#10b981' : '#f59e0b', // Safety green or caution amber
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }} />
        </div>
      </div>

      {/* Top Section - Circular Selfie Camera */}
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #10b981',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
            position: 'relative'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '2px solid rgba(16, 185, 129, 0.5)',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '12px',
              backgroundColor: '#10b981',
              fontSize: '10px',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                animation: 'pulse 1.5s infinite'
              }} />
              Bio-Scan Active
            </div>
          </div>
        </div>
      </div>

      {/* Central Workspace - Interactive Test Cards */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        paddingBottom: '140px'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {/* Test 1: Orientation Check */}
          {currentTest === 1 && (
            <div style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #404040'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontWeight: 600
                }}>
                  Test 1: Orientation Check
                </span>
                {test1Complete && (
                  <span style={{
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: 600
                  }}>
                    ✓ Complete
                  </span>
                )}
              </div>
              
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff'
              }}>
                Please state your current city and the current season.
              </h3>

              {/* Voice Waveform Indicator */}
              <div style={{
                marginBottom: '20px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #404040'
              }}>
                {isListening ? (
                  Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        borderRadius: '2px',
                        height: `${Math.random() * 100 + 30}%`,
                        backgroundColor: '#10b981',
                        animation: 'pulse 0.3s infinite',
                        animationDelay: `${i * 30}ms`
                      }}
                    />
                  ))
                ) : (
                  <p style={{
                    color: '#888888',
                    fontSize: '14px'
                  }}>
                    Tap microphone to start recording
                  </p>
                )}
              </div>

              {/* Voice Input */}
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  value={voiceAnswer}
                  onChange={(e) => setVoiceAnswer(e.target.value)}
                  placeholder="Speak or type your answer..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #404040',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => {
                    setIsListening(true)
                    e.currentTarget.style.borderColor = '#10b981'
                  }}
                  onBlur={(e) => {
                    setIsListening(false)
                    e.currentTarget.style.borderColor = '#404040'
                  }}
                />
              </div>

              {!test1Complete && (
                <button
                  onClick={handleTest1Submit}
                  disabled={!voiceAnswer.trim()}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: voiceAnswer.trim() ? '#10b981' : '#404040',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: voiceAnswer.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Submit Answer
                </button>
              )}
            </div>
          )}

          {/* Test 2: Absurdity Logic Test */}
          {currentTest === 2 && (
            <div style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #404040'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontWeight: 600
                }}>
                  Test 2: Logic Check
                </span>
                {test2Complete && (
                  <span style={{
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: 600
                  }}>
                    ✓ Complete
                  </span>
                )}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff'
              }}>
                Logic Check: Is a blue elephant heavier than a Friday?
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button
                  onClick={() => handleTest2Answer('yes')}
                  disabled={test2Complete}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '2px solid #404040',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: test2Complete ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#f59e0b'
                      e.currentTarget.style.backgroundColor = '#2a2a2a'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#404040'
                      e.currentTarget.style.backgroundColor = '#1a1a1a'
                    }
                  }}
                >
                  Yes
                </button>

                <button
                  onClick={() => handleTest2Answer('no')}
                  disabled={test2Complete}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '2px solid #404040',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: test2Complete ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#f59e0b'
                      e.currentTarget.style.backgroundColor = '#2a2a2a'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#404040'
                      e.currentTarget.style.backgroundColor = '#1a1a1a'
                    }
                  }}
                >
                  No
                </button>

                <button
                  onClick={() => handleTest2Answer('nonsense')}
                  disabled={test2Complete}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '2px solid #10b981',
                    backgroundColor: '#1a3a1a',
                    color: '#10b981',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: test2Complete ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: test2Complete ? 'none' : '0 0 20px rgba(16, 185, 129, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#10b981'
                      e.currentTarget.style.backgroundColor = '#1a4a1a'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!test2Complete) {
                      e.currentTarget.style.borderColor = '#10b981'
                      e.currentTarget.style.backgroundColor = '#1a3a1a'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)'
                    }
                  }}
                >
                  This is Nonsense
                </button>
              </div>
            </div>
          )}

          {/* Test 3: Stroop Effect */}
          {currentTest === 3 && (
            <div style={{
              backgroundColor: '#2a2a2a',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #404040'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontWeight: 600
                }}>
                  Test 3: Cognitive Load Test
                </span>
                {test3Complete && (
                  <span style={{
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: 600
                  }}>
                    ✓ Complete
                  </span>
                )}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '12px',
                color: '#ffffff'
              }}>
                Quickly select the COLOR of the text, not the word itself.
              </h3>

              {/* Latency Timer Bar */}
              {stroopStartTime && !test3Complete && (
                <div style={{
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: '#1a1a1a',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: '#f59e0b',
                      animation: 'shrink 5s linear forwards',
                      transformOrigin: 'left'
                    }}
                  />
                </div>
              )}

              {/* Stroop Word Display */}
              <div style={{
                textAlign: 'center',
                marginBottom: '32px',
                padding: '32px',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                border: '2px solid #404040'
              }}>
                <p style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: '#ef4444', // RED color
                  margin: 0,
                  letterSpacing: '2px'
                }}>
                  GREEN
                </p>
              </div>

              {/* Color Swatches */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {(['red', 'green', 'blue', 'yellow'] as const).map((color) => {
                  const colorMap = {
                    red: '#ef4444',
                    green: '#10b981',
                    blue: '#3b82f6',
                    yellow: '#f59e0b'
                  }
                  return (
                    <button
                      key={color}
                      onClick={() => handleStroopAnswer(color)}
                      disabled={test3Complete}
                      style={{
                        padding: '20px',
                        borderRadius: '12px',
                        border: '2px solid #404040',
                        backgroundColor: colorMap[color],
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: test3Complete ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'capitalize'
                      }}
                      onMouseEnter={(e) => {
                        if (!test3Complete) {
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.borderColor = '#ffffff'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!test3Complete) {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.borderColor = '#404040'
                        }
                      }}
                    >
                      {color}
                    </button>
                  )
                })}
              </div>

              {stroopReactionTime && (
                <p style={{
                  fontSize: '12px',
                  color: '#888888',
                  textAlign: 'center'
                }}>
                  Reaction time: {stroopReactionTime}ms
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Baseline Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333333',
        zIndex: 10
      }}>
        <p style={{
          fontSize: '11px',
          color: '#888888',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          Current performance being compared against your Registered Baseline Profile for accuracy
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Screen 5: NFC Identity Verification & Approval
function ICScanScreen({ onComplete }: { onComplete: () => void }) {
  const [scanComplete, setScanComplete] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  const handleStartScan = () => {
    setIsScanning(true)
    // Simulate NFC scan
    setTimeout(() => {
      setScanComplete(true)
      setIsScanning(false)
    }, 2500)
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#050814',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1f2933',
          backgroundColor: '#050814',
        }}
      >
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '4px',
            color: '#ffffff',
          }}
        >
          NFC Identity Verification
        </h2>
        <p
          style={{
            color: '#9ca3af',
            fontSize: '12px',
          }}
        >
          Securely verify your MyKad using NFC
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {!scanComplete ? (
          <>
            {/* Clear Label Above Graphic */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Position Your MyKad Like This:
              </p>
            </div>

            {/* NFC Illustration (exploded / isometric, no blocking) */}
            <div
              style={{
                position: 'relative',
                width: '280px',
                height: '320px',
                marginBottom: '16px',
              }}
            >
              {/* Smartphone - glassmorphism, slightly rotated and lifted above card */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '52%',
                  transform: 'translateX(-50%) rotate(-4deg)',
                  width: '150px',
                  height: '260px',
                  borderRadius: '30px',
                  background:
                    'linear-gradient(145deg, rgba(17,24,39,0.9), rgba(15,23,42,0.55))',
                  boxShadow:
                    '0 18px 36px rgba(0,0,0,0.85)',
                  border: '1px solid rgba(148, 163, 184, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '24px',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  zIndex: 2,
                }}
              >
                {/* Notch */}
                <div
                  style={{
                    width: '75px',
                    height: '18px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(2,6,23,0.9)',
                    marginBottom: '20px',
                  }}
                />
                
                {/* NFC Area Indicator - Top Back */}
                <div
                  style={{
                    position: 'absolute',
                    top: '52px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      color: '#38bdf8',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    NFC Area
                  </div>
                  <div
                    style={{
                      width: '80px',
                      height: '50px',
                      borderRadius: '12px',
                      border: '2px dashed rgba(56, 189, 248, 0.7)',
                      backgroundColor: 'rgba(15,23,42,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 8C7 6.34315 8.34315 5 10 5H14C15.6569 5 17 6.34315 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8Z"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <path
                        d="M9.5 9.5C9.5 8.94772 9.94772 8.5 10.5 8.5H13.5C14.0523 8.5 14.5 8.94772 14.5 9.5V14.5C14.5 15.0523 14.0523 15.5 13.5 15.5H11"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>
                </div>

                {/* Phone Screen Content */} 
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '26px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#6b7280',
                      textAlign: 'center',
                    }}
                  >
                    LifeKey
                  </div>
                </div>
              </div>

              {/* Glowing Arrow / Tap Motion between phone and MyKad */} 
              <div
                style={{
                  position: 'absolute',
                  top: '140px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                }}
              >
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="nfcArrowGrad"
                      x1="12"
                      y1="4"
                      x2="12"
                      y2="20"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 4V18M12 18L8 14M12 18L16 14"
                    stroke="url(#nfcArrowGrad)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* MyKad Card - tilted, large, NFC chip clearly visible */} 
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(6deg)',
                  width: '240px',
                  height: '130px',
                  borderRadius: '20px',
                  background:
                    'linear-gradient(135deg, #111827, #020617)',
                  boxShadow:
                    '0 24px 46px rgba(15, 23, 42, 0.95)',
                  border: '2px solid #38bdf8',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#9ca3af',
                      fontWeight: 600,
                    }}
                  >
                    MALAYSIA MYKAD
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '20px',
                      borderRadius: '4px',
                      background:
                        'linear-gradient(135deg, #2563eb, #22c55e)',
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      width: '110px',
                      height: '12px',
                      borderRadius: '999px',
                      background:
                        'linear-gradient(90deg, #111827, #4b5563)',
                      marginBottom: '6px',
                    }}
                  />
                  <div
                    style={{
                      width: '90px',
                      height: '10px',
                      borderRadius: '999px',
                      background:
                        'linear-gradient(90deg, #111827, #374151)',
                      marginBottom: '6px',
                    }}
                  />
                  <div
                    style={{
                      width: '70px',
                      height: '10px',
                      borderRadius: '999px',
                      background:
                        'linear-gradient(90deg, #111827, #4b5563)',
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#38bdf8',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    NFC CHIP
                  </div>
                  <div
                    style={{
                      fontSize: '9px',
                      color: '#6b7280',
                    }}
                  >
                    Tap Here ↑
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Text */}
            <div
              style={{
                textAlign: 'center',
                maxWidth: '340px',
                marginBottom: '8px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: '#ffffff',
                }}
              >
                Ready to Scan
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: '#d1d5db',
                  lineHeight: '1.7',
                  marginBottom: '4px',
                }}
              >
                Hold your <strong style={{ color: '#ffffff' }}>MyKad</strong> against the{' '}
                <strong style={{ color: '#38bdf8' }}>top-back</strong> of your phone
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: '#9ca3af',
                  lineHeight: '1.6',
                }}
              >
                (where the NFC chip is located)
              </p>
            </div>

            {/* Bottom Sheet / Action Area */}
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
                marginTop: '24px',
              }}
            >
              <div
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#020617',
                  border: '1px solid #1f2933',
                  padding: '18px 18px 20px',
                  boxShadow:
                    '0 -12px 30px rgba(15, 23, 42, 0.9)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '999px',
                      backgroundColor: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border:
                          '2px solid rgba(56, 189, 248, 0.6)',
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#e5e7eb',
                    }}
                  >
                    NFC reader will activate automatically when your
                    MyKad is in range.
                  </p>
                </div>

                <button
                  onClick={handleStartScan}
                  disabled={isScanning}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isScanning
                      ? '#374151'
                      : '#22c55e',
                    color: isScanning ? '#9ca3af' : '#022c22',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: isScanning ? 'not-allowed' : 'pointer',
                    boxShadow: isScanning
                      ? 'none'
                      : '0 12px 30px rgba(34, 197, 94, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isScanning ? 'Scanning for MyKad…' : 'Start NFC Scan'}
                </button>
              </div>
            </div>
          </>
        ) : (
          // Step B: Data Verification & Approval
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#022c22',
                  border: '2px solid #22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow:
                    '0 0 35px rgba(34, 197, 94, 0.6)',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#22c55e"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Digital Identity Card */}
            <div
              style={{
                borderRadius: '18px',
                background:
                  'linear-gradient(145deg, #020617, #020617)',
                border: '1px solid #1f2937',
                padding: '18px 18px 20px',
                boxShadow:
                  '0 18px 40px rgba(0,0,0,0.85)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#6b7280',
                      marginBottom: '4px',
                    }}
                  >
                    Digital Identity Card
                  </p>
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#f9fafb',
                    }}
                  >
                    MyKad NFC Profile
                  </p>
                </div>
                <div
                  style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#022c22',
                    border: '1px solid #22c55e',
                    fontSize: '10px',
                    color: '#bbf7d0',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Verified
                </div>
              </div>

              {/* Data Fields */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '2px',
                    }}
                  >
                    Full Name
                  </p>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#e5e7eb',
                    }}
                  >
                    AHMAD BIN ABDULLAH
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '2px',
                    }}
                  >
                    IC Number
                  </p>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#e5e7eb',
                      fontFamily: 'monospace',
                    }}
                  >
                    001212-01-XXXX
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '2px',
                    }}
                  >
                    Address
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#d1d5db',
                      lineHeight: '1.5',
                    }}
                  >
                    No. 12, Jalan Aman 3/4, Taman Seri Aman,
                    47301 Petaling Jaya, Selangor, Malaysia.
                  </p>
                </div>
              </div>
            </div>

            {/* Approve Action */}
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: '#020617',
                border: '1px solid #1f2933',
                padding: '18px 18px 20px',
              }}
            >
              <button
                onClick={onComplete}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#22c55e',
                  color: '#022c22',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow:
                    '0 14px 34px rgba(34, 197, 94, 0.45)',
                  transition: 'all 0.2s ease',
                  marginBottom: '10px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    'translateY(-1px)'
                  e.currentTarget.style.boxShadow =
                    '0 18px 40px rgba(34, 197, 94, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow =
                    '0 14px 34px rgba(34, 197, 94, 0.45)'
                }}
              >
                Approve & Confirm Identity
              </button>
              <p
                style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  lineHeight: '1.5',
                }}
              >
                By clicking Approve, you confirm that the data
                extracted from the MyKad chip is accurate and
                belongs to you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Screen 6: Asset Distribution Hub
function AssetDistributionScreen({ isMuslim, onComplete }: { isMuslim: boolean; onComplete: () => void }) {
  const [beneficiaries, setBeneficiaries] = useState<Array<{ name: string; percentage: number }>>([])
  const [newBeneficiary, setNewBeneficiary] = useState({ name: '', percentage: 0 })

  const faraidPortion = 66.67
  const wasiyyahPortion = 33.33
  // For Muslim users, we treat the Wasiyyah as its own 0–100% sub-budget
  // totalAllocated / remaining are always on a 0–100 scale for the active portion
  const totalAllocated = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)
  const remaining = 100 - totalAllocated

  const handleAddBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.percentage > 0) {
      if (totalAllocated + newBeneficiary.percentage <= 100) {
        setBeneficiaries([...beneficiaries, newBeneficiary])
        setNewBeneficiary({ name: '', percentage: 0 })
      }
    }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #4a5568',
        backgroundColor: '#0a1929',
        flexShrink: 0
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#ffffff'
        }}>
          Asset Distribution Hub
        </h2>
        <p style={{
          color: '#718096',
          fontSize: '14px'
        }}>
          Allocate your assets to beneficiaries
        </p>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        paddingBottom: '120px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {isMuslim ? (
            /* Muslim Variation - Two Sections */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Faraid Portion - Fixed */}
              <div style={{
                backgroundColor: '#132f4c',
                borderRadius: '20px',
                padding: '24px',
                border: '2px solid #4a5568'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📜
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      Faraid Portion
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096'
                    }}>
                      2/3 Fixed (66.67%)
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    height: '12px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#1e4976',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '66.67%',
                      backgroundColor: '#00d9ff',
                      boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#718096',
                    lineHeight: '1.6'
                  }}>
                    Automatically distributed to Quranic heirs (blood family) according to Islamic inheritance law
                  </p>
                </div>
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#1e4976',
                  border: '1px solid #4a5568'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#718096',
                    marginBottom: '8px'
                  }}>
                    Distribution includes:
                  </p>
                  <ul style={{
                    fontSize: '12px',
                    color: '#ffffff',
                    paddingLeft: '20px',
                    lineHeight: '1.8'
                  }}>
                    <li>Spouse</li>
                    <li>Children (sons and daughters)</li>
                    <li>Parents</li>
                    <li>Siblings (if applicable)</li>
                  </ul>
                  <p style={{
                    fontSize: '12px',
                    color: '#718096',
                    marginTop: '12px',
                    fontStyle: 'italic'
                  }}>
                    This portion cannot be modified
                  </p>
                </div>
              </div>

              {/* Wasiyyah Portion - Flexible */}
              <div style={{
                backgroundColor: '#132f4c',
                borderRadius: '20px',
                padding: '24px',
                border: '2px solid #00d9ff',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    ✍️
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      Wasiyyah Portion
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096'
                    }}>
                      Allocating 100% of your discretionary 1/3 portion
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    height: '12px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#1e4976',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(totalAllocated, 100)}%`,
                      backgroundColor: '#00d9ff',
                      boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#718096',
                    marginBottom: '4px'
                  }}>
                    Remaining: <strong style={{ color: '#ffffff' }}>{Math.max(remaining, 0).toFixed(2)}%</strong>
                  </p>
                </div>

                {/* Beneficiaries List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {beneficiaries.map((ben, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#1e4976'
                    }}>
                      <span style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}>
                        {ben.name}
                      </span>
                      <span style={{
                        color: '#00d9ff',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}>
                        {ben.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Beneficiary Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                    placeholder="Beneficiary name (e.g., Charity, Friend)"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#1e4976',
                      border: '2px solid #4a5568',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#00d9ff'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#4a5568'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      value={newBeneficiary.percentage || ''}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, percentage: parseFloat(e.target.value) || 0 })}
                      placeholder="%"
                      min="0"
                      max={100}
                      step="0.1"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: '#1e4976',
                        border: '2px solid #4a5568',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00d9ff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#4a5568'
                      }}
                    />
                    <button
                      onClick={handleAddBeneficiary}
                      disabled={remaining <= 0 || !newBeneficiary.name || newBeneficiary.percentage <= 0}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? '#00d9ff' : '#4a5568',
                        color: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? '#0a1929' : '#718096',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: '#a0aec0',
                    marginTop: '8px',
                    lineHeight: '1.5'
                  }}>
                    Note: You are allocating 100% of the funds available in your 1/3 discretionary portion.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Non-Muslim Variation - Full Freedom */
            <div>
              <div style={{
                backgroundColor: '#132f4c',
                borderRadius: '20px',
                padding: '24px',
                border: '2px solid #00d9ff',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 217, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    ⚖️
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      Asset Distribution
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096'
                    }}>
                      100% Discretionary Freedom
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    height: '12px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#1e4976',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${totalAllocated}%`,
                      backgroundColor: '#00d9ff',
                      boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#718096',
                    marginBottom: '4px'
                  }}>
                    Allocated: <strong style={{ color: '#ffffff' }}>{totalAllocated.toFixed(2)}%</strong> | 
                    Remaining: <strong style={{ color: '#ffffff' }}>{remaining.toFixed(2)}%</strong>
                  </p>
                </div>

                {/* Beneficiaries List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {beneficiaries.map((ben, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: '#1e4976'
                    }}>
                      <span style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}>
                        {ben.name}
                      </span>
                      <span style={{
                        color: '#00d9ff',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}>
                        {ben.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Beneficiary Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                    placeholder="Beneficiary name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: '#1e4976',
                      border: '2px solid #4a5568',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#00d9ff'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#4a5568'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      value={newBeneficiary.percentage || ''}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, percentage: parseFloat(e.target.value) || 0 })}
                      placeholder="%"
                      min="0"
                      max={remaining}
                      step="0.1"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: '#1e4976',
                        border: '2px solid #4a5568',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00d9ff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#4a5568'
                      }}
                    />
                    <button
                      onClick={handleAddBeneficiary}
                      disabled={remaining <= 0 || !newBeneficiary.name || newBeneficiary.percentage <= 0}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? '#00d9ff' : '#4a5568',
                        color: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? '#0a1929' : '#718096',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: remaining > 0 && newBeneficiary.name && newBeneficiary.percentage > 0 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={onComplete}
              disabled={remaining > 0.01}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: remaining <= 0.01 ? '#00d9ff' : '#4a5568',
                color: remaining <= 0.01 ? '#0a1929' : '#718096',
                fontSize: '16px',
                fontWeight: 600,
                cursor: remaining <= 0.01 ? 'pointer' : 'not-allowed',
                boxShadow: remaining <= 0.01 ? '0 4px 12px rgba(0, 217, 255, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (remaining <= 0.01) {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (remaining <= 0.01) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
                }
              }}
            >
              Continue to Executor Selection
            </button>
            {remaining > 0.01 && (
              <p style={{
                fontSize: '12px',
                color: '#f59e0b',
                textAlign: 'center',
                marginTop: '8px'
              }}>
                Please allocate all remaining assets before continuing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 7: Executor Selection (Redesigned)
function ExecutorSelectionScreen({ 
  selectedExecutor, 
  executorDetails,
  onSelectExecutor,
  onUpdateExecutorDetails,
  onComplete 
}: { 
  selectedExecutor: 'amanah' | 'private' | null
  executorDetails: { name: string; ic: string }
  onSelectExecutor: (executor: 'amanah' | 'private') => void
  onUpdateExecutorDetails: (details: { name: string; ic: string }) => void
  onComplete: () => void
}) {

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #4a5568',
        backgroundColor: '#0a1929',
        flexShrink: 0
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#ffffff'
        }}>
          Select Digital Executor
        </h2>
        <p style={{
          color: '#718096',
          fontSize: '14px'
        }}>
          Choose who will unlock your will upon confirmed death
        </p>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        paddingBottom: '120px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {/* Explanation */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #4a5568',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 217, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                🔐
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>
                  The Smart Contract
                </h3>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  Your Digital Executor is responsible for unlocking and executing your will after your death is confirmed through official channels.
                </p>
              </div>
            </div>
          </div>

          {/* Choice A: Amanah Raya */}
          <div
            onClick={() => onSelectExecutor('amanah')}
            style={{
              padding: '24px',
              borderRadius: '20px',
              border: selectedExecutor === 'amanah' ? '2px solid #00d9ff' : '2px solid #4a5568',
              backgroundColor: selectedExecutor === 'amanah' ? '#1e4976' : '#132f4c',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedExecutor === 'amanah' ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
              marginBottom: '16px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 217, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                🏛️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}>
                    Amanah Raya
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#10b981',
                    color: '#ffffff'
                  }}>
                    Recommended
                  </span>
                </div>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  marginBottom: '12px',
                  fontWeight: 600
                }}>
                  The Digital Oracle
                </p>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  marginBottom: '12px'
                }}>
                  Government-backed trustee. Automatic execution upon death confirmation through official government records.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      No additional setup required
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      Automatic verification through JPN (National Registration Department)
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      Legally recognized and protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choice B: Private Individual */}
          <div
            onClick={() => onSelectExecutor('private')}
            style={{
              padding: '24px',
              borderRadius: '20px',
              border: selectedExecutor === 'private' ? '2px solid #00d9ff' : '2px solid #4a5568',
              backgroundColor: selectedExecutor === 'private' ? '#1e4976' : '#132f4c',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedExecutor === 'private' ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
              marginBottom: '24px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 217, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0
              }}>
                👤
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>
                  Private Individual
                </h3>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  marginBottom: '12px',
                  fontWeight: 600
                }}>
                  Biometric Link
                </p>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  marginBottom: '12px'
                }}>
                  Appoint a trusted person (e.g., Son, Daughter, Lawyer). They must use the LifeKey app and scan their own biometrics to unlock the will.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      Personal control over execution
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      Requires executor to have LifeKey app installed
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#00d9ff', marginTop: '4px' }}>✓</span>
                    <p style={{ fontSize: '12px', color: '#718096' }}>
                      Biometric verification required for access
                    </p>
                  </div>
                </div>
                {selectedExecutor === 'private' && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#1e4976',
                    border: '1px solid #4a5568'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096',
                      marginBottom: '8px'
                    }}>
                      Executor Details Required:
                    </p>
                    <input
                      type="text"
                      value={executorDetails.name}
                      onChange={(e) => onUpdateExecutorDetails({ ...executorDetails, name: e.target.value })}
                      placeholder="Executor's Full Name"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#0a1929',
                        border: '2px solid #4a5568',
                        color: '#ffffff',
                        fontSize: '13px',
                        marginBottom: '8px',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00d9ff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#4a5568'
                      }}
                    />
                    <input
                      type="text"
                      value={executorDetails.ic}
                      onChange={(e) => onUpdateExecutorDetails({ ...executorDetails, ic: e.target.value })}
                      placeholder="IC Number"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#0a1929',
                        border: '2px solid #4a5568',
                        color: '#ffffff',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00d9ff'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#4a5568'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div>
            <button
              onClick={onComplete}
              disabled={!selectedExecutor || (selectedExecutor === 'private' && (!executorDetails.name || !executorDetails.ic))}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic)) ? '#00d9ff' : '#4a5568',
                color: selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic)) ? '#0a1929' : '#718096',
                fontSize: '16px',
                fontWeight: 600,
                cursor: selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic)) ? 'pointer' : 'not-allowed',
                boxShadow: selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic)) ? '0 4px 12px rgba(0, 217, 255, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic))) {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedExecutor && (selectedExecutor === 'amanah' || (selectedExecutor === 'private' && executorDetails.name && executorDetails.ic))) {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
                }
              }}
            >
              Confirm Executor
            </button>
            {(!selectedExecutor || (selectedExecutor === 'private' && (!executorDetails.name || !executorDetails.ic))) && (
              <p style={{
                fontSize: '12px',
                color: '#f59e0b',
                textAlign: 'center',
                marginTop: '8px'
              }}>
                Please select an executor{selectedExecutor === 'private' ? ' and provide required details' : ''} to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 8: Review & Seal
function ReviewSealScreen({ 
  isMuslim, 
  executor, 
  executorDetails,
  onComplete 
}: { 
  isMuslim: boolean
  executor: 'amanah' | 'private' | null
  executorDetails: { name: string; ic: string }
  onComplete: () => void
}) {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleSignAndSeal = () => {
    if (!agreedToTerms) return
    setIsAuthenticating(true)
    // Simulate biometric authentication
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  const executorName = executor === 'amanah' 
    ? 'Amanah Raya' 
    : executorDetails.name || 'Private Individual'

  const distributionType = isMuslim 
    ? 'Muslim Faraid & Wasiyyah' 
    : 'Non-Muslim Civil Law'

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #4a5568',
        backgroundColor: '#0a1929',
        flexShrink: 0
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#ffffff'
        }}>
          Review & Seal Your Digital Will
        </h2>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        paddingBottom: '120px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {/* Summary Card */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid #4a5568',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              Summary
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  marginBottom: '4px'
                }}>
                  Executor
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}>
                  {executorName}
                </p>
              </div>

              <div style={{
                height: '1px',
                backgroundColor: '#4a5568'
              }} />

              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  marginBottom: '4px'
                }}>
                  Distribution Type
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}>
                  {distributionType}
                </p>
              </div>

              <div style={{
                height: '1px',
                backgroundColor: '#4a5568'
              }} />

              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  marginBottom: '4px'
                }}>
                  Witness
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#00d9ff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>🤖</span>
                  LifeKey AI Sentry (Verified)
                </p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #4a5568',
            marginBottom: '24px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <p style={{
              fontSize: '12px',
              color: '#718096',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              By proceeding, I declare this information is accurate and this is my final will. I understand that this Digital Will is legally binding and will be executed according to the selected executor protocol upon my confirmed death. I acknowledge that all verification processes have been completed and I am acting of my own free will without coercion.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '2px',
                  cursor: 'pointer',
                  accentColor: '#00d9ff'
                }}
              />
              <label style={{
                fontSize: '14px',
                color: '#ffffff',
                cursor: 'pointer',
                lineHeight: '1.5'
              }}>
                I agree to the Terms & Conditions
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{
        padding: '24px',
        borderTop: '1px solid #4a5568',
        backgroundColor: '#0a1929'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <button
            onClick={handleSignAndSeal}
            disabled={!agreedToTerms || isAuthenticating}
            style={{
              width: '100%',
              padding: '18px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: agreedToTerms && !isAuthenticating ? '#00d9ff' : '#4a5568',
              color: agreedToTerms && !isAuthenticating ? '#0a1929' : '#718096',
              fontSize: '16px',
              fontWeight: 700,
              cursor: agreedToTerms && !isAuthenticating ? 'pointer' : 'not-allowed',
              boxShadow: agreedToTerms && !isAuthenticating ? '0 4px 12px rgba(0, 217, 255, 0.4)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              if (agreedToTerms && !isAuthenticating) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (agreedToTerms && !isAuthenticating) {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
              }
            }}
          >
            {isAuthenticating ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(10, 25, 41, 0.3)',
                  borderTop: '3px solid #0a1929',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                <span>Sign & Seal Will (Biometric Auth)</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Screen 9: Success & Dashboard
function SuccessDashboardScreen({ 
  executor, 
  executorDetails 
}: { 
  executor: 'amanah' | 'private' | null
  executorDetails: { name: string; ic: string }
}) {
  const willId = `LK-2024-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  const dateSealed = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const executorName = executor === 'amanah' 
    ? 'Amanah Raya' 
    : executorDetails.name || 'Your Appointed Executor'

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #4a5568',
        backgroundColor: '#0a1929',
        flexShrink: 0
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '8px',
          color: '#ffffff'
        }}>
          Dashboard
        </h2>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px',
        paddingBottom: '120px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          {/* Success State */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '96px',
              height: '96px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)'
            }}>
              <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              Will Successfully Created & Sealed!
            </h1>
            <p style={{
              color: '#718096',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              Your Digital Will is now active and securely stored on the government blockchain.
            </p>
          </div>

          {/* Certificate Info */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid #4a5568',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              Digital Will Certificate
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  marginBottom: '4px'
                }}>
                  Digital Will ID
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#00d9ff',
                  fontFamily: 'monospace'
                }}>
                  {willId}
                </p>
              </div>
              <div style={{
                height: '1px',
                backgroundColor: '#4a5568'
              }} />
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#718096',
                  marginBottom: '4px'
                }}>
                  Date Sealed
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}>
                  {dateSealed}
                </p>
              </div>
            </div>
          </div>

          {/* Management Info */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #4a5568',
            marginBottom: '24px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '8px'
            }}>
              Managed by:
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff'
            }}>
              {executorName}
            </p>
          </div>

          {/* My Digital Will Section */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid #00d9ff',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              My Digital Will
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#1e4976'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
              }} />
              <p style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#ffffff'
              }}>
                Active & Secure
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div style={{
        padding: '24px',
        borderTop: '1px solid #4a5568',
        backgroundColor: '#0a1929'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#00d9ff',
              color: '#0a1929',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 217, 255, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 217, 255, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.4)'
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

// Screen: IC Locked (Threat Detected)
function ICLockedScreen() {
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [nearestBranch, setNearestBranch] = useState<{
    name: string
    address: string
    lat: number
    lng: number
    distanceKm: number
  } | null>(null)

  const branches = [
    {
      name: 'JPN Putrajaya',
      address: 'Jabatan Pendaftaran Negara, Putrajaya, Presint 2, 62100 Putrajaya',
      lat: 2.9305,
      lng: 101.6869
    },
    {
      name: 'JPN Kuala Lumpur',
      address: 'Jabatan Pendaftaran Negara, UTC Kuala Lumpur, Pudu Sentral, 55100 Kuala Lumpur',
      lat: 3.142,
      lng: 101.6953
    },
    {
      name: 'JPN Shah Alam',
      address: 'Jabatan Pendaftaran Negara, Kompleks PKNS, 40000 Shah Alam, Selangor',
      lat: 3.0733,
      lng: 101.5185
    }
  ]

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (v: number) => (v * Math.PI) / 180
    const R = 6371 // km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleFindNearestBranch = () => {
    setLocationError(null)
    setIsLocating(true)
    setNearestBranch(null)

    if (!navigator.geolocation) {
      setLocationError('Location is not supported on this device or browser.')
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        let closest = null as typeof nearestBranch
        let minDistance = Number.MAX_VALUE

        branches.forEach((b) => {
          const d = haversineDistance(latitude, longitude, b.lat, b.lng)
          if (d < minDistance) {
            minDistance = d
            closest = {
              ...b,
              distanceKm: d
            }
          }
        })

        setNearestBranch(closest)
        setIsLocating(false)
      },
      (error) => {
        console.error('Geolocation error:', error)
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please enable location access to find the nearest JPN branch.')
        } else {
          setLocationError('Unable to retrieve your location. Please try again.')
        }
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    )
  }

  const openBranchInMaps = () => {
    if (!nearestBranch) return
    const url = `https://www.google.com/maps/search/?api=1&query=${nearestBranch.lat},${nearestBranch.lng}`
    window.open(url, '_blank')
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Top section - lock icon + main title */}
        <div style={{
          textAlign: 'center',
          flexShrink: 0
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px',
            borderRadius: '50%',
            backgroundColor: '#7f1d1d',
            border: '4px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
            animation: 'pulse 2s infinite'
          }}>
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffffff' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 700,
            marginBottom: '8px',
            color: '#ffffff'
          }}>
            Your IC is Locked
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            marginBottom: '16px'
          }}>
            A serious security threat was detected. For your protection, this session is terminated and your IC requires in-person reactivation.
          </p>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '8px',
          paddingBottom: '16px'
        }}>
          <div style={{
            backgroundColor: '#7f1d1d',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid #ef4444',
            marginBottom: '24px',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#fca5a5',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              ⚠️ Security Threat Detected
            </p>
            <p style={{
              fontSize: '16px',
              color: '#ffffff',
              lineHeight: '1.6',
              marginBottom: '12px'
            }}>
              A threat was detected during the environment scan. For your safety and security, your National ID (IC) has been automatically locked.
            </p>
            <p style={{
              fontSize: '14px',
              color: '#fca5a5',
              lineHeight: '1.6'
            }}>
              This action cannot be reversed inside the LifeKey app and requires face-to-face verification with JPN.
            </p>
          </div>

          {/* Instructions */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #4a5568',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              How to Unlock Your IC
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#718096',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Please visit the nearest <strong style={{ color: '#ffffff' }}>JPN (Jabatan Pendaftaran Negara) branch or kiosk</strong> to complete the security review.
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              paddingLeft: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#00d9ff', fontSize: '20px' }}>1.</span>
                <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
                  Bring your physical MyKad to any JPN office or kiosk
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#00d9ff', fontSize: '20px' }}>2.</span>
                <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
                  Present your IC for biometric and identity verification
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#00d9ff', fontSize: '20px' }}>3.</span>
                <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
                  Complete the security clearance process to reactivate your IC
                </p>
              </div>
            </div>
          </div>

          {/* Location-based nearest branch finder */}
          <div style={{
            backgroundColor: '#132f4c',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #4a5568',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              Find Nearest JPN Branch
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              With your permission, LifeKey can use your current location to suggest the nearest JPN office.
            </p>

            <button
              onClick={handleFindNearestBranch}
              disabled={isLocating}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isLocating ? '#4a5568' : '#00d9ff',
                color: isLocating ? '#cbd5f5' : '#0a1929',
                fontSize: '15px',
                fontWeight: 600,
                cursor: isLocating ? 'wait' : 'pointer',
                boxShadow: isLocating ? 'none' : '0 4px 12px rgba(0, 217, 255, 0.4)',
                transition: 'all 0.2s ease',
                marginBottom: '12px'
              }}
            >
              {isLocating ? 'Requesting location…' : 'Use My Location'}
            </button>

            {locationError && (
              <p style={{
                fontSize: '12px',
                color: '#fca5a5',
                marginBottom: '8px'
              }}>
                {locationError}
              </p>
            )}

            {nearestBranch && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: '#1e4976',
                border: '1px solid #00d9ff'
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#9ca3af',
                  marginBottom: '4px'
                }}>
                  Suggested branch based on your current location:
                </p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  {nearestBranch.name}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#e5e7eb',
                  lineHeight: '1.5',
                  marginBottom: '6px'
                }}>
                  {nearestBranch.address}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#cbd5f5',
                  marginBottom: '10px'
                }}>
                  Approx. distance: {nearestBranch.distanceKm.toFixed(1)} km
                </p>
                <button
                  onClick={openBranchInMaps}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#00d9ff',
                    color: '#0a1929',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Open in Maps
                </button>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <p style={{
            fontSize: '12px',
            color: '#718096',
            opacity: 0.75,
            lineHeight: '1.5',
            marginBottom: '8px'
          }}>
            🔒 This security measure protects against coercion and ensures the integrity of the Digital Will process.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
      `}</style>
    </div>
  )
}
