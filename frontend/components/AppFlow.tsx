'use client'

import React, { useState } from 'react'
import Screen1_Gatekeeper from './screens/Screen1_Gatekeeper'
import Screen2_PermissionTrigger from './screens/Screen2_PermissionTrigger'
import Screen2_1_EnvironmentScan from './screens/Screen2_1_EnvironmentScan'
import Screen2_2_ConsciousnessCheck from './screens/Screen2_2_ConsciousnessCheck'
import Screen3_ICScan from './screens/Screen3_ICScan'
import Screen4_AssetDistribution from './screens/Screen4_AssetDistribution'
import Screen5_ExecutorSelection from './screens/Screen5_ExecutorSelection'

type Screen = 
  | 'gatekeeper'
  | 'permission'
  | 'environment-scan'
  | 'consciousness-check'
  | 'ic-scan'
  | 'asset-distribution'
  | 'executor-selection'
  | 'complete'

export default function AppFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('gatekeeper')
  const [isMuslim, setIsMuslim] = useState<boolean | null>(null)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const handleStatusSelect = (muslim: boolean) => {
    setIsMuslim(muslim)
    setCurrentScreen('permission')
  }

  const handlePermissionAllow = () => {
    setPermissionGranted(true)
    setCurrentScreen('environment-scan')
  }

  const handlePermissionCancel = () => {
    setCurrentScreen('gatekeeper')
  }

  const handleEnvironmentScanComplete = () => {
    setCurrentScreen('consciousness-check')
  }

  const handleConsciousnessCheckComplete = () => {
    setCurrentScreen('ic-scan')
  }

  const handleICScanComplete = () => {
    setCurrentScreen('asset-distribution')
  }

  const handleAssetDistributionComplete = () => {
    setCurrentScreen('executor-selection')
  }

  const handleExecutorSelectionComplete = () => {
    setCurrentScreen('complete')
  }

  // Render appropriate screen
  switch (currentScreen) {
    case 'gatekeeper':
      return <Screen1_Gatekeeper onSelect={handleStatusSelect} />
    
    case 'permission':
      return (
        <>
          <Screen1_Gatekeeper onSelect={handleStatusSelect} />
          <Screen2_PermissionTrigger
            isOpen={true}
            onAllow={handlePermissionAllow}
            onCancel={handlePermissionCancel}
          />
        </>
      )
    
    case 'environment-scan':
      return <Screen2_1_EnvironmentScan onComplete={handleEnvironmentScanComplete} />
    
    case 'consciousness-check':
      return <Screen2_2_ConsciousnessCheck onComplete={handleConsciousnessCheckComplete} />
    
    case 'ic-scan':
      return <Screen3_ICScan onComplete={handleICScanComplete} />
    
    case 'asset-distribution':
      return (
        <Screen4_AssetDistribution
          isMuslim={isMuslim || false}
          onComplete={handleAssetDistributionComplete}
        />
      )
    
    case 'executor-selection':
      return <Screen5_ExecutorSelection onComplete={handleExecutorSelectionComplete} />
    
    case 'complete':
      return (
        <div className="mobile-container flex items-center justify-center min-h-screen p-6" style={{ backgroundColor: 'var(--navy-deep)' }}>
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success-green)' }}>
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-white">Will Creation Complete</h1>
            <p className="text-slate-light mb-8">
              Your Digital Will has been successfully created and secured using AI verification and your National ID.
            </p>
            <div className="bg-navy-medium rounded-2xl p-6 border" style={{ borderColor: 'var(--slate-medium)' }}>
              <p className="text-sm text-slate-light mb-4">
                Your will is now legally binding and will be executed according to your selected executor protocol.
              </p>
              <p className="text-xs text-slate-light opacity-75">
                🔒 Secured by LifeKey AI Protocol
              </p>
            </div>
          </div>
        </div>
      )
    
    default:
      return <Screen1_Gatekeeper onSelect={handleStatusSelect} />
  }
}

