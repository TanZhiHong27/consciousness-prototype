'use client'

import React, { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

interface Screen4Props {
  isMuslim: boolean
  onComplete: () => void
}

export default function Screen4_AssetDistribution({ isMuslim, onComplete }: Screen4Props) {
  const [beneficiaries, setBeneficiaries] = useState<Array<{ name: string; percentage: number }>>([])
  const [newBeneficiary, setNewBeneficiary] = useState({ name: '', percentage: 0 })

  const faraidPortion = 66.67
  const wasiyyahPortion = 33.33
  const totalAllocated = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)
  const remaining = isMuslim ? wasiyyahPortion - totalAllocated : 100 - totalAllocated

  const handleAddBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.percentage > 0) {
      if (totalAllocated + newBeneficiary.percentage <= (isMuslim ? wasiyyahPortion : 100)) {
        setBeneficiaries([...beneficiaries, newBeneficiary])
        setNewBeneficiary({ name: '', percentage: 0 })
      }
    }
  }

  return (
    <div className="mobile-container flex flex-col min-h-screen" style={{ backgroundColor: 'var(--navy-deep)' }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--slate-medium)' }}>
        <h2 className="text-2xl font-bold mb-2 text-white">Asset Distribution Hub</h2>
        <p className="text-slate-light text-sm">Allocate your assets to beneficiaries</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isMuslim ? (
          /* Muslim Variation - Two Sections */
          <div className="space-y-6 max-w-md mx-auto">
            {/* Faraid Portion - Fixed */}
            <div className="bg-navy-medium rounded-2xl p-6 border-2" style={{ borderColor: 'var(--slate-medium)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                  <span className="text-xl">📜</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Faraid Portion</h3>
                  <p className="text-xs text-slate-light">2/3 Fixed (66.67%)</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--navy-light)' }}>
                  <div className="h-full" style={{ width: '66.67%', backgroundColor: 'var(--teal-accent)' }}></div>
                </div>
                <p className="text-sm text-slate-light">
                  Automatically distributed to Quranic heirs (blood family) according to Islamic inheritance law
                </p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--navy-light)' }}>
                <p className="text-xs text-slate-light mb-2">Distribution includes:</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Spouse</li>
                  <li>• Children (sons and daughters)</li>
                  <li>• Parents</li>
                  <li>• Siblings (if applicable)</li>
                </ul>
                <p className="text-xs text-slate-light mt-3 italic">This portion cannot be modified</p>
              </div>
            </div>

            {/* Wasiyyah Portion - Flexible */}
            <div className="bg-navy-medium rounded-2xl p-6 border-2" style={{ borderColor: 'var(--teal-accent)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                  <span className="text-xl">✍️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Wasiyyah Portion</h3>
                  <p className="text-xs text-slate-light">1/3 Discretionary (33.33%)</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--navy-light)' }}>
                  <div className="h-full" style={{ width: `${(totalAllocated / wasiyyahPortion) * 100}%`, backgroundColor: 'var(--teal-accent)' }}></div>
                </div>
                <p className="text-sm text-slate-light mb-2">
                  Remaining: <strong className="text-white">{remaining.toFixed(2)}%</strong>
                </p>
              </div>

              {/* Beneficiaries List */}
              <div className="space-y-3 mb-4">
                {beneficiaries.map((ben, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--navy-light)' }}>
                    <span className="text-white font-medium">{ben.name}</span>
                    <span className="text-teal-accent font-semibold">{ben.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Add Beneficiary Form */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={newBeneficiary.name}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                  placeholder="Beneficiary name (e.g., Charity, Friend)"
                  className="w-full px-4 py-3 rounded-xl bg-navy-light border-2 text-white placeholder-slate-light focus:outline-none focus:border-teal-accent"
                  style={{
                    backgroundColor: 'var(--navy-light)',
                    borderColor: 'var(--slate-medium)',
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newBeneficiary.percentage || ''}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, percentage: parseFloat(e.target.value) || 0 })}
                    placeholder="%"
                    min="0"
                    max={remaining}
                    step="0.1"
                    className="flex-1 px-4 py-3 rounded-xl bg-navy-light border-2 text-white placeholder-slate-light focus:outline-none focus:border-teal-accent"
                    style={{
                      backgroundColor: 'var(--navy-light)',
                      borderColor: 'var(--slate-medium)',
                    }}
                  />
                  <Button onClick={handleAddBeneficiary} disabled={remaining <= 0 || !newBeneficiary.name || newBeneficiary.percentage <= 0}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Non-Muslim Variation - Full Freedom */
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-navy-medium rounded-2xl p-6 border-2" style={{ borderColor: 'var(--teal-accent)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal-glow)' }}>
                  <span className="text-xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Asset Distribution</h3>
                  <p className="text-xs text-slate-light">100% Discretionary Freedom</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: 'var(--navy-light)' }}>
                  <div className="h-full" style={{ width: `${totalAllocated}%`, backgroundColor: 'var(--teal-accent)' }}></div>
                </div>
                <p className="text-sm text-slate-light mb-2">
                  Allocated: <strong className="text-white">{totalAllocated.toFixed(2)}%</strong> | 
                  Remaining: <strong className="text-white">{remaining.toFixed(2)}%</strong>
                </p>
              </div>

              {/* Beneficiaries List */}
              <div className="space-y-3 mb-4">
                {beneficiaries.map((ben, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--navy-light)' }}>
                    <span className="text-white font-medium">{ben.name}</span>
                    <span className="text-teal-accent font-semibold">{ben.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Add Beneficiary Form */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={newBeneficiary.name}
                  onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                  placeholder="Beneficiary name"
                  className="w-full px-4 py-3 rounded-xl bg-navy-light border-2 text-white placeholder-slate-light focus:outline-none focus:border-teal-accent"
                  style={{
                    backgroundColor: 'var(--navy-light)',
                    borderColor: 'var(--slate-medium)',
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newBeneficiary.percentage || ''}
                    onChange={(e) => setNewBeneficiary({ ...newBeneficiary, percentage: parseFloat(e.target.value) || 0 })}
                    placeholder="%"
                    min="0"
                    max={remaining}
                    step="0.1"
                    className="flex-1 px-4 py-3 rounded-xl bg-navy-light border-2 text-white placeholder-slate-light focus:outline-none focus:border-teal-accent"
                    style={{
                      backgroundColor: 'var(--navy-light)',
                      borderColor: 'var(--slate-medium)',
                    }}
                  />
                  <Button onClick={handleAddBeneficiary} disabled={remaining <= 0 || !newBeneficiary.name || newBeneficiary.percentage <= 0}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="max-w-md mx-auto mt-6">
          <Button onClick={onComplete} fullWidth disabled={remaining > 0.01}>
            Continue to Executor Selection
          </Button>
          {remaining > 0.01 && (
            <p className="text-xs text-warning-amber text-center mt-2">
              Please allocate all remaining assets before continuing
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

